import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3003/NutriCalc/',
    headless: true,
    trace: 'on-first-retry',
  },

  webServer: {
    command: 'npm start',
    url: 'http://localhost:3003/NutriCalc/',
    timeout: 120 * 1000, // Increased timeout for server to start
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
}); 