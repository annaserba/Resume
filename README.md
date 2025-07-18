# Проект "Моё Резюме"

Современный проект с веб-страницей резюме и генерацией PDF, созданный с использованием React, TypeScript, Tailwind CSS и Markdown.

## Описание

Этот проект представляет собой одностраничный сайт-резюме с адаптивным дизайном, созданный с использованием современных технологий веб-разработки. Резюме доступно на двух языках (русский и английский) с возможностью переключения между ними. Содержимое резюме хранится в Markdown-файлах для удобного редактирования и поддержки.

Проект также включает функциональность генерации PDF-версии резюме с помощью Puppeteer, которая автоматически обновляется при изменении содержимого. Поддерживается выбор языка через query-параметры URL (?lang=en или ?lang=ru) и переключение между светлой и темной темой с сохранением выбора пользователя.

Страница содержит следующие разделы:
- Заголовок с именем, должностью и переключателем языка
- Информация обо мне
- Образование и сертификаты (в одной строке)
- Навыки и проекты (в компактной сетке)
- Опыт работы
- Футер с контактной информацией и датой генерации

## Использованные технологии

- [React](https://reactjs.org/) - библиотека JavaScript для создания пользовательских интерфейсов
- [TypeScript](https://www.typescriptlang.org/) - типизированный язык программирования, расширяющий JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - утилитарный CSS-фреймворк для быстрого создания дизайна
- [PostCSS](https://postcss.org/) - инструмент для трансформации CSS с помощью JavaScript
- [Vite](https://vitejs.dev/) - быстрый инструмент сборки для современной веб-разработки
- [vite-plugin-markdown](https://github.com/hmsk/vite-plugin-markdown) - плагин для импорта Markdown-файлов как модулей
- [React Icons](https://react-icons.github.io/react-icons/) - библиотека иконок для React
- [Puppeteer](https://pptr.dev/) - библиотека для автоматизации браузера и генерации PDF
- [Jest](https://jestjs.io/) - фреймворк для тестирования JavaScript
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - библиотека для тестирования React компонентов
- [Husky](https://typicode.github.io/husky/) - инструмент для управления Git-хуками
- [ESLint](https://eslint.org/) - инструмент для анализа кода и поиска ошибок
- [lint-staged](https://github.com/okonet/lint-staged) - запуск линтеров только для измененных файлов

## Структура проекта

```
resume/
│── index.html                # Основной HTML файл
│── content/                  # Markdown-файлы с содержимым резюме
│   │── ru/                   # Русская версия
│   │   │── about.md          # Информация обо мне
│   │   │── experience.md     # Опыт работы
│   │   │── education.md      # Образование
│   │   │── skills.md         # Навыки
│   │   │── projects.md       # Проекты
│   │   │── certificates.md   # Сертификаты
│   │   └── contacts.md       # Контактная информация
│   └── en/                   # Английская версия
│       │── about.md          # Информация обо мне
│       │── experience.md     # Опыт работы
│       │── education.md      # Образование
│       │── skills.md         # Навыки
│       │── projects.md       # Проекты
│       │── certificates.md   # Сертификаты
│       └── contacts.md       # Контактная информация
│── src/
│   │── components/           # React компоненты
│   │   │── LanguageDropdown/ # Компонент переключения языка
│   │   │── MarkdownViewer/   # Компонент для отображения Markdown
│   │   │── SkillsViewer/     # Компонент для отображения навыков
│   │   └── Contacts/        # Компонент для отображения контактов
│   │── locales/              # Файлы локализации
│   │   │── ru/               # Русский язык
│   │   │   └── translation.json
│   │   └── en/               # Английский язык
│   │       └── translation.json
│   │── scripts/              # Скрипты
│   │   └── generatePDF.tsx  # Скрипт генерации PDF
│   │── styles.css           # Стили Tailwind CSS
│   │── App.tsx              # Главный компонент приложения
│   │── main.tsx             # Точка входа в приложения
│   └── i18n.ts              # Настройка мультиязычности
│── .husky/                  # Конфигурация Git-хуков
│   └── pre-commit          # Скрипт предкоммитного хука
│── eslint.config.js        # Конфигурация ESLint
│── vite.config.ts           # Конфигурация Vite
│── tailwind.config.js       # Конфигурация Tailwind CSS
│── postcss.config.js        # Конфигурация PostCSS
│── tsconfig.json            # Конфигурация TypeScript
│── .gitignore               # Игнорируемые Git файлы
│── package.json             # Зависимости проекта
└── README.md                # Описание проекта
```

## Установка и запуск

1. Клонировать репозиторий:
   ```bash
   git clone <url-репозитория>
   cd resume
   ```

2. Установить зависимости:
   ```bash
   npm install
   ```
   Эта команда также автоматически настроит Husky для Git-хуков.

3. Генерация PDF-версии резюме:
   ```bash
   npm run generate-pdf
   ```
   Эта команда создаст PDF-файл резюме на текущем выбранном языке.

4. Запустить проект в режиме разработки:
   ```bash
   npm run dev
   ```
   Эта команда сначала генерирует PDF, а затем запускает сервер разработки.

5. Собрать проект для продакшена:
   ```bash
   npm run build
   ```
   Эта команда также включает генерацию PDF перед сборкой.

6. Предпросмотр собранного проекта:
   ```bash
   npm run preview
   ```
   
7. Проверка кода с помощью ESLint:
   ```bash
   npm run lint
   ```
   
8. Автоматическое исправление ошибок линтинга:
   ```bash
   npm run lint:fix
   ```
   
9. Запуск тестов:
   ```bash
   npm test
   ```
   
10. Запуск тестов в режиме наблюдения:
   ```bash
   npm run test:watch
   ```
   
11. Запуск тестов с отчетом о покрытии:
   ```bash
   npm run test:coverage
   ```

## Редактирование резюме

Для обновления содержимого резюме достаточно отредактировать соответствующие Markdown-файлы в директориях `content/ru/` и `content/en/`. Изменения будут автоматически отображены на странице после перезагрузки.

## Стилизация

Проект использует Tailwind CSS для стилизации компонентов. Основные стили определены в файле `src/styles.css` и применяются непосредственно к компонентам через утилитарные классы Tailwind.

Для стилизации Markdown-контента используется плагин `@tailwindcss/typography`, который обеспечивает красивое отображение типографики в Markdown.

### Темная тема

Проект поддерживает темную тему с использованием механизма `darkMode: 'class'` в Tailwind CSS. Темная тема активируется добавлением класса `dark` к элементу `html`. При первом посещении сайта тема выбирается автоматически на основе системных настроек пользователя (prefers-color-scheme). Выбор пользователя сохраняется в localStorage и используется при последующих посещениях.

## Тестирование

Проект использует Jest и React Testing Library для модульного и интеграционного тестирования компонентов и функциональности.

### Структура тестов

Тесты располагаются в директориях `__tests__` рядом с тестируемыми компонентами. Например:

```
src/
└── components/
    └── MarkdownViewer/
        ├── MarkdownViewer.tsx
        └── __tests__/
            └── MarkdownViewer.test.tsx
```

### Запуск тестов

Для запуска всех тестов используйте команду:

```bash
npm test
```

Для запуска тестов в режиме наблюдения (тесты будут перезапускаться при изменении файлов):

```bash
npm run test:watch
```

Для генерации отчета о покрытии кода тестами:

```bash
npm run test:coverage
```

### Моки и тестовые пропсы

Для тестирования компонентов, которые используют Markdown-файлы, используются моки в директории `src/__mocks__/`. Все моки написаны на TypeScript.

Компоненты также поддерживают специальные тестовые пропсы для изолированного тестирования:

- `MarkdownViewer` принимает `testContent`, `testIsLoading` и `testError` для контроля состояния в тестах
- `SkillsViewer` принимает `testSkillCategories`, `testIsLoading` и `testError` для контроля состояния в тестах

Эти тестовые пропсы позволяют избежать реальной загрузки markdown-файлов в тестах, что делает тесты более быстрыми, надежными и изолированными.
```

## Как использовать

1. Установите зависимости проекта:
   ```
   npm install
   ```

2. Запустите проект в режиме разработки:
   ```
   npm run dev
   ```

3. Для сборки проекта:
   ```
   npm run build
   ```

4. Для предварительного просмотра собранного проекта:
   ```
   npm run preview
   ```

### Выбор языка

Для выбора языка используйте query-параметр `lang` в URL:

- Английский: `http://localhost:3000/?lang=en`
- Русский: `http://localhost:3000/?lang=ru`

Если параметр не указан, язык будет выбран на основе сохраненных настроек в localStorage или языка браузера.

### Переключение темы

Для переключения между светлой и темной темой используйте кнопку с иконкой солнца/луны в верхней части страницы. Выбранная тема сохраняется в localStorage и будет использоваться при следующих посещениях.

## Персонализация

Для персонализации резюме под свои нужды:
1. Замените текст в файле `index.html` на свою информацию.
2. При необходимости добавьте свою фотографию.
3. Измените цветовую схему в файле `tailwind.config.js`, отредактировав значения цветов в разделе `theme.extend.colors`.
4. Добавьте дополнительные стили в файл `src/style.css` с использованием директив TailwindCSS.

## Лицензия

Свободно для личного использования.
