import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

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

export const SeoMeta = () => {
  const { language, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const title = t("seo.title");
    const description = t("seo.description");

    document.title = title;
    document.documentElement.lang =
      language === "pt" ? "pt-BR" : language === "en" ? "en-US" : "es";

    upsertMetaTag("name", "description", description);
    upsertMetaTag("property", "og:title", title);
    upsertMetaTag("property", "og:description", description);
    upsertMetaTag("name", "twitter:title", title);
    upsertMetaTag("name", "twitter:description", description);
    upsertMetaTag("property", "og:locale", document.documentElement.lang);
  }, [language, location.pathname, t]);

  return null;
};
