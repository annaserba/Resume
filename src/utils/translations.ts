// Утилита для работы с переводами в Astro
export async function getTranslations(language: string): Promise<Record<string, string>> {
  try {
    const translations = await import(`../locales/${language}/translation.json`);
    return translations.default || translations;
  } catch (error) {
    console.error(`Failed to load translations for ${language}:`, error);
    // Fallback к русскому языку
    try {
      const fallback = await import(`../locales/ru/translation.json`);
      return fallback.default || fallback;
    } catch (fallbackError) {
      console.error('Failed to load fallback translations:', fallbackError);
      return {};
    }
  }
}

// Функция для получения переводов на клиенте (для React компонентов)
import { useState, useEffect } from 'react';

export function useTranslations(language: string) {
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    getTranslations(language).then(setTranslations);
  }, [language]);

  return translations;
}

// Простая функция для получения перевода
export function t(key: string, translations: Record<string, string>): string {
  return translations[key] || key;
}
