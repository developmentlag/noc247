import { fetchAllBlogs } from '../../lib/github';

export default async function handler(req, res) {
  try {
    const blogs = await fetchAllBlogs(true);
    return res.status(200).json({
      success: true,
      message: 'Repositories successfully synced from GitHub',
      count: blogs.length,
      syncedAt: new Date().toISOString(),
      blogs: blogs.map((b) => ({
        slug: b.slug,
        title: b.title,
        isGitHub: b.isGitHub,
        updated: b.dateModified,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
