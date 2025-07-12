import { useEffect } from 'react';
import './styles.css';
import Resume from './components/Resume';
import ChatWidget from './components/ChatWidget';
import useTranslation from './hooks/useTraslation';
import { useLanguage } from './contexts/LanguageContext';

const App = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation(language);

  useEffect(() => {
    // Получаем язык из URL параметров
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    // Проверяем параметр URL
    if (langParam && (langParam === 'ru' || langParam === 'en')) {
      setLanguage(langParam);
      localStorage.setItem('language', langParam);
      document.documentElement.lang = langParam;
      return;
    }
    
    // Если нет параметра URL, проверяем localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
      // Обновляем URL с правильным параметром
      updateUrlWithLanguage(savedLanguage);
      return;
    }
    
    // Если нет ни URL, ни localStorage, определяем язык браузера
    const browserLang = navigator.language.split('-')[0];
    const newLang = (browserLang === 'ru') ? browserLang : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
    // Обновляем URL с правильным параметром
    updateUrlWithLanguage(newLang);
  }, []);
  
  // Theme is now managed by ThemeProvider

  // Функция для обновления URL с параметром языка
  const updateUrlWithLanguage = (lang: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url.toString());
  };

  // Функция для изменения языка
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as 'en' | 'ru');
    updateUrlWithLanguage(newLanguage);
  };

  const env = import.meta.env;

  return (
    <>
      <Resume t={t} language={language} onLanguageChange={handleLanguageChange} />
      <ChatWidget 
        apiKey={env?.VITE_OPENAI_API_KEY}
        position="bottom-right"
        primaryColor="#4a6cf7"
        language={language}
      />
    </>
  );
};

export default App;
