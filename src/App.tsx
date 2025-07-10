import { useEffect, useState } from 'react';
import './styles.css';
import Resume from './components/Resume/Resume';

const App = () => {
  const [language, setLanguage] = useState('en');

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

  // Функция для обновления URL с параметром языка
  const updateUrlWithLanguage = (lang: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url.toString());
  };

  // Функция для изменения языка
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.documentElement.lang = newLanguage;
    updateUrlWithLanguage(newLanguage);
  };

  return <Resume language={language} onLanguageChange={handleLanguageChange} />;
};

export default App;
