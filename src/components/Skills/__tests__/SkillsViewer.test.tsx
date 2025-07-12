// Импорт React не требуется в современных версиях React
import { render } from '@testing-library/react';
import SkillsViewer from '../SkillsViewer';

describe('SkillsViewer Component', () => {
  // Тестовые данные для английских навыков
  const mockEnglishSkills = [
    {
      category: 'Programming Languages',
      items: [
        { name: 'JavaScript', level: 5 },
        { name: 'TypeScript', level: 4 },
        { name: 'HTML', level: 5 },
        { name: 'CSS', level: 4 }
      ]
    },
    {
      category: 'Frameworks & Libraries',
      items: [
        { name: 'React', level: 5 },
        { name: 'Angular', level: 3 },
        { name: 'Vue', level: 3 }
      ]
    },
    {
      category: 'Tools',
      items: [
        { name: 'Git', level: 4 },
        { name: 'Webpack', level: 3 }
      ]
    },
    {
      category: 'Testing',
      items: [
        { name: 'Jest', level: 4 },
        { name: 'Cypress', level: 3 },
        { name: 'Selenium', level: 3 }
      ]
    }
  ];

  // Тестовые данные для русских навыков
  const mockRussianSkills = [
    {
      category: 'Языки программирования',
      items: [
        { name: 'JavaScript', level: 5 },
        { name: 'TypeScript', level: 4 },
        { name: 'HTML', level: 5 },
        { name: 'CSS', level: 4 }
      ]
    },
    {
      category: 'Фреймворки и библиотеки',
      items: [
        { name: 'React', level: 5 },
        { name: 'Angular', level: 3 },
        { name: 'Vue', level: 3 }
      ]
    },
    {
      category: 'Инструменты',
      items: [
        { name: 'Git', level: 4 },
        { name: 'Webpack', level: 3 }
      ]
    },
    {
      category: 'Тестирование',
      items: [
        { name: 'Jest', level: 4 },
        { name: 'Cypress', level: 3 },
        { name: 'Selenium', level: 3 }
      ]
    }
  ];

  test('renders English skills correctly', () => {
    render(
      <SkillsViewer 
        language="en" 
        theme="light"
        testSkillCategories={mockEnglishSkills}
        testIsLoading={false}
        testError={null}
      />
    );
    
    // Проверяем наличие категорий
    expect(document.body.textContent).toContain('Programming Languages');
    expect(document.body.textContent).toContain('Frameworks & Libraries');
    expect(document.body.textContent).toContain('Tools');
    expect(document.body.textContent).toContain('Testing');
    
    // Проверяем наличие навыков
    expect(document.body.textContent).toContain('JavaScript');
    expect(document.body.textContent).toContain('TypeScript');
    expect(document.body.textContent).toContain('React');
  });

  test('renders Russian skills correctly', () => {
    render(
      <SkillsViewer 
        language="ru" 
        theme="light"
        testSkillCategories={mockRussianSkills}
        testIsLoading={false}
        testError={null}
      />
    );
    
    // Проверяем наличие категорий
    expect(document.body.textContent).toContain('Языки программирования');
    expect(document.body.textContent).toContain('Фреймворки и библиотеки');
    expect(document.body.textContent).toContain('Инструменты');
    expect(document.body.textContent).toContain('Тестирование');
    
    // Проверяем наличие навыков
    expect(document.body.textContent).toContain('JavaScript');
    expect(document.body.textContent).toContain('TypeScript');
    expect(document.body.textContent).toContain('React');
  });

  test('shows loading state', () => {
    render(
      <SkillsViewer 
        language="loading-skills" 
        theme="light"
        testIsLoading={true}
        testError={null}
      />
    );
    
    expect(document.querySelector('[data-testid="skills-loading"]')).not.toBeNull();
  });

  test('handles errors gracefully', () => {
    render(
      <SkillsViewer 
        language="error-skills" 
        theme="light"
        testIsLoading={false}
        testError="Failed to load skills content"
      />
    );
    
    expect(document.body.textContent).toContain('Failed to load skills content');
  });
  
  test('renders with dark theme correctly', () => {
    render(
      <SkillsViewer 
        language="en" 
        theme="dark"
        testSkillCategories={mockEnglishSkills}
        testIsLoading={false}
        testError={null}
      />
    );
    
    // Проверяем, что компонент рендерится с темной темой без ошибок
    expect(document.body.textContent).toContain('Programming Languages');
    expect(document.body.textContent).toContain('Frameworks & Libraries');
  });
});
