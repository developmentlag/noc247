const matter = require('gray-matter');

const GITHUB_API_URL = 'https://api.github.com';

const FIVE_MINUTES_MS = 5 * 60 * 1000; // 5 minutes

// Cache structure for in-memory caching
const cache = {
  repos: null,
  reposTimestamp: 0,
  blogs: new Map(),
  allBlogs: null,
  allBlogsTimestamp: 0,
  CACHE_TTL_MS: FIVE_MINUTES_MS,
};

// Automatic background sync every 5 minutes
let autoSyncInterval = null;
function startAutoSync() {
  if (!autoSyncInterval && typeof setInterval !== 'undefined') {
    autoSyncInterval = setInterval(async () => {
      try {
        console.log('[GitHub Blog] 5-minute periodic auto-sync running...');
        await fetchAllBlogs(true);
      } catch (err) {
        console.warn('[GitHub Blog] 5-minute auto-sync error:', err.message);
      }
    }, FIVE_MINUTES_MS);
    if (autoSyncInterval.unref) {
      autoSyncInterval.unref();
    }
  }
}
startAutoSync();

function getGitHubConfig() {
  const owner =
    process.env.GITHUB_OWNER ||
    process.env.GITHUB_ORG ||
    process.env.GITHUB_USER ||
    process.env.GITHUB_USERNAME ||
    'developmentlag';
  const token = process.env.GITHUB_TOKEN || null;
  return { owner, token };
}

function getHeaders() {
  const { token } = getGitHubConfig();
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'noc247-website-blog-crawler',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Perform a GitHub API request with timeout and error handling
 */
async function githubFetch(path, init = {}) {
  const url = path.startsWith('http') ? path : `${GITHUB_API_URL}${path}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      ...init,
      headers: { ...getHeaders(), ...(init.headers || {}) },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      const err = new Error(`GitHub API Error ${res.status}: ${res.statusText}`);
      err.status = res.status;
      err.details = errText;
      throw err;
    }

    return await res.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Only if the repository description contains "[blog]" show it in the blogs
 */
function isBlogRepo(repo) {
  if (!repo || !repo.description) return false;
  return repo.description.toLowerCase().includes('[blog]');
}

/**
 * Fetch all repositories for the configured account/organization
 */
async function fetchAccountRepos(owner, forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cache.repos && now - cache.reposTimestamp < cache.CACHE_TTL_MS) {
    return cache.repos;
  }

  try {
    let repos = [];
    // Try user repos first
    try {
      repos = await githubFetch(`/users/${encodeURIComponent(owner)}/repos?per_page=100&sort=pushed&direction=desc`);
    } catch (err) {
      if (err.status === 404) {
        // If not a user, try organization
        repos = await githubFetch(`/orgs/${encodeURIComponent(owner)}/repos?per_page=100&sort=pushed&direction=desc`);
      } else {
        throw err;
      }
    }

    if (Array.isArray(repos)) {
      cache.repos = repos;
      cache.reposTimestamp = now;
      return repos;
    }
    return [];
  } catch (err) {
    console.warn(`[GitHub API] Failed to fetch repos for owner "${owner}":`, err.message);
    return cache.repos || [];
  }
}

/**
 * Resolve relative markdown and HTML image URLs to GitHub raw CDN URLs
 */
function resolveMarkdownImages(markdown, owner, repoName, defaultBranch = 'main') {
  if (!markdown) return '';
  const rawBase = `https://raw.githubusercontent.com/${owner}/${repoName}/${defaultBranch}/`;

  function cleanRelativePath(p) {
    if (!p) return '';
    let clean = p.trim().replace(/^(\.\/|\/)+/, '');
    clean = clean.replace(/^(\.\.\/)+/, '');
    return clean;
  }

  // 1. Resolve markdown images: ![alt](path)
  let resolved = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
    const trimmed = url.trim();
    if (/^(https?:|data:|\/\/)/i.test(trimmed)) {
      return match;
    }
    const fullUrl = rawBase + cleanRelativePath(trimmed);
    return `![${alt}](${fullUrl})`;
  });

  // 2. Resolve HTML img tags: <img src="path" ...>
  resolved = resolved.replace(/<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi, (match, before, src, after) => {
    const trimmed = src.trim();
    if (/^(https?:|data:|\/\/)/i.test(trimmed)) {
      return match;
    }
    const fullUrl = rawBase + cleanRelativePath(trimmed);
    return `<img ${before}src="${fullUrl}"${after}>`;
  });

  return resolved;
}

