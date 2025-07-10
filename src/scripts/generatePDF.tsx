import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import puppeteer from 'puppeteer';
import { marked } from 'marked';
import en from '../locales/en/translation.json';
import { getPdfTemplate } from '../templates/pdfTemplate';
import { renderToString } from 'react-dom/server';
import Contacts from '../components/Contacts/Contacts';
import renderSkills from '../components/Skills/SkillsServerRenderer';

// Use require for importing binary files and JSON
const require = createRequire(import.meta.url);

// Get the directory name equivalent to __dirname in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define additional types

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
function getAvailableLanguages(): string[] {
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

function getTranslation(language: string) {
  try {
    const translation = require(`../locales/${language}/translation.json`);
    return translation;
  } catch (error) {
    console.error(`Error loading translation for ${language}:`, error);
    return en;
  }
}

// Function to read markdown files and combine them
async function combineMarkdownFiles(language: string): Promise<string> {
  // Reordered sections with contacts right after name and experience at the end
  const sections = ['about', 'education', 'skills', 'projects', 'certificates', 'experience'];
  let combinedContent = '';
  
  // Import translations from JSON files
  const translations = getTranslation(language);
  
 
  // Use server-side rendering for the Contacts component
  // This uses the same component structure as in the React app
  const contactsHtml = renderToString(<Contacts language={language} color='white' />);

  
  // Add the server-rendered contacts HTML to the combined content
  combinedContent += contactsHtml + '\n\n';
  
  // Add remaining sections
  for (const section of sections) {
    try {
      const filePath = path.join(__dirname, '..', 'content', language, `${section}.md`);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Get section title with fallbacks
        const sectionTitle = translations[section] || section;
        
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
async function generatePDF(markdown: string, outputPath: string, language: string): Promise<void> {
  try {
    const translations = getTranslation(language);
    // Convert markdown to HTML
    const html = await marked(markdown);
    
    // Get styled HTML template from external file
    const styledHtml = getPdfTemplate({html, language});
    
    // Launch a headless browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    // Create a new page
    const page = await browser.newPage();
    
    // Set content to our HTML
    await page.setContent(styledHtml, { waitUntil: 'networkidle0' });

    // Generate PDF with page numbers in footer
    await page.pdf({
      path: outputPath,
      format: 'a4',
      printBackground: true,
      margin: {
        top: '15mm',
        right: '10mm',
        bottom: '15mm',
        left: '10mm'
      },
      displayHeaderFooter: true,
      headerTemplate: `<span style="text-align: right; color: #808080; font-size: 12px; position: absolute; right: 5em;">
          ${translations.headerPdf} ${new Date().toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}  
          </span>`,
      footerTemplate: `<div style="width: 100%; text-align: center; font-size: 14px; color: #000000; padding: 0 10em;">
          ${translations.footerPdf} <span class="pageNumber"></span> 
        </div>`
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
