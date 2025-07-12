import { render, screen } from '@testing-library/react';
import MarkdownViewer from '../MarkdownViewer';

describe('MarkdownViewer Component', () => {
  test('renders content correctly', () => {
    render(
      <MarkdownViewer 
        section="about" 
        language="en" 
        testIsLoading={false}
        testContent="<p>Mock Markdown Content</p>"
        testError={null}
      />
    );
    
    const content = screen.getByTestId('markdown-content');
    expect(content).toBeInTheDocument();
    expect(content.innerHTML).toContain('Mock Markdown Content');
  });

  test('renders with different language', () => {
    render(
      <MarkdownViewer 
        section="about" 
        language="ru" 
        testIsLoading={false}
        testContent="<p>Mock Markdown Content на русском</p>"
        testError={null}
      />
    );
    
    const content = screen.getByTestId('markdown-content');
    expect(content).toBeInTheDocument();
    expect(content.innerHTML).toContain('Mock Markdown Content на русском');
  });

  test('shows loading state', () => {
    // Используем тестовый пропс для имитации загрузки
    render(
      <MarkdownViewer 
        section="loading" 
        language="en" 
        testIsLoading={true} 
        testContent="" 
        testError={null} 
      />
    );
    
    // Проверяем, что отображается индикатор загрузки
    expect(screen.getByTestId('loading-animation')).toBeInTheDocument();
  });

  test('handles errors gracefully', () => {
    // Используем тестовый пропс для имитации ошибки
    render(
      <MarkdownViewer 
        section="error" 
        language="en" 
        testIsLoading={false} 
        testContent="" 
        testError="Failed to load content" 
      />
    );
    
    // Проверяем, что отображается сообщение об ошибке
    expect(screen.getByText(/Failed to load content/i)).toBeInTheDocument();
  });
});
