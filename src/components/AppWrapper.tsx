import React from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { LanguageProvider } from './providers/LanguageProvider';
import Resume from './Resume';
import ChatWidget from './ChatWidget';

interface AppWrapperProps {
  language: 'en' | 'ru';
  translations: Record<string, string>;
  apiKey?: string;
  enableChatWidget?: boolean;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ language, translations, apiKey, enableChatWidget = false }) => {
  const handleLanguageChange = (newLanguage: string) => {
    // Переходим на соответствующую страницу языка
    if (newLanguage === 'en') {
      window.location.href = '/en/';
    } else {
      window.location.href = '/';
    }
  };

  return (
    <LanguageProvider initialLanguage={language}>
      <ThemeProvider>
        <Resume 
          language={language}
          onLanguageChange={handleLanguageChange}
          t={translations}
        />
        {enableChatWidget && (
          <ChatWidget 
            apiKey={apiKey}
            position="bottom-right"
            primaryColor="#4a6cf7"
            language={language}
          />
        )}
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default AppWrapper;
