import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { translations } from '@/constants/translations';

const LanguageContext = createContext();

export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇺🇸',
    fontFamily: 'inherit',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦',
    fontFamily: "'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    applyLanguage(savedLang);
  }, []);

  const applyLanguage = (lang) => {
    const langConfig = LANGUAGES[lang];
    if (!langConfig) return;
    
    // Set HTML attributes
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', langConfig.dir);
    
    // Apply direction to body
    document.body.style.direction = langConfig.dir;
    document.body.style.textAlign = langConfig.dir === 'rtl' ? 'right' : 'left';
    
    // Add/remove RTL class for CSS targeting
    if (langConfig.dir === 'rtl') {
      document.documentElement.classList.add('rtl');
      document.body.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
      document.body.classList.remove('rtl');
    }
    
    // Apply font family for Arabic
    if (lang === 'ar') {
      document.body.style.fontFamily = langConfig.fontFamily;
    } else {
      document.body.style.fontFamily = '';
    }
  };

  const changeLanguage = useCallback((lang) => {
    if (!LANGUAGES[lang]) return;
    setLanguage(lang);
    localStorage.setItem('language', lang);
    applyLanguage(lang);
  }, []);

  // Translation function
  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        let fallback = translations['en'];
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        return fallback;
      }
    }
    
    return value || key;
  }, [language]);

  const isRTL = LANGUAGES[language]?.dir === 'rtl';
  const currentLanguage = LANGUAGES[language];
  const dir = currentLanguage?.dir || 'ltr';

  const value = useMemo(() => ({
    language,
    changeLanguage,
    isRTL,
    dir,
    currentLanguage,
    languages: LANGUAGES,
    t,
    translations: translations[language],
  }), [language, changeLanguage, isRTL, dir, currentLanguage, t]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{
        language: 'en',
        changeLanguage: () => {},
        isRTL: false,
        dir: 'ltr',
        currentLanguage: LANGUAGES.en,
        languages: LANGUAGES,
        t: (key) => key,
        translations: translations.en,
      }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export default LanguageContext;
