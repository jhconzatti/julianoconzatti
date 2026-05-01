// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/lib/i18n';
import type { Language, TranslationKey } from '../utils/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // useTranslation() subscribes this component to i18n and triggers re-render on language
  // change. With useSuspense:true it also suspends the subtree while the JSON loads.
  const { t: i18nT } = useTranslation();

  const [language, setLanguageState] = useState<Language>(
    () => (i18n.language as Language) ?? 'pt',
  );

  // Keep local state in sync when i18n.changeLanguage() is called from anywhere
  useEffect(() => {
    const handler = (lng: string) => {
      setLanguageState(lng as Language);
      localStorage.setItem('app-language', lng);
    };
    i18n.on('languageChanged', handler);
    return () => { i18n.off('languageChanged', handler); };
  }, []);

  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang); // triggers languageChanged -> updates state above
  };

  // returnObjects:true preserves the existing `t('experience.items') as T[]` pattern
  const t = useMemo(
    () =>
      (key: TranslationKey): string =>
        i18nT(key as string, { returnObjects: true }) as string,
    [i18nT],
  );

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
