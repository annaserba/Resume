import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface SkillWithLevel {
  name: string;
  level: number; // От 1 до 5
}

interface SkillsProps {
  skills: {
    category: string;
    items: SkillWithLevel[];
  }[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const { theme } = useTheme();
  // Функция для отображения уровня навыка в виде точек
  const renderSkillLevel = (level: number) => {
    const dots = [];
    for (let i = 1; i <= 5; i++) {
      dots.push(
        <div 
          key={i} 
          className={`w-2 h-2 rounded-full ${i <= level ? 
            (theme === 'dark' ? 'bg-blue-400' : 'bg-blue-600') : 
            (theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300')}`}
        />
      );
    }
    return (
      <div className="flex gap-1 ml-2">
        {dots}
      </div>
    );
  };

  return (
    <div className="skills-container">
      {skills.map((category, index) => (
        <div key={index} className="mb-4">
          <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'} mb-2`}>{category.category}</h2>
          <ul className="list-none pl-0">
            {category.items.map((skill, skillIndex) => (
              <li key={skillIndex} className="mb-2">
                <div className="flex items-center">
                  <span className={`font-medium ${theme === 'dark' ? 'text-gray-100' : ''}`}>{skill.name}</span>
                  {renderSkillLevel(skill.level)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Skills;