/**
 * Format a raw date string into human-readable format
 */
function formatDisplayDate(dateInput) {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'Recent';
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return 'Recent';
  }
}

/**
 * Format slug into title case as a fallback
 */
function formatSlugToTitle(slug) {
  return slug
    .replace(/^blog[-_]/i, '')
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Calculate reading time from text
 */
function calculateReadingTime(text) {
  if (!text) return '3 min read';
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Fetch BLOG.md (with fallbacks to blog.md / README.md) for a repository
 */
async function fetchRepoBlogContent(owner, repoName, defaultBranch = 'main') {
  const branch = defaultBranch || 'main';
  const candidates = ['BLOG.md', 'blog.md', 'BLOG.MD', 'README.md', 'readme.md', 'README'];

  let markdown = null;

  for (const filename of candidates) {
    try {
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/${filename}?_t=${Date.now()}`;
      const res = await fetch(rawUrl, {
        headers: getHeaders(),
        cache: 'no-store',
      });
      if (res.ok) {
        markdown = await res.text();
        break;
      }
    } catch {
      // Continue to next candidate
    }
  }

  // If raw fetch failed, attempt GitHub Contents API
  if (!markdown) {
    for (const filename of candidates) {
      try {
        const fileData = await githubFetch(`/repos/${owner}/${repoName}/contents/${filename}`);
        if (fileData && fileData.content) {
          markdown = Buffer.from(fileData.content, 'base64').toString('utf8');
          break;
        }
      } catch {
        // Continue
      }
    }
  }

  // Attempt to fetch blog.json if present
  let blogJson = null;
  try {
    const jsonUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/blog.json`;
    const res = await fetch(jsonUrl, { headers: getHeaders() });
    if (res.ok) {
      blogJson = await res.json();
    }
  } catch {
    // Optional
  }

  return { markdown, blogJson };
}

/**
 * Parse repository and markdown into full blog post object
 */
function parseBlogPost(repo, rawMarkdown, blogJson = null) {
  const { owner } = getGitHubConfig();
  const defaultBranch = repo.default_branch || 'main';

  // Parse frontmatter
  let frontmatter = {};
  let content = rawMarkdown || '';

  if (rawMarkdown) {
    try {
      const parsed = matter(rawMarkdown);
      frontmatter = parsed.data || {};
      content = parsed.content || '';
    } catch (e) {
      console.warn(`[GrayMatter] Failed to parse frontmatter for ${repo.name}:`, e.message);
    }
  }

  if (blogJson && typeof blogJson === 'object') {
    frontmatter = { ...frontmatter, ...blogJson };
  }

  // Repository name is the actual name of the blog
  const title = formatSlugToTitle(repo.name) || repo.name;

  // Description from repository description (stripping [blog] tag)
  let description = repo.description ? repo.description.replace(/\[blog\]/gi, '').trim() : '';
  if (!description) {
    description = frontmatter.description || frontmatter.excerpt || '';
  }
  if (!description) {
    const paragraphs = content
      .split(/\n\s*\n/)
      .map((p) => p.replace(/[#*`_\[\]()]/g, '').trim())
      .filter((p) => p.length > 20);
    description = paragraphs[0] ? paragraphs[0].slice(0, 160) + '...' : 'Insights and operations notes from NOC247.';
  }

  // Dates
  const datePublished = frontmatter.date || repo.created_at || new Date().toISOString();
  const dateModified = frontmatter.dateModified || repo.pushed_at || datePublished;
  const dateFormatted = formatDisplayDate(datePublished);
  const dateModifiedFormatted = formatDisplayDate(dateModified);

  // Author
  const author = frontmatter.author || 'NOC247';

  // Tags
  let tags = [];
  if (Array.isArray(frontmatter.tags)) {
    tags = frontmatter.tags;
  } else if (typeof frontmatter.tags === 'string') {
    tags = frontmatter.tags.split(',').map((t) => t.trim()).filter(Boolean);
  } else if (Array.isArray(repo.topics) && repo.topics.length > 0) {
    tags = repo.topics.filter((t) => !['blog', 'article', 'post'].includes(t.toLowerCase()));
  }
  if (!tags.length) {
    tags = ['NOC', 'MSP operations'];
  }

  // Cover image
  let image = frontmatter.image || frontmatter.coverImage;
  if (!image) {
    const firstImgMatch = content.match(/!\[.*?\]\((.*?)\)/);
    if (firstImgMatch && firstImgMatch[1]) {
      image = firstImgMatch[1];
    }
  }

  // Resolve relative markdown images to GitHub raw CDN
  const resolvedContent = resolveMarkdownImages(content, owner, repo.name, defaultBranch);

  if (image && !/^(https?:|\/\/)/i.test(image)) {
    image = `https://raw.githubusercontent.com/${owner}/${repo.name}/${defaultBranch}/${image.replace(/^(\.\/|\/)+/, '')}`;
  }
  if (!image) {
    image = 'https://noc247.io/og-default.png';
  }

  // URL slug is exactly the repository name
  const slug = repo.name;
  const readingTime = frontmatter.readingTime || calculateReadingTime(resolvedContent);

  return {
    slug,
    repoName: repo.name,
    title,
    description,
    datePublished: new Date(datePublished).toISOString().slice(0, 10),
    dateModified: new Date(dateModified).toISOString().slice(0, 10),
    dateFormatted,
    dateModifiedFormatted,
    author: typeof author === 'object' ? author.name || 'NOC247' : author,
    tags,
    image,
    content: resolvedContent,
    readingTime,
    url: `https://noc247.io/blog/${slug}`,
    isGitHub: true,
  };
}

/**
 * Fetch all discovered blogs (GitHub repos + local fallbacks)
 */
async function fetchAllBlogs(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cache.allBlogs && now - cache.allBlogsTimestamp < cache.CACHE_TTL_MS) {
    return cache.allBlogs;
  }

  const { owner } = getGitHubConfig();
  const allBlogsMap = new Map();

  let githubBlogsFound = false;

  // 1. Fetch and discover GitHub blogs
  try {
    const repos = await fetchAccountRepos(owner, forceRefresh);
    const blogRepos = repos.filter(isBlogRepo);

    // Process GitHub blogs in parallel
    const githubBlogPromises = blogRepos.map(async (repo) => {
      try {
        const { markdown, blogJson } = await fetchRepoBlogContent(owner, repo.name, repo.default_branch);
        if (!markdown && !blogJson) return null;
        return parseBlogPost(repo, markdown, blogJson);
      } catch (err) {
        console.warn(`[GitHub Blog] Failed to parse repo ${repo.name}:`, err.message);
        return null;
      }
    });

    const parsedGithubBlogs = await Promise.all(githubBlogPromises);
    for (const blog of parsedGithubBlogs) {
      if (blog && blog.slug) {
        allBlogsMap.set(blog.slug, blog);
      }
    }
  } catch (err) {
    console.warn('[GitHub Blog] Discovery failed:', err.message);
  }

  // Deduplicate and sort by publication date descending
  const uniqueBlogs = Array.from(new Set(allBlogsMap.values()));
  uniqueBlogs.sort((a, b) => new Date(b.datePublished) - new Date(a.datePublished));

  cache.allBlogs = uniqueBlogs;
  cache.allBlogsTimestamp = now;
  return uniqueBlogs;
}

/**
 * Fetch a single blog by slug
 */
async function fetchBlogBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();

  // 1. Check in cache
  const all = await fetchAllBlogs();
  const matched = all.find(
    (b) =>
      b.slug.toLowerCase() === cleanSlug ||
      b.slug.toLowerCase() === `blog-${cleanSlug}` ||
      cleanSlug === `blog-${b.slug.toLowerCase()}` ||
      (b.repoName && b.repoName.toLowerCase() === cleanSlug) ||
      (b.repoName && b.repoName.toLowerCase() === `blog-${cleanSlug}`)
  );

  if (matched) return matched;

  // 2. Direct fetch attempt from GitHub for a specific repo if not in general repo list
  const { owner } = getGitHubConfig();
  const candidateNames = [cleanSlug, `blog-${cleanSlug}`, cleanSlug.replace(/^blog-/, '')];

  for (const repoName of candidateNames) {
    try {
      const repo = await githubFetch(`/repos/${owner}/${repoName}`);
      if (repo && repo.name) {
        const { markdown, blogJson } = await fetchRepoBlogContent(owner, repo.name, repo.default_branch);
        if (markdown || blogJson) {
          const parsed = parseBlogPost(repo, markdown, blogJson);
          return parsed;
        }
      }
    } catch {
      // Continue to next candidate
    }
  }

  return null;
}

module.exports = {
  getGitHubConfig,
  isBlogRepo,
  fetchAllBlogs,
  fetchBlogBySlug,
  resolveMarkdownImages,
  formatDisplayDate,
};
