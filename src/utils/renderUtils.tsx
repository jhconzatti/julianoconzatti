import React from "react";

/**
 * Splits `text` on `*` and wraps odd-indexed segments in a styled element.
 * e.g. "Hello *World* foo" → ["Hello ", <span>World</span>, " foo"]
 *
 * @param text       The string to parse (uses * as delimiter).
 * @param className  Tailwind class(es) applied to highlighted segments. Defaults to "text-gradient".
 */
export const renderWithHighlights = (
  text: string,
  className = "text-gradient",
): React.ReactNode[] =>
  text.split("*").map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className={className}>
        {part}
      </span>
    ) : (
      part
    ),
  );
