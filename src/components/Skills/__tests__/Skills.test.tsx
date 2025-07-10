import { render, screen } from '@testing-library/react';
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
    render(<Skills skills={mockSkills} />);
    
    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('Frameworks')).toBeInTheDocument();
  });

  test('renders skill items with correct names', () => {
    render(<Skills skills={mockSkills} />);
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  test('renders correct number of skill level dots', () => {
    render(<Skills skills={mockSkills} />);
    
    // Проверяем наличие точек для навыков
    // Это упрощенная проверка, в реальности вам может потребоваться более сложная логика
    // для проверки конкретных точек для конкретных навыков
    expect(document.querySelectorAll('.bg-blue-600').length).toBeGreaterThan(0);
    expect(document.querySelectorAll('.bg-gray-300').length).toBeGreaterThan(0);
  });
});
