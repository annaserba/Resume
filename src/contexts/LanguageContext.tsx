import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import '../styles/language-loading.css';

type LanguageType = 'en' | 'ru';

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  isLanguageLoaded: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>('ru');
  const [isLanguageLoaded, setIsLanguageLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Load saved language from localStorage on initial render
    const savedLanguage = localStorage.getItem('language') as LanguageType;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
    // Установка флага загрузки языка после инициализации
    setIsLanguageLoaded(true);
  }, []);

  const handleSetLanguage = (newLanguage: LanguageType) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.documentElement.lang = newLanguage;
  };

  // Не рендерим контент, пока язык не загружен
  if (!isLanguageLoaded) {
    return (
      <div className="language-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, isLanguageLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
