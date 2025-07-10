interface Props {
    header: string;
    oneColumnContent: string;
    twoColumnContent: string;
    footer: string;
    language: string;
}

export function getPdfTemplate({header, oneColumnContent, twoColumnContent, footer, language}: Props): string {
  return `
    <!DOCTYPE html>
    <html lang="${language}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
        
        /* Базовые стили */
        body {
          font-family: 'Arial', sans-serif;
          font-size: 11px; /* Еще больше уменьшенный размер шрифта */
          line-height: 1.4;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        /* Заголовки в стиле Tailwind */
        h1 {
          color: #000000; /* Черный цвет */
          font-size: 1.1rem; /* Еще больше уменьшенный размер */
          font-weight: 700; /* font-bold */
          margin-bottom: 0.4rem;
        }
        
        h2 {
          color: #000000; /* Черный цвет */
          font-size: 0.85rem; /* Еще больше уменьшенный размер */
          font-weight: 600; /* font-semibold */
          margin-top: 0.8rem;
          margin-bottom: 0.4rem;
          border-bottom: 1px solid #d1d5db; /* border-gray-300 */
          padding-bottom: 0.2rem;
        }
        
        h3 {
          color: #000000; /* Черный цвет */
          font-size: 0.8rem; /* Еще больше уменьшенный размер */
          font-weight: 500; /* font-medium */
          margin-top: 0.6rem;
          margin-bottom: 0.4rem;
        }
        
        /* Текстовые элементы */
        p {
          margin: 0.4rem 0; /* Уменьшенные отступы */
          font-size: 0.75rem; /* Еще больше уменьшенный размер */
        }
        
        /* Списки */
        ul {
          list-style-type: disc;
          padding-left: 1rem; /* Уменьшенный отступ */
          margin: 0.4rem 0; /* Уменьшенные отступы */
        }
        
        li {
          margin-bottom: 0.2rem; /* Уменьшенный отступ */
          font-size: 0.75rem; /* Еще больше уменьшенный размер */
        }
        
        /* Ссылки */
        a {
          color: #2563eb; /* text-blue-600 */
          text-decoration: underline;
        }
        
        a:hover {
          color: #1d4ed8; /* text-blue-800 */
        }
        
        /* Стили для контактов */
        .flex {
          display: flex;
        }
        
        .items-center {
          align-items: center;
        }
        
        .gap-1 {
          gap: 0.25rem;
        }
        
        .gap-4 {
          gap: 1rem;
        }
        
        .mt-2 {
          margin-top: 0.5rem;
        }
        
        .text-sm {
          font-size: 0.8rem; /* Уменьшенный размер */
        }
        
        .text-gray-600 {
          color: #4b5563;
        }
        
        .transition-colors {
          transition-property: color;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
        
        /* Стили для маркдаун контента */
        .markdown-content h2 {
          color: #000000; /* Черный цвет */
          font-size: 0.8rem; /* Уменьшенный размер */
          font-weight: 600; /* font-semibold */
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          page-break-after: avoid; /* Предотвращает разрыв страницы сразу после заголовка */
        }
        
        .markdown-content h3 {
          color: #000000; /* Черный цвет */
          font-size: 0.7rem; /* Уменьшенный размер */
          font-weight: 500; /* font-medium */
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }
        
        .markdown-content p {
          margin: 0.5rem 0; /* my-2 */
        }
        
        .markdown-content ul {
          list-style-type: disc;
          padding-left: 1.25rem; /* pl-5 */
          margin: 0.5rem 0; /* my-2 */
        }
        
        .markdown-content li {
          margin-bottom: 0.25rem; /* mb-1 */
        }
        
        /* Предотвращение разрыва страницы внутри опыта работы */
        h2 + p, h2 + p + p, h2 + p + ul, h2 + ul {
          page-break-before: avoid; /* Не начинать новую страницу перед этими элементами */
        }
        
        /* Группировка опыта работы */
        h2:contains("Web Developer"), h2:contains("Full-stack developer"), h2:contains("Senior Web Developer") {
          page-break-before: always; /* Начинать с новой страницы */
        }
        
        /* Группировка содержимого после заголовка опыта работы */
        h2:contains("Web Developer") ~ p, h2:contains("Web Developer") ~ ul,
        h2:contains("Full-stack developer") ~ p, h2:contains("Full-stack developer") ~ ul,
        h2:contains("Senior Web Developer") ~ p, h2:contains("Senior Web Developer") ~ ul {
          page-break-inside: avoid; /* Избегать разрыва страницы внутри этих элементов */
        }
        
        /* Стили для двухколоночного макета */
        .two-column-layout {
          display: flex;
          flex-direction: row;
          width: 100%;
        }
        
        .main-column {
          width: 67%;
          padding-right: 20px;
        }
        
        .side-column {
          width: 33%;
          padding-left: 10px;
          border-left: 1px solid #e5e7eb;
          font-size: 0.75rem; /* Такой же размер шрифта, как в левой колонке */
          line-height: 1.3;
        }
        
        /* Стили для Key Skills в правой части */
        h2:contains("Key skills") {
          font-size: 0.8rem;
          margin-top: 0;
          padding-top: 0;
        }
        
        .skills-container {
          margin-top: 0.3rem;
        }
        
        .skills-container h2 {
          font-size: 0.75rem;
          margin-top: 0.8rem; /* Увеличенный отступ между категориями навыков */
          margin-bottom: 0.3rem;
          border-bottom: none;
        }
        
        .skills-container ul {
          margin-top: 0.1rem;
          padding-left: 0.8rem;
        }
        
        .skills-container li {
          font-size: 0.75rem;
          margin-bottom: 0.1rem;
          line-height: 1.2;
        }
        
        /* Стили для заголовков в правой колонке */
        .side-column h2 {
          font-size: 0.8rem;
          margin-top: 1rem; /* Увеличенный отступ между секциями */
          margin-bottom: 0.3rem;
        }
        
        .side-column h3 {
          font-size: 0.75rem;
          margin-top: 0.3rem;
          margin-bottom: 0.2rem;
        }
        
        .side-column p {
          font-size: 0.75rem;
          margin: 0.2rem 0;
        }
        
        .side-column ul {
          padding-left: 0.8rem;
          margin: 0.2rem 0;
        }
        
        .side-column li {
          font-size: 0.75rem;
          margin-bottom: 0.1rem;
        }
    
      </style>
    </head>
    <body>
    ${header}
      <div class="two-column-layout">
        <div class="main-column">
          ${oneColumnContent}
        </div>
        <div class="side-column">
          ${twoColumnContent}
        </div>
      </div>
      ${footer}
    </body>
    </html>
  `;
}
