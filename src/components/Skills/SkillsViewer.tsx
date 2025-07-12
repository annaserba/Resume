import { useEffect, useState } from 'react';
import Skills from './Skills';

interface SkillsViewerProps {
  language: string;
  theme?: 'light' | 'dark';
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
  theme = 'light',
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
    
    const fetchSkills = async () => {
      setIsLoading(true);
      try {
        const response = await import(`@/content/${language}/skills.md`);
        const text = response.html as string;
        
        // Парсинг markdown для извлечения категорий и навыков с уровнями
        const categories = parseSkillsMarkdown(text);
        setSkillCategories(categories);
        setError(null);
      } catch (err) {
        console.error(`Error loading skills: ${err}`);
        setError(`Failed to load skills content`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, [language, testSkillCategories, testIsLoading, testError]);

  // Функция для парсинга markdown с навыками
  const parseSkillsMarkdown = (html: string): SkillCategory[] => {
    const categories: SkillCategory[] = [];

    // Создаем временный div для парсинга HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Находим все заголовки h2 (категории навыков)
    const h2Elements = tempDiv.querySelectorAll('h2');
    
    h2Elements.forEach((h2) => {
      const categoryName = h2.textContent?.trim() || '';
      const category: SkillCategory = {
        category: categoryName,
        items: []
      };
      
      // Находим список ul, который следует за заголовком
      let ulElement = h2.nextElementSibling;
      while (ulElement && ulElement.tagName !== 'UL') {
        ulElement = ulElement.nextElementSibling;
      }
      
      if (ulElement) {
        // Находим все элементы списка
        const liElements = ulElement.querySelectorAll('li');
        
        liElements.forEach((li) => {
          const text = li.textContent?.trim() || '';
          const [name, levelStr] = text.split(':');
          
          if (name && levelStr) {
            const level = parseInt(levelStr, 10);
            if (!isNaN(level) && level >= 1 && level <= 5) {
              category.items.push({
                name: name.trim(),
                level
              });
            }
          }
        });
      }
      
      if (category.items.length > 0) {
        categories.push(category);
      }
    });

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

  return <Skills skills={skillCategories} theme={theme} />;
};

export default SkillsViewer;
