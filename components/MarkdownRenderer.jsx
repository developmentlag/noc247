import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function MarkdownRenderer({ content, rawHtml }) {
  // If rawHtml exists (from legacy static articles), render it safely
  if (rawHtml && !content) {
    return (
      <div
        className="prose-body prose-article mt-12"
        dangerouslySetInnerHTML={{ __html: rawHtml }}
      />
    );
  }

  return (
    <div className="prose-body prose-article mt-12">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="mt-8 mb-4 font-sans text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="mt-12 mb-4 font-sans text-2xl font-bold tracking-tight text-neutral-950 md:text-3xl" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mt-8 mb-3 font-sans text-xl font-bold tracking-tight text-neutral-950 md:text-2xl" {...props} />
          ),
          p: ({ node, children, ...props }) => {
            // If paragraph contains an image element, render as div to avoid invalid <figure>/<div> in <p> DOM nesting
            const hasImg =
              node &&
              node.children &&
              node.children.some(
                (child) =>
                  child.tagName === 'img' ||
                  (child.type === 'element' && child.tagName === 'img')
              );
            if (hasImg) {
              return <div className="my-6">{children}</div>;
            }
            return (
              <p className="mb-6 text-[1.0625rem] leading-8 text-neutral-700" {...props}>
                {children}
              </p>
            );
          },
          ul: ({ node, ...props }) => (
            <ul className="mb-6 list-disc space-y-2 pl-6 text-neutral-700 leading-8" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="mb-6 list-decimal space-y-2 pl-6 text-neutral-700 leading-8" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-[1.0625rem] leading-8 text-neutral-700" {...props} />
          ),
          a: ({ node, href, children, ...props }) => {
            const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));
            return (
              <a
                href={href}
                className="font-semibold text-accent-600 underline decoration-accent-500/40 underline-offset-4 transition hover:text-accent-700 hover:decoration-accent-600"
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
          blockquote: ({ node, ...props }) => (
            <blockquote className="my-8 rounded-r-xl border-l-4 border-accent-500 bg-brand-50/50 py-4 px-6 text-brand-700 italic" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            if (inline) {
              return (
                <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm text-brand-700" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <div className="my-6 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-sm text-neutral-100 font-mono">
                <code className={className} {...props}>
                  {children}
                </code>
              </div>
            );
          },
          pre: ({ node, ...props }) => (
            <pre className="my-6 overflow-x-auto rounded-xl bg-neutral-900 p-4 text-sm text-neutral-100 font-mono" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="my-8 overflow-x-auto rounded-xl border border-neutral-200">
              <table className="w-full border-collapse text-left text-sm" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-neutral-50 text-xs font-semibold uppercase tracking-wider text-neutral-600 border-b border-neutral-200" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th className="px-4 py-3 font-semibold text-neutral-900" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border-b border-neutral-100 px-4 py-3 text-neutral-700" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-10 border-t border-neutral-200" {...props} />
          ),
          img: ({ node, src, alt, ...props }) => (
            <span className="block my-6 text-center">
              <img
                src={src}
                alt={alt || 'Article visual'}
                loading="lazy"
                decoding="async"
                className="mx-auto rounded-2xl border border-neutral-200 shadow-sm max-h-[520px] w-auto object-contain inline-block"
                {...props}
              />
              {alt && (
                <span className="mt-2 block text-center text-xs text-neutral-500">
                  {alt}
                </span>
              )}
            </span>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
