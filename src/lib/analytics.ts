import ReactGA from "react-ga4";

import { hasAnalyticsConsent } from "@/lib/cookie-consent";

let initializedMeasurementId: string | null = null;
let lastTrackedPage: string | null = null;
let hasWarnedMissingMeasurementId = false;

export const getAnalyticsMeasurementId = () =>
  import.meta.env.VITE_GA_TRACKING_ID || import.meta.env.VITE_GA_MEASUREMENT_ID || "";

export const isAnalyticsReady = () => initializedMeasurementId !== null;

export const initializeAnalytics = () => {
  const measurementId = getAnalyticsMeasurementId();

  if (!measurementId) {
    if (import.meta.env.DEV && !hasWarnedMissingMeasurementId) {
      console.warn(
        "GA4 disabled: set VITE_GA_TRACKING_ID or VITE_GA_MEASUREMENT_ID to enable analytics.",
      );
      hasWarnedMissingMeasurementId = true;
    }

    return false;
  }

  if (typeof window === "undefined") {
    return false;
  }

  if (initializedMeasurementId === measurementId) {
    return true;
  }

  ReactGA.initialize(measurementId, {
    gaOptions: {
      anonymizeIp: true,
    },
    gtagOptions: {
      anonymize_ip: true,
      send_page_view: false,
    },
  });

  initializedMeasurementId = measurementId;

  return true;
};

export const trackPageView = (page: string, title = document.title) => {
  if (!hasAnalyticsConsent() || !isAnalyticsReady() || lastTrackedPage === page) {
    return;
  }

  ReactGA.send({
    hitType: "pageview",
    location: window.location.href,
    page,
    title,
  });

  lastTrackedPage = page;
};

export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number,
  nonInteraction = false,
) => {
  if (!hasAnalyticsConsent() || !isAnalyticsReady()) {
    return;
  }

  ReactGA.event({
    action,
    category,
    label,
    nonInteraction,
    transport: "beacon",
    value,
  });
};