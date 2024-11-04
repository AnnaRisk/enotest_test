import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Указываем папку с тестами
  testDir: './tests',

  // Указываем браузеры, которые Playwright будет использовать для тестов
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' }
    },
 /*   {
      name: 'Firefox',
      use: { browserName: 'firefox' }
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' }
    },*/
  ],

  // Настройка времени выполнения
  timeout: 30000, // Время выполнения теста (в миллисекундах)
  expect: {
    timeout: 5000 // Время ожидания утверждений
  },

  // Настройка отчета
  reporter: [['html', { open: 'never' }]], // Генерация HTML-отчета

  // Используемые фикстуры и параметры браузера
  use: {
    // Настройки для всех тестов
    headless: false, // Запуск браузера в режиме UI (измените на true для headless)
    viewport: { width: 1280, height: 720 }, // Размер окна браузера
    video: 'on', // Запись видео только при ошибках
    screenshot: 'only-on-failure', // Скриншоты при ошибках
    baseURL: 'https://enotes.pointschool.ru/', // Базовый URL
    userAgent: 'PlaywrightTest', // Пользовательский агент

    // Настройки трассировки
    trace: 'on-first-retry', // Включение трассировки на первый повторный запуск

    // Настройки для замедления действий (полезно для отладки)
    actionTimeout: 0, // Таймаут действий (0 = без ограничения)
    launchOptions: {
      slowMo: 50, // Задержка между действиями в миллисекундах
    },
  },

  // Количество попыток перезапуска тестов при падении
  retries: 1,
});
