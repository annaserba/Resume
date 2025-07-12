import { render } from '@testing-library/react';
import Skills from '../Skills';

describe('Skills Component', () => {
  const mockSkills = [
    {
      category: 'Programming Languages',
      items: [
        { name: 'JavaScript', level: 5 },
        { name: 'TypeScript', level: 4 }
      ]
    },
    {
      category: 'Frameworks',
      items: [
        { name: 'React', level: 5 },
        { name: 'Next.js', level: 4 }
      ]
    }
  ];

  test('renders skills categories correctly', () => {
    render(<Skills skills={mockSkills} theme="light" />);
    
    expect(document.body.textContent).toContain('Programming Languages');
    expect(document.body.textContent).toContain('Frameworks');
  });

  test('renders skill items with correct names', () => {
    render(<Skills skills={mockSkills} theme="light" />);
    
    expect(document.body.textContent).toContain('JavaScript');
    expect(document.body.textContent).toContain('TypeScript');
    expect(document.body.textContent).toContain('React');
    expect(document.body.textContent).toContain('Next.js');
  });

  test('renders correct number of skill level dots', () => {
    render(<Skills skills={mockSkills} theme="light" />);
    
    // Проверяем наличие точек для навыков
    // Это упрощенная проверка, в реальности вам может потребоваться более сложная логика
    // для проверки конкретных точек для конкретных навыков
    expect(document.querySelectorAll('.bg-blue-600').length).toBeGreaterThan(0);
    expect(document.querySelectorAll('.bg-gray-300').length).toBeGreaterThan(0);
  });
  
  test('renders with dark theme correctly', () => {
    render(<Skills skills={mockSkills} theme="dark" />);
    
    // Проверяем, что компонент рендерится с темной темой без ошибок
    expect(document.body.textContent).toContain('Programming Languages');
    expect(document.body.textContent).toContain('Frameworks');
  });
});
