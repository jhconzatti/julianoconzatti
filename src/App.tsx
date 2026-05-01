import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route, useParams } from "react-router-dom";
import { lazy, Suspense } from "react";

import { LanguageProvider } from "./contexts/LanguageContext";
import { ConsentAwareAnalytics } from "./components/ConsentAwareAnalytics";
import { CookieBanner } from "./components/CookieBanner";
import { LanguageSEO } from "./components/SeoMeta";
import { LanguageRouter } from "./components/LanguageRouter";
import i18n from "./lib/i18n";
import { SUPPORTED_LANGS, type SupportedLang } from "./hooks/use-lang";

const Index = lazy(() => import("./pages/Index"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const GuiaIASuporte = lazy(() => import("./pages/GuiaIASuporte"));
const MestresDiagnostico = lazy(() => import("./pages/MestresDiagnostico"));
const GeradorKCS = lazy(() => import("./pages/GeradorKCS"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <span className="text-muted-foreground text-sm">Carregando...</span>
  </div>
);

/** Redirects `/` to the detected language root, e.g. `/pt`. */
const DefaultLangRedirect = () => {
  const lang = (SUPPORTED_LANGS.includes(i18n.language as SupportedLang)
    ? i18n.language
    : "pt") as SupportedLang;
  return <Navigate to={`/${lang}`} replace />;
};

/** Redirects legacy unprefixed paths (e.g. `/blog`) to `/{lang}/blog`. */
const LegacyRedirect = ({ to }: { to: string }) => {
  const lang = (SUPPORTED_LANGS.includes(i18n.language as SupportedLang)
    ? i18n.language
    : "pt") as SupportedLang;
  return <Navigate to={`/${lang}${to}`} replace />;
};

/** Legacy `/blog/:slug` redirect — needs useParams to capture the slug. */
const LegacyBlogSlugRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const lang = (SUPPORTED_LANGS.includes(i18n.language as SupportedLang)
    ? i18n.language
    : "pt") as SupportedLang;
  return <Navigate to={`/${lang}/blog/${slug ?? ""}`} replace />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageSEO />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Root: redirect to detected language */}
              <Route path="/" element={<DefaultLangRedirect />} />

              {/* Language-prefixed routes — source of truth for all content */}
              <Route path="/:lang" element={<LanguageRouter />}>
                <Route index element={<Index />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="guia-ia-suporte" element={<GuiaIASuporte />} />
                <Route path="mestres-diagnostico" element={<MestresDiagnostico />} />
                <Route path="gerador-kcs" element={<GeradorKCS />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="cookies" element={<CookiePolicy />} />
              </Route>

              {/* Legacy redirects: preserve inbound links from Google/social */}
              <Route path="/blog" element={<LegacyRedirect to="/blog" />} />
              <Route path="/blog/:slug" element={<LegacyBlogSlugRedirect />} />
              <Route path="/portfolio" element={<LegacyRedirect to="/portfolio" />} />
              <Route path="/guia-ia-suporte" element={<LegacyRedirect to="/guia-ia-suporte" />} />
              <Route path="/mestres-diagnostico" element={<LegacyRedirect to="/mestres-diagnostico" />} />
              <Route path="/gerador-kcs" element={<LegacyRedirect to="/gerador-kcs" />} />
              <Route path="/privacy" element={<LegacyRedirect to="/privacy" />} />
              <Route path="/cookies" element={<LegacyRedirect to="/cookies" />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <CookieBanner />
          <ConsentAwareAnalytics />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
