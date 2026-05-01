import { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import i18n from "@/lib/i18n";
import { SUPPORTED_LANGS, type SupportedLang } from "@/hooks/use-lang";

/**
 * Layout route for `/:lang`.
 *
 * Validates the `:lang` param against SUPPORTED_LANGS and:
 *   • Calls `i18n.changeLanguage(lang)` when the param changes, keeping the
 *     i18next state in sync with the URL — the source of truth.
 *   • Redirects to `/pt` when the lang param is unknown (e.g. `/de`).
 *   • Renders `<Outlet />` for all valid child routes.
 */
export const LanguageRouter = () => {
  const { lang } = useParams<{ lang: string }>();
  const isValid = SUPPORTED_LANGS.includes(lang as SupportedLang);

  useEffect(() => {
    if (isValid && lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [lang, isValid]);

  if (!isValid) {
    return <Navigate to="/pt" replace />;
  }

  return <Outlet />;
};
