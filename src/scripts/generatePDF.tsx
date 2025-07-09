import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import puppeteer from 'puppeteer';
import { marked } from 'marked';
import en from '../locales/en/translation.json';

// Определение типа Translation для скрипта
type Translation = {
  name: string;
  about: string;
  experience: string;
  education: string;
  skills: string;
  certificates: string;
  projects: string;
  contacts: string;
  footer: string;
  pdfGenerator: string;
  header: string;
};
import { renderToString } from 'react-dom/server';
import Contacts from '../components/Contacts/Contacts';
import renderSkills from '../components/Skills/SkillsServerRenderer';

// Use require for importing binary files and JSON
const require = createRequire(import.meta.url);

// Get the directory name equivalent to __dirname in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define types
type Language = string;

// Интерфейсы для навыков с уровнями
interface SkillWithLevel {
  name: string;
  level: number; // От 1 до 5
}

interface SkillCategory {
  category: string;
  items: SkillWithLevel[];
}

// Функция для парсинга markdown с навыками и уровнями
function parseSkillsMarkdown(markdown: string): SkillCategory[] {
  const categories: SkillCategory[] = [];
  let currentCategory: SkillCategory | null = null;

  // Разбиваем markdown на строки
  const lines = markdown.split('\n');

  for (const line of lines) {
    // Проверяем, является ли строка заголовком категории
    if (line.startsWith('## ')) {
      if (currentCategory) {
        categories.push(currentCategory);
      }
      currentCategory = {
        category: line.substring(3).trim(),
        items: []
      };
    } 
    // Проверяем, является ли строка элементом списка с уровнем
    else if (line.startsWith('- ') && currentCategory) {
      const itemText = line.substring(2).trim();
      const [name, levelStr] = itemText.split(':');
      
      if (name && levelStr) {
        const level = parseInt(levelStr, 10);
        if (!isNaN(level) && level >= 1 && level <= 5) {
          currentCategory.items.push({
            name: name.trim(),
            level
          });
        }
      }
    }
  }

  // Добавляем последнюю категорию, если она есть
  if (currentCategory && currentCategory.items.length > 0) {
    categories.push(currentCategory);
  }

  return categories;
}

// Function to get all available languages
function getAvailableLanguages(): Language[] {
  const contentDir = path.join(__dirname, '..', 'content');
  try {
    return fs.readdirSync(contentDir).filter(file => 
      fs.statSync(path.join(contentDir, file)).isDirectory()
    );
  } catch (error) {
    console.error('Error reading language directories:', error);
    return ['ru', 'en']; // Default fallback
  }
}

// Function to read markdown files and combine them
async function combineMarkdownFiles(language: Language): Promise<string> {
  // Reordered sections with contacts right after name and experience at the end
  const sections = ['about', 'education', 'skills', 'projects', 'certificates', 'experience'];
  let combinedContent = '';
  
  // Import translations from JSON files
  let translations: Translation;
  try {
    // Import the translation file for the current language
    translations = require(`../locales/${language}/translation.json`) as Translation;
  } catch (error) {
    console.error(`Error loading translations for ${language}:`, error);
    // Fallback to English if translation file not found
    translations = en;
  }
 const headerHtml = renderToString(<div className="header">
 {translations.header} {new Date().toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })} 
</div>)
  // Use server-side rendering for the Contacts component
  // This uses the same component structure as in the React app
  const contactsHtml = renderToString(<Contacts language={language} />);

  
  // Add the server-rendered contacts HTML to the combined content
  combinedContent += headerHtml+ contactsHtml + '\n\n';
  
  // Add remaining sections
  for (const section of sections) {
    try {
      const filePath = path.join(__dirname, '..', 'content', language, `${section}.md`);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Get section title with fallbacks
        const sectionTitle = translations[section as keyof Translation] || section;
        
        // Специальная обработка для раздела навыков
        if (section === 'skills') {
          // Парсим навыки с уровнями и рендерим их с помощью серверного рендерера
          const skillCategories = parseSkillsMarkdown(content);
          const skillsHtml = renderSkills(skillCategories);
          combinedContent += `## ${sectionTitle}\n\n${skillsHtml}\n\n`;
        } else {
          // Для остальных разделов используем обычный markdown
          combinedContent += `## ${sectionTitle}\n\n${content}\n\n`;
        }
      }
    } catch (error) {
      console.error(`Error reading ${section} file for ${language}:`, error);
    }
  }
  
  return combinedContent;
}

