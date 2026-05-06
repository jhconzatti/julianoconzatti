import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { useLocation } from "react-router-dom";

import { COOKIE_CONSENT_EVENT, hasAnalyticsConsent } from "@/lib/cookie-consent";
import { getAnalyticsMeasurementId, initializeAnalytics, trackPageView } from "@/lib/analytics";

const REDIRECT_ONLY_PATHS = new Set([
  "/",
  "/blog",
  "/portfolio",
  "/guia-ia-suporte",
  "/mestres-diagnostico",
  "/gerador-kcs",
  "/privacy",
  "/cookies",
]);

const isLegacyBlogRedirect = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);

  return segments.length === 2 && segments[0] === "blog";
};

const shouldTrackPage = (pathname: string) =>
  !REDIRECT_ONLY_PATHS.has(pathname) && !isLegacyBlogRedirect(pathname);

export const AnalyticsTracker = () => {
  const location = useLocation();
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(() => hasAnalyticsConsent());
  const measurementId = getAnalyticsMeasurementId();
  const page = `${location.pathname}${location.search}`;

  useEffect(() => {
    const syncConsent = () => setIsAnalyticsEnabled(hasAnalyticsConsent());

    window.addEventListener(COOKIE_CONSENT_EVENT, syncConsent);
    window.addEventListener("storage", syncConsent);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncConsent);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

  useEffect(() => {
    if (!isAnalyticsEnabled || !measurementId) {
      return;
    }

    initializeAnalytics();
  }, [isAnalyticsEnabled, measurementId]);

  useEffect(() => {
    if (!isAnalyticsEnabled || !measurementId || !shouldTrackPage(location.pathname)) {
      return;
    }

    trackPageView(page, document.title);
  }, [isAnalyticsEnabled, measurementId, location.pathname, page]);

  if (!isAnalyticsEnabled) {
    return null;
  }

  return <Analytics />;
};