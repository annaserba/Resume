import { MarkdownViewer } from '../Markdown';
import { SkillsViewer } from '../Skills';
import Contacts from '../Contacts/Contacts';
import { FaDownload } from 'react-icons/fa';
import { LanguageDropdown } from '../Language';
import { ThemeToggle } from '../ThemeToggle';
import { useTheme } from '../providers/ThemeProvider';

interface ResumeProps {
  language: string;
  onLanguageChange?: (newLanguage: string) => void;
  t: Record<string, string>;
}

const Resume = ({ language, onLanguageChange, t }: ResumeProps) => {
  const { theme } = useTheme();
  
  const handleLanguageChange = (newLanguage: string) => {
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    } else {
      localStorage.setItem('language', newLanguage);
      document.documentElement.lang = newLanguage;
    }
  };

  return (
    <div className="min-h-screen from-gray-50 to-gray-200 text-gray-900 dark:bg-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="container mx-auto p-4 md:px-8">
          <div className="flex justify-between items-center">
            <Contacts color={theme === 'dark' ? 'dark' : 'light'} translations={t} />
            <div className="flex items-center gap-4">
              <a 
                href={`/resume_${language}.pdf`} 
                download={`resume_${language}.pdf`}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                title={t.pdfGenerator}
              >
                <FaDownload />
                <span className="hidden sm:inline">{t.pdfGenerator}</span>
              </a>
              <LanguageDropdown 
                currentLanguage={language} 
                onLanguageChange={handleLanguageChange} 
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:px-8 mt-8">
        <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {/* Левая колонка - основной контент (70%) */}
          <div className="md:w-[70%] space-y-8">
            <section id="about">
              <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
                {t.about}
              </h2>
              <MarkdownViewer section="about" language={language} />
            </section>

            <section id="experience">
              <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
                {t.experience}
              </h2>
              <MarkdownViewer section="experience" language={language} />
            </section>
          </div>

          {/* Правая колонка - навыки и дополнительная информация (30%) */}
          <div className="md:w-[30%] space-y-8 md:border-l md:border-gray-300 dark:md:border-gray-600 md:pl-6">
            <section id="skills">
              <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
                {t.skills}
              </h2>
              <SkillsViewer language={language} />
            </section>

            <section id="education">
              <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
                {t.education}
              </h2>
              <MarkdownViewer section="education" language={language} />
            </section>

            <section id="certificates">
              <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
                {t.certificates}
              </h2>
              <MarkdownViewer section="certificates" language={language} />
            </section>
            
            <section id="projects">
              <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
                {t.projects}
              </h2>
              <MarkdownViewer section="projects" language={language} />
            </section>
            
            <section id="languages">
              <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
                {t.languages}
              </h2>
              <MarkdownViewer section="languages" language={language} />
            </section>
          </div>
        </div>
      </main>
      
      <footer className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-800'} text-white py-6 px-4`}>
        <div className="container mx-auto md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Contacts color="dark" translations={t} />
            </div>
            <div className="text-center md:text-right">
              <p>{new Date().getFullYear()} {t.footer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Resume;
