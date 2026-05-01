/**
 * src/lib/i18n.ts
 *
 * i18next configuration — "gold standard" setup:
 *   • i18next-http-backend: lazy-loads only the active language's JSON chunk
 *   • React Suspense integration: app renders only after the locale is ready
 *   • Language initialised from URL path → localStorage → default (pt)
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import { SUPPORTED_LANGS } from "@/hooks/use-lang";

// ─── Language detection: URL segment → localStorage → default ───────────────
const detectLanguage = () => {
  const seg = window.location.pathname.split("/")[1]?.toLowerCase();
  if (seg && (SUPPORTED_LANGS as readonly string[]).includes(seg)) {
    return seg;
  }
  const saved = localStorage.getItem("app-language");
  if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) {
    return saved;
  }
  return "pt";
};

// ─── Init ───────────────────────────────────────────────────────────────────
i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: detectLanguage(),
    fallbackLng: "pt",
    supportedLngs: [...SUPPORTED_LANGS],

    ns: ["translation"],
    defaultNS: "translation",

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    // Preserves the `t('experience.items') as ExperienceData[]` pattern
    returnObjects: true,

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: true,
    },
  });

export default i18n;
