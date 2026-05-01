export const COOKIE_CONSENT_STORAGE_KEY = "conzatti-cookie-consent";
export const COOKIE_CONSENT_EVENT = "conzatti-cookie-consent-updated";
export const COOKIE_PREFERENCES_OPEN_EVENT = "conzatti-cookie-preferences-open";

export type CookieConsentState = "essential" | "accepted";

export const getCookieConsentState = (): CookieConsentState | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

  if (value === "accepted" || value === "essential") {
    return value;
  }

  return null;
};

export const hasAnalyticsConsent = () => getCookieConsentState() === "accepted";

const setCookieConsentState = (state: CookieConsentState) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, state);
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
};

export const acceptCookieConsent = () => setCookieConsentState("accepted");

export const acceptEssentialCookiesOnly = () => setCookieConsentState("essential");

export const openCookiePreferences = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(COOKIE_PREFERENCES_OPEN_EVENT));
};