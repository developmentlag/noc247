import React from 'react';
import Link from 'next/link';

export default function BlogCard({ blog }) {
  const { slug, title, description, dateFormatted, readingTime, tags } = blog;
  const href = `/blog/${slug}`;

  return (
    <article className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-hover">
      {/* Date and Reading Time */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400">
        <time dateTime={blog.datePublished}>{dateFormatted}</time>
        <span aria-hidden="true">·</span>
        <span className="inline-flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-clock h-3.5 w-3.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {readingTime}
        </span>
      </div>

      {/* Title */}
      <h2 className="mt-4 font-sans text-xl font-bold leading-snug tracking-[-0.02em] text-neutral-950">
        <Link href={href} className="transition group-hover:text-accent-600">
          {title}
        </Link>
      </h2>

      {/* Description */}
      <p className="mt-3 text-sm leading-7 text-neutral-500 line-clamp-3">
        {description}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <li
              key={idx}
              className="rounded-full border border-neutral-200 px-2.5 py-1 text-[0.7rem] font-medium text-neutral-500"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {/* Read Article CTA Link */}
      <Link
        href={href}
        className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent-600"
      >
        Read article
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
    </article>
  );
}
