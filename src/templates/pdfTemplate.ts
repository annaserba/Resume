interface Props {
    html: string;
    language: string;
}

export function getPdfTemplate({html, language}: Props): string {
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
          font-size: 14px; /* Уменьшенный размер шрифта */
          line-height: 1.5;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        /* Заголовки в стиле Tailwind */
        h1 {
          color: #000000; /* Черный цвет */
          font-size: 1.4rem; /* Уменьшенный размер */
          font-weight: 700; /* font-bold */
          margin-bottom: 0.5rem;
        }
        
        h2 {
          color: #000000; /* Черный цвет */
          font-size: 1rem; /* Уменьшенный размер */
          font-weight: 600; /* font-semibold */
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          border-bottom: 1px solid #d1d5db; /* border-gray-300 */
          padding-bottom: 0.25rem;
        }
        
        h3 {
          color: #000000; /* Черный цвет */
          font-size: 1rem; /* Уменьшенный размер */
          font-weight: 500; /* font-medium */
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }
        
        /* Текстовые элементы */
        p {
          margin: 0.5rem 0; /* my-2 */
          font-size: 0.9rem; /* Уменьшенный размер */
        }
        
        /* Списки */
        ul {
          list-style-type: disc;
          padding-left: 1.25rem; /* pl-5 */
          margin: 0.5rem 0; /* my-2 */
        }
        
        li {
          margin-bottom: 0.25rem; /* mb-1 */
          font-size: 0.9rem; /* Уменьшенный размер */
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
    
      </style>
    </head>
    <body>
      ${html}
    </body>
    </html>
  `;
}
