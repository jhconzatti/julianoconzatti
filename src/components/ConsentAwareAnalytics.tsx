import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { useLocation } from "react-router-dom";

import { COOKIE_CONSENT_EVENT, hasAnalyticsConsent } from "@/lib/cookie-consent";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GOOGLE_ANALYTICS_SCRIPT_ID = "google-analytics-script";

const getGoogleAnalyticsMeasurementId = () => import.meta.env.VITE_GA_MEASUREMENT_ID;

export const ConsentAwareAnalytics = () => {
  const location = useLocation();
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(hasAnalyticsConsent);
  const measurementId = getGoogleAnalyticsMeasurementId();

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
    if (!isAnalyticsEnabled || !measurementId || document.getElementById(GOOGLE_ANALYTICS_SCRIPT_ID)) {
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_ANALYTICS_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      anonymize_ip: true,
      send_page_view: false,
    });
  }, [isAnalyticsEnabled, measurementId]);

  useEffect(() => {
    if (!isAnalyticsEnabled || !measurementId || !window.gtag) {
      return;
    }

    window.gtag("config", measurementId, {
      anonymize_ip: true,
      page_path: `${location.pathname}${location.search}${location.hash}`,
      page_title: document.title,
    });
  }, [isAnalyticsEnabled, measurementId, location.hash, location.pathname, location.search]);

  if (!isAnalyticsEnabled) {
    return null;
  }

  return <Analytics />;
};