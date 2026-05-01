import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/use-lang";
import {
  acceptCookieConsent,
  acceptEssentialCookiesOnly,
  COOKIE_PREFERENCES_OPEN_EVENT,
  getCookieConsentState,
} from "@/lib/cookie-consent";

export const CookieBanner = () => {
  const { t } = useTranslation();
  const { lp } = useLang();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const syncInitialVisibility = () => setIsVisible(getCookieConsentState() === null);
    const openPreferences = () => setIsVisible(true);

    syncInitialVisibility();
    window.addEventListener(COOKIE_PREFERENCES_OPEN_EVENT, openPreferences);

    return () => {
      window.removeEventListener(COOKIE_PREFERENCES_OPEN_EVENT, openPreferences);
    };
  }, []);

  const handleAcceptAll = () => {
    acceptCookieConsent();
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    acceptEssentialCookiesOnly();
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border/70 bg-background/95 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-background/85">
        <div className="flex flex-col gap-6 px-6 py-5 md:flex-row md:items-start md:justify-between md:px-7">
          <div className="flex gap-4">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-400 md:flex">
              <Cookie className="h-5 w-5" />
            </div>

            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rose-400">
                <Cookie className="h-3.5 w-3.5" />
                <span>{t("cookieBanner.eyebrow")}</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-semibold leading-tight text-foreground">
                  {t("cookieBanner.title")}
                </h2>
                <p className="text-sm leading-7 text-muted-foreground md:text-base">
                  {t("cookieBanner.description")}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <Link
                  to={lp("/privacy")}
                  className="font-medium text-rose-400 transition-colors hover:text-rose-300"
                >
                  {t("cookieBanner.privacyLinkLabel")}
                </Link>
                <Link
                  to={lp("/cookies")}
                  className="font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("cookieBanner.cookieLinkLabel")}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 md:w-auto md:min-w-[290px] md:flex-row md:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleEssentialOnly}
              className="min-w-36 border-border/80 bg-background/50"
            >
              {t("cookieBanner.essentialOnly")}
            </Button>

            <Button type="button" onClick={handleAcceptAll} className="min-w-36">
              {t("cookieBanner.acceptAll")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};