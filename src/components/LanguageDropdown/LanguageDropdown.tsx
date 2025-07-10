import React from 'react';

interface LanguageDropdownProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  return (
    <div className="relative inline-block">
      <select 
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="appearance-none bg-white border border-blue-300 rounded-md py-2 px-4 pr-8 shadow-sm
                  hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition-colors duration-200 text-gray-700 font-medium"
        aria-label="Select language"
      >
        <option value="ru">Русский</option>
        <option value="en">English</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
};

export default LanguageDropdown;
