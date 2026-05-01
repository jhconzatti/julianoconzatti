import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS } from "@/hooks/use-lang";

const BASE_URL = "https://julianoconzatti.com.br";
const FALLBACK_LANG = "pt";

const LANG_HREFLANG: Record<string, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-AR",
};

const upsertMetaTag = (
  attr: "name" | "property",
  key: string,
  content: string,
) => {
  let tag = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const upsertCanonical = (href: string) => {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
};

/**
 * Headless component: injects <title>, meta description, Open Graph,
 * <link rel="canonical"> and <link rel="alternate" hreflang> into <head>.
 *
 * Must be rendered inside <BrowserRouter> so it can read the current pathname.
 *
 * hreflang strategy (Gold Standard for SPA + Vercel):
 *   /{lang}{pagePath}  for every supported language
 *   x-default          points to the fallback language (pt)
 */
export const LanguageSEO = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const activeLang = i18n.language;
    // Strip the language prefix to get the page-level path.
    // /pt/portfolio  ->  /portfolio
    // /pt            ->  ""
    const pagePath = location.pathname.replace(/^\/[^/]*/, "") || "";
    const canonicalHref = `${BASE_URL}/${activeLang}${pagePath}`;
    const hreflangCode = LANG_HREFLANG[activeLang] ?? activeLang;

    // --- Title & meta -------------------------------------------------------
    const title = t("seo.title");
    const description = t("seo.description");

    document.title = title;
    document.documentElement.lang = hreflangCode;

    upsertMetaTag("name", "description", description);
    upsertMetaTag("property", "og:title", title);
    upsertMetaTag("property", "og:description", description);
    upsertMetaTag("property", "og:url", canonicalHref);
    upsertMetaTag("property", "og:locale", hreflangCode);
    upsertMetaTag("name", "twitter:title", title);
    upsertMetaTag("name", "twitter:description", description);

    // --- Canonical ----------------------------------------------------------
    upsertCanonical(canonicalHref);

    // --- hreflang -----------------------------------------------------------
    // Remove previously injected tags (identified by data-hreflang attribute)
    document.querySelectorAll("link[data-hreflang]").forEach((el) => el.remove());

    // One <link rel="alternate"> per supported language
    SUPPORTED_LANGS.forEach((lang) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.setAttribute("hreflang", LANG_HREFLANG[lang]);
      link.href = `${BASE_URL}/${lang}${pagePath}`;
      link.setAttribute("data-hreflang", "true");
      document.head.appendChild(link);
    });

    // x-default points to the fallback language
    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.setAttribute("hreflang", "x-default");
    xDefault.href = `${BASE_URL}/${FALLBACK_LANG}${pagePath}`;
    xDefault.setAttribute("data-hreflang", "true");
    document.head.appendChild(xDefault);
  }, [i18n.language, location.pathname, t]);

  return null;
};
