interface SkillWithLevel {
  name: string;
  level: number; // От 1 до 5
}

interface SkillCategory {
  category: string;
  items: SkillWithLevel[];
}

/**
 * Серверный рендерер для компонента Skills
 * Генерирует HTML для отображения навыков с уровнями
 */
export function renderSkills(skills: SkillCategory[]): string {
  // Функция для отображения уровня навыка в виде точек
  const renderSkillLevel = (level: number): string => {
    let dots = '';
    for (let i = 1; i <= 5; i++) {
      const dotClass = i <= level ? 'bg-blue-600' : 'bg-gray-300';
      dots += `<div class="w-2 h-2 rounded-full ${dotClass}" style="width: 8px; height: 8px; border-radius: 50%; background-color: ${i <= level ? '#2563eb' : '#d1d5db'}; display: inline-block; margin-right: 4px;"></div>`;
    }
    return `<div class="flex gap-1 ml-2" style="display: flex; gap: 4px; margin-left: 8px;">${dots}</div>`;
  };

  let html = '<div class="skills-container markdown-content">';
  
  skills.forEach((category) => {
    html += `<div class="mb-4" style="margin-bottom: 1rem;">
      <h2 class="text-xl font-semibold mb-2">${category.category}</h2>
      <ul class="list-none pl-0" style="list-style: none; padding-left: 0;">`;
    
    category.items.forEach((skill) => {
      html += `<li class="mb-2" style="margin-bottom: 0.5rem;">
        <div class="flex items-center" style="display: flex; align-items: center;">
          <span class="font-medium" style="font-weight: 500;">${skill.name}</span>
          ${renderSkillLevel(skill.level)}
        </div>
      </li>`;
    });
    
    html += '</ul></div>';
  });
  
  html += '</div>';
  return html;
}

export default renderSkills;
