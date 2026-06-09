'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getLanguageFromCookie, setLanguageCookie, DEFAULT_LANG } from '@/lib/language';

const LanguageContext = createContext({
  language: DEFAULT_LANG,
  setLanguage: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(DEFAULT_LANG);

  useEffect(() => {
    setLanguageState(getLanguageFromCookie());
  }, []);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    setLanguageCookie(lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
