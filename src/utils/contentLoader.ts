// Статические импорты для всех файлов контента
import aboutRu from '../content/ru/about.md?raw';
import aboutEn from '../content/en/about.md?raw';
import experienceRu from '../content/ru/experience.md?raw';
import experienceEn from '../content/en/experience.md?raw';
import educationRu from '../content/ru/education.md?raw';
import educationEn from '../content/en/education.md?raw';
import certificatesRu from '../content/ru/certificates.md?raw';
import certificatesEn from '../content/en/certificates.md?raw';
import projectsRu from '../content/ru/projects.md?raw';
import projectsEn from '../content/en/projects.md?raw';
import languagesRu from '../content/ru/languages.md?raw';
import languagesEn from '../content/en/languages.md?raw';
import skillsRu from '../content/ru/skills.md?raw';
import skillsEn from '../content/en/skills.md?raw';

// Статические импорты для переводов
import translationsRu from '../locales/ru/translation.json';
import translationsEn from '../locales/en/translation.json';

// Карта контента
const contentMap: Record<string, Record<string, string>> = {
  ru: {
    about: aboutRu,
    experience: experienceRu,
    education: educationRu,
    certificates: certificatesRu,
    projects: projectsRu,
    languages: languagesRu,
    skills: skillsRu,
  },
  en: {
    about: aboutEn,
    experience: experienceEn,
    education: educationEn,
    certificates: certificatesEn,
    projects: projectsEn,
    languages: languagesEn,
    skills: skillsEn,
  }
};

// Карта переводов
const translationsMap: Record<string, Record<string, string>> = {
  ru: translationsRu,
  en: translationsEn,
};

// Функция для получения контента
export function getContent(section: string, language: string): string {
  return contentMap[language]?.[section] || '';
}

// Функция для получения переводов
export function getTranslationsSync(language: string): Record<string, string> {
  return translationsMap[language] || translationsMap['ru'];
}

// Функция для парсинга markdown в HTML (простая реализация)
export function parseMarkdown(markdown: string): string {
  return markdown
    // Заголовки
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Жирный текст
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    // Курсив
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Ссылки
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Переносы строк
    .replace(/\n\n/gim, '</p><p>')
    .replace(/\n/gim, '<br>')
    // Обертка в параграфы
    .replace(/^(.+)$/gim, '<p>$1</p>')
    // Исправление множественных параграфов
    .replace(/<\/p><p><\/p><p>/gim, '</p><p>');
}
