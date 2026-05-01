import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLang } from "@/hooks/use-lang";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const { t } = useLanguage();
  const { lp, lang } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = useMemo(() => [
    { name: t('nav.portfolio'), path: lp('/portfolio') },
    { name: t('nav.blog'), path: lp('/blog') },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [t, lang]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LADO ESQUERDO: Logo JC + ThemeToggle (ao lado direito do JC) */}
        <div className="flex items-center gap-6">
          <Link to={lp('/')} className="jc-glass-loop text-2xl font-bold text-gradient hover:opacity-90 transition-opacity duration-500">
            JC
          </Link>
          {/* ThemeToggle posicionado aqui, visível apenas em Desktop */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>

        {/* LADO DIREITO: Links de Navegação + LanguageToggle */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Apenas o LanguageToggle fica na direita */}
          <div className="flex items-center gap-3 pl-6 border-l border-border/50">
            <LanguageToggle /> 
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border/50 animate-fade-in shadow-lg">
          <div className="flex flex-col p-6 gap-4 max-w-5xl mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-lg font-medium transition-colors ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <span className="text-muted-foreground text-sm">Configurações</span>
              <div className="flex gap-3">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};