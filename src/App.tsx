import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react'; 

// 1. IMPORTE O PROVIDER DE IDIOMA
import { LanguageProvider } from "./contexts/LanguageContext";

import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Portfolio from "./pages/Portfolio";
import GuiaIASuporte from "./pages/GuiaIASuporte";
import MestresDiagnostico from "./pages/MestresDiagnostico";
import GeradorKCS from "./pages/GeradorKCS";
import NotFound from "./pages/NotFound";
import { SeoMeta } from "./components/SeoMeta";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* 2. ENVOLVA TUDO COM O LANGUAGE PROVIDER AQUI */}
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SeoMeta />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/en" element={<Index />} />
            <Route path="/es" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/guia-ia-suporte" element={<GuiaIASuporte />} />
            <Route path="/mestres-diagnostico" element={<MestresDiagnostico />} />
            <Route path="/gerador-kcs" element={<GeradorKCS />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
    {/* FIM DO ENVOLVIMENTO */}
    
    <Analytics />
  </QueryClientProvider>
);

export default App;