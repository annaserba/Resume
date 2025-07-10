import { useEffect, useState } from 'react';
import MarkdownViewer from './components/MarkdownViewer/MarkdownViewer';
import SkillsViewer from './components/SkillsViewer/SkillsViewer';
import LanguageDropdown from './components/LanguageDropdown/LanguageDropdown';
import './styles.css';
import { FaDownload } from 'react-icons/fa';
import useTranslation from './hooks/useTraslation';
import Contacts from './components/Contacts/Contacts';


const App = () => {
  const [language, setLanguage] = useState<string>('ru');
  
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    document.documentElement.lang = newLanguage;
  };

 const { t } = useTranslation(language);

  // Initialize language from localStorage or browser language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    } else {
      // Determine browser language
      const browserLang = navigator.language.split('-')[0];
      const newLang = (browserLang === 'ru' || browserLang === 'en') ? browserLang : 'ru';
      setLanguage(newLang);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto p-4 md:px-8">
          <div className="flex justify-between items-center">
            <Contacts language={language} color="white" />
            <div className="flex items-center gap-4">
              <a 
                href={`/resume_${language}.pdf`} 
                download
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
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4 md:px-8">
        {/* About section - full width */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b border-blue-300 pb-2">
            {t.about}
          </h2>
          <div className="prose max-w-none">
            <MarkdownViewer section="about" language={language} />
          </div>
        </div>

        {/* Education and Certificates in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Education section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b border-blue-300 pb-2">
              {t.education}
            </h2>
            <div className="prose max-w-none">
              <MarkdownViewer section="education" language={language} />
            </div>
          </div>

          {/* Certificates section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b border-blue-300 pb-2">
              {t.certificates}
            </h2>
            <div className="prose max-w-none">
              <MarkdownViewer section="certificates" language={language} />
            </div>
          </div>
        </div>

        {/* Grid layout for smaller sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Projects section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <section id="projects">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">{t.projects}</h2>
              <div className="prose max-w-none">
                <MarkdownViewer section="projects" language={language} />
              </div>
            </section>
          </div>

          {/* Skills section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <section id="skills">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">{t.skills}</h2>
              <SkillsViewer language={language} />
            </section>
          </div>
        </div>

        {/* Experience section - full width */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-700 border-b border-blue-300 pb-2">
            {t.experience}
          </h2>
          <div className="prose max-w-none">
            <MarkdownViewer section="experience" language={language} />
          </div>
        </div>

      </main>
      
      <footer className="bg-gray-800 text-white py-6 px-4">
        <div className="container mx-auto md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Contacts color="dark" t={t} />
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

export default App;
