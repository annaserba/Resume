import { useEffect, useState } from 'react';
import Skills from './Skills';
import { getContent } from '../../utils/contentLoader';

interface SkillsViewerProps {
  language: string;
  // Тестовые пропсы
  testSkillCategories?: SkillCategory[];
  testIsLoading?: boolean;
  testError?: string | null;
}

interface SkillWithLevel {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  items: SkillWithLevel[];
}

const SkillsViewer: React.FC<SkillsViewerProps> = ({ 
  language, 
  testSkillCategories,
  testIsLoading,
  testError 
}) => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(testSkillCategories || []);
  const [isLoading, setIsLoading] = useState<boolean>(testIsLoading !== undefined ? testIsLoading : true);
  const [error, setError] = useState<string | null>(testError !== undefined ? testError : null);

  useEffect(() => {
    // Если предоставлены тестовые пропсы, не загружаем markdown
    if (testSkillCategories !== undefined || testIsLoading !== undefined || testError !== undefined) {
      return;
    }
    
    const loadSkills = () => {
      setIsLoading(true);
      try {
        const rawContent = getContent('skills', language);
        if (rawContent) {
          // Парсинг сырого markdown для извлечения категорий и навыков с уровнями
          const categories = parseSkillsMarkdown(rawContent);
          setSkillCategories(categories);
          setError(null);
        } else {
          setError(`Skills content not found for ${language}`);
        }
      } catch (err) {
        console.error(`Error loading skills: ${err}`);
        setError(`Failed to load skills content`);
      } finally {
        setIsLoading(false);
      }
    };

    loadSkills();
  }, [language, testSkillCategories, testIsLoading, testError]);

  // Функция для парсинга markdown с навыками (упрощенная версия без SSG)
  const parseSkillsMarkdown = (rawMarkdown: string): SkillCategory[] => {
    const categories: SkillCategory[] = [];
    const lines = rawMarkdown.split('\n');
    
    let currentCategory: SkillCategory | null = null;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Проверяем заголовки (## Категория)
      if (trimmedLine.startsWith('## ')) {
        // Сохраняем предыдущую категорию
        if (currentCategory && currentCategory.items.length > 0) {
          categories.push(currentCategory);
        }
        
        // Создаем новую категорию
        currentCategory = {
          category: trimmedLine.replace('## ', ''),
          items: []
        };
      }
      // Проверяем элементы списка (- Навык:Уровень)
      else if (trimmedLine.startsWith('- ') && currentCategory) {
        const skillText = trimmedLine.replace('- ', '');
        const [name, levelStr] = skillText.split(':');
        
        if (name && levelStr) {
          const level = parseInt(levelStr.trim(), 10);
          if (!isNaN(level) && level >= 1 && level <= 5) {
            currentCategory.items.push({
              name: name.trim(),
              level
            });
          }
        }
      }
    }
    
    // Добавляем последнюю категорию
    if (currentCategory && currentCategory.items.length > 0) {
      categories.push(currentCategory);
    }
    
    return categories;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-pulse flex space-x-2" data-testid="skills-loading">
          <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
          <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
          <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 border border-red-200 bg-red-50 rounded-md">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Error:</span> {error}
        </div>
      </div>
    );
  }

  return <Skills skills={skillCategories} />;
};

export default SkillsViewer;
