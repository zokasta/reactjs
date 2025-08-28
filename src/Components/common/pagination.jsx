import React from "react";

function buildPages(current, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) pages.push("…");
  for (let p = start; p <= end; p++) pages.push(p);
  if (end < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

export default function Pagination({ page, totalPages, onPageChange, className = "" }) {
  if (totalPages <= 1) return null;

  const pages = buildPages(page, totalPages);
  const go = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  };

  return (
    <nav className={`flex items-center justify-end gap-2 ${className}`} aria-label="Pagination">
      {/* Prev */}
      <button
        onClick={() => go(page - 1)}
        disabled={page === 1}
        className={`px-3 py-1 rounded-lg border transition
          ${page === 1
            ? "cursor-not-allowed opacity-50 border-gray-300 text-gray-500 bg-white"
            : "border-gray-300 bg-white text-secondary hover:bg-gray-light"}`}
        aria-label="Previous page"
      >
        ←
      </button>

      {/* Numbers + Ellipses */}
      {pages.map((p, idx) =>
        p === "…" ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-500 select-none">…</span>
        ) : (
          <button
            key={p}
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
            className={`px-3 py-1 rounded-lg border transition
              ${p === page
                ? "bg-primary text-white border-primary"
                : "bg-white text-secondary border-gray-300 hover:bg-gray-light"}`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-1 rounded-lg border transition
          ${page === totalPages
            ? "cursor-not-allowed opacity-50 border-gray-300 text-gray-500 bg-white"
            : "border-gray-300 bg-white text-secondary hover:bg-gray-light"}`}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
}
