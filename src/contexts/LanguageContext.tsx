// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '../utils/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getLanguageFromPath = (): Language | null => {
    const path = window.location.pathname.toLowerCase();

    if (path === "/en" || path.startsWith("/en/")) return "en";
    if (path === "/es" || path.startsWith("/es/")) return "es";

    return null;
  };

  // Tenta pegar do localStorage ou define 'pt' como padrão
  const [language, setLanguage] = useState<Language>(() => {
    const pathLanguage = getLanguageFromPath();
    if (pathLanguage) return pathLanguage;

    const saved = localStorage.getItem('app-language');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  // Função auxiliar para buscar texto aninhado (ex: 'hero.role')
  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current[key] === undefined) return path; // Retorna a chave se não achar
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};