// Импорт React не требуется в современных версиях React
import { render, screen } from '@testing-library/react';
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
        testSkillCategories={mockEnglishSkills}
        testIsLoading={false}
        testError={null}
      />
    );
    
    // Проверяем наличие категорий
    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('Frameworks & Libraries')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
    
    // Проверяем наличие навыков
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  test('renders Russian skills correctly', () => {
    render(
      <SkillsViewer 
        language="ru" 
        testSkillCategories={mockRussianSkills}
        testIsLoading={false}
        testError={null}
      />
    );
    
    // Проверяем наличие категорий
    expect(screen.getByText('Языки программирования')).toBeInTheDocument();
    expect(screen.getByText('Фреймворки и библиотеки')).toBeInTheDocument();
    expect(screen.getByText('Инструменты')).toBeInTheDocument();
    expect(screen.getByText('Тестирование')).toBeInTheDocument();
    
    // Проверяем наличие навыков
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    render(
      <SkillsViewer 
        language="loading-skills" 
        testIsLoading={true}
        testError={null}
      />
    );
    
    expect(screen.getByTestId('skills-loading')).toBeInTheDocument();
  });

  test('handles errors gracefully', () => {
    render(
      <SkillsViewer 
        language="error-skills" 
        testIsLoading={false}
        testError="Failed to load skills content"
      />
    );
    
    expect(screen.getByText(/Failed to load skills content/i)).toBeInTheDocument();
  });
});
