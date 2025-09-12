// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({})
export default defineConfig({
  testDir: './tests',
  timeout: 50 * 1000, // Global test timeout
  reporter: 'html',
  use: {
    browserName: "chromium", // Playwright uses 'chromium' for Chrome
    channel: "chrome",       // This runs tests in the actual Chrome browser
    headless: false,         // The browser will open in headed mode (UI visible)
    expect: {
      timeout: 30 * 1000 // Assertion timeout
    }
  },
});


