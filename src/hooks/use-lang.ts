import { useTranslation } from "react-i18next";

export const SUPPORTED_LANGS = ["pt", "en", "es"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

/**
 * Returns the active language code and a `lp()` helper that prefixes any
 * path with the current language segment.
 *
 * Examples:
 *   lp('/blog')      → '/pt/blog'
 *   lp('/')          → '/pt'          (home — no trailing slash)
 *   lp('/portfolio') → '/en/portfolio'
 */
export function useLang() {
  const { i18n } = useTranslation();

  const lang = (
    SUPPORTED_LANGS.includes(i18n.language as SupportedLang)
      ? i18n.language
      : "pt"
  ) as SupportedLang;

  const lp = (path: string): string => {
    const suffix = path === "/" ? "" : path;
    return `/${lang}${suffix}`;
  };

  return { lang, lp } as const;
}
