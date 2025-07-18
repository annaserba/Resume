import { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface MarkdownViewerProps {
  section: string;
  language: string;
  // Тестовые пропсы
  testContent?: string;
  testIsLoading?: boolean;
  testError?: string | null;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ 
  section, 
  language, 
  testContent, 
  testIsLoading, 
  testError 
}) => {
  const { theme } = useTheme();
  const [content, setContent] = useState<string>(testContent || '');
  const [isLoading, setIsLoading] = useState<boolean>(testIsLoading !== undefined ? testIsLoading : true);
  const [error, setError] = useState<string | null>(testError !== undefined ? testError : null);

  useEffect(() => {
    // Если предоставлены тестовые пропсы, не загружаем markdown
    if (testContent !== undefined || testIsLoading !== undefined || testError !== undefined) {
      return;
    }
    
    const fetchMarkdown = async () => {
      setIsLoading(true);
      try {
        const response = await import(`@/content/${language}/${section}.md`);
        const text = await response.html;
        setContent(text);
        setError(null);
      } catch (err) {
        console.error(`Error loading markdown: ${err}`);
        setError(`Failed to load ${section} content`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkdown();
  }, [section, language, testContent, testIsLoading, testError]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-pulse flex space-x-2" data-testid="loading-animation">
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

  return (
    <div 
      className={`markdown-content prose prose-blue max-w-none ${theme === 'dark' ? 'dark:prose-invert dark' : ''}`} 
      dangerouslySetInnerHTML={{ __html: content }} 
      data-testid="markdown-content"
    />
  );
};

export default MarkdownViewer;