// Function to generate PDF from markdown content using html2pdf approach with puppeteer
async function generatePDF(markdown: string, outputPath: string, language: Language): Promise<void> {
  try {
    // Convert markdown to HTML
    const html = marked(markdown);
    
    // Используем уже загруженные переводы из предыдущего шага
    // Нет необходимости загружать их снова
    
    // Create styled HTML with proper font support for Cyrillic
    const styledHtml = `
      <!DOCTYPE html>
      <html lang="${language}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resume</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
          
          /* Базовые стили */
          body {
            font-family: 'Roboto', Arial, sans-serif;
            margin: 5mm;
            color: #333;
            line-height: 1.5;
            background-color: #ffffff;
          }
          
          /* Заголовки в стиле Tailwind */
          h1 {
            color: #000000; /* Черный цвет */
            font-size: 1.875rem; /* text-3xl */
            font-weight: 700; /* font-bold */
            margin-bottom: 0.5rem;
          }
          
          h2 {
            color: #000000; /* Черный цвет */
            font-size: 1.25rem; /* text-xl */
            font-weight: 600; /* font-semibold */
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            border-bottom: 1px solid #d1d5db; /* border-gray-300 */
            padding-bottom: 0.25rem;
          }
          
          h3 {
            color: #000000; /* Черный цвет */
            font-size: 1.125rem; /* text-lg */
            font-weight: 500; /* font-medium */
            margin-top: 0.75rem;
            margin-bottom: 0.5rem;
          }
          
          /* Текстовые элементы */
          p {
            margin: 0.5rem 0; /* my-2 */
          }
          
          /* Списки */
          ul {
            list-style-type: disc;
            padding-left: 1.25rem; /* pl-5 */
            margin: 0.5rem 0; /* my-2 */
          }
          
          li {
            margin-bottom: 0.25rem; /* mb-1 */
          }
          
          /* Ссылки */
          a {
            color: #2563eb; /* text-blue-600 */
            text-decoration: underline;
          }
          
          a:hover {
            color: #1d4ed8; /* text-blue-800 */
          }
          
          /* Стили для контактов */
          .flex {
            display: flex;
          }
          
          .items-center {
            align-items: center;
          }
          
          .gap-1 {
            gap: 0.25rem;
          }
          
          .gap-4 {
            gap: 1rem;
          }
          
          .mt-2 {
            margin-top: 0.5rem;
          }
          
          .text-sm {
            font-size: 0.875rem;
          }
          
          .text-gray-600 {
            color: #4b5563;
          }
          
          .transition-colors {
            transition-property: color;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
          }
          
          /* Стили для маркдаун контента */
          .markdown-content h2 {
            color: #000000; /* Черный цвет */
            font-size: 1.25rem; /* text-xl */
            font-weight: 600; /* font-semibold */
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          
          .markdown-content h3 {
            color: #000000; /* Черный цвет */
            font-size: 1.125rem; /* text-lg */
            font-weight: 500; /* font-medium */
            margin-top: 0.75rem;
            margin-bottom: 0.5rem;
          }
          
          .markdown-content p {
            margin: 0.5rem 0; /* my-2 */
          }
          
          .markdown-content ul {
            list-style-type: disc;
            padding-left: 1.25rem; /* pl-5 */
            margin: 0.5rem 0; /* my-2 */
          }
          
          .markdown-content li {
            margin-bottom: 0.25rem; /* mb-1 */
          }
          
          .header {
            position: fixed;
            width: 95%;
            text-align: right;
            font-size: 10px;
            color: #808080;
          }
        </style>
      </head>
      <body>
      
        ${html}
      </body>
      </html>
    `;
    
    // Launch a headless browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    // Create a new page
    const page = await browser.newPage();
    
    // Set content to our HTML
    await page.setContent(styledHtml, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    await page.pdf({
      path: outputPath,
      format: 'a4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });
    
    // Close the browser
    await browser.close();
    
    console.log(`PDF generated at: ${outputPath}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

// Main function to generate PDFs for all languages
async function generateResumePDFs(): Promise<void> {
  const publicDir = path.join(__dirname, '../..', 'public');
  
  // Create public directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Get all available languages
  const languages = getAvailableLanguages();
  console.log(`Generating PDFs for languages: ${languages.join(', ')}`);
  
  // Generate PDFs for all languages
  for (const language of languages) {
    try {
      const markdown = await combineMarkdownFiles(language);
      const outputPath = path.join(publicDir, `resume_${language}.pdf`);
      generatePDF(markdown, outputPath, language);
    } catch (error) {
      console.error(`Error generating PDF for ${language}:`, error);
    }
  }
}

// Run the PDF generation
generateResumePDFs();
