import { FaSun, FaMoon } from 'react-icons/fa';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle = ({ theme, toggleTheme }: ThemeToggleProps) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md transition-colors"
      title={theme === 'light' ? 'Включить темную тему' : 'Включить светлую тему'}
      aria-label={theme === 'light' ? 'Включить темную тему' : 'Включить светлую тему'}
    >
      {theme === 'light' ? (
        <FaMoon className="text-gray-700 hover:text-blue-600" />
      ) : (
        <FaSun className="text-yellow-300 hover:text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
