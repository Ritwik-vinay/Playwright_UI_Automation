# Playwright Testing Framework - Beginner's Guide

## What is Playwright?

Playwright is a modern end-to-end testing framework that allows you to automate web browsers (Chromium, Firefox, and Safari) with a single API. It's designed to enable reliable testing across different browsers and platforms.

## Key Features

- **Cross-browser testing**: Supports Chrome, Firefox, Safari, and Edge
- **Fast and reliable**: Automatically waits for elements to be ready
- **Mobile testing**: Test mobile web applications
- **Screenshots and videos**: Capture test execution
- **Network interception**: Mock API responses
- **Parallel execution**: Run tests in parallel for faster execution

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Install Playwright

```bash
# Create a new project directory
mkdir playwright-tests
cd playwright-tests

# Initialize npm project
npm init -y

# Install Playwright
npm install -D @playwright/test

# Install browsers
npx playwright install
```

## Basic Project Structure

```
playwright-tests/
├── tests/
│   ├── example.spec.js
│   └── login.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

## Configuration (playwright.config.js)

```javascript
module.exports = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  use: {
    browserName: 'chromium',
    headless: false, // Set to true for headless mode
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
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
    }
  ]
};
```

## Writing Your First Test

### Basic Test Structure

```javascript
// tests/example.spec.js
const { test, expect } = require('@playwright/test');

test('basic test example', async ({ page }) => {
  // Navigate to a page
  await page.goto('https://example.com');
  
  // Check page title
  await expect(page).toHaveTitle(/Example Domain/);
  
  // Find and click a link
  await page.click('text=More information...');
  
  // Verify navigation
  await expect(page).toHaveURL(/iana.org/);
});
```

### Form Interaction Example

```javascript
// tests/form.spec.js
const { test, expect } = require('@playwright/test');

test('form submission test', async ({ page }) => {
  await page.goto('https://example-form-site.com');
  
  // Fill form fields
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'testpass123');
  await page.selectOption('#country', 'US');
  await page.check('#agree-terms');
  
  // Submit form
  await page.click('#submit-button');
  
  // Verify success message
  await expect(page.locator('.success-message')).toBeVisible();
});
```

## Key Playwright Concepts

### 1. Page Object
The `page` object represents a browser tab and provides methods to interact with the webpage.

### 2. Locators
Locators are used to find elements on the page:

```javascript
// Different ways to locate elements
await page.locator('#id');                    // By ID
await page.locator('.class-name');            // By class
await page.locator('text=Click me');          // By text
await page.locator('[data-testid=submit]');   // By test ID
await page.locator('button >> text=Submit');  // Combined selectors
```

### 3. Auto-waiting
Playwright automatically waits for elements to be ready:

```javascript
// Playwright waits for element to be visible before clicking
await page.click('button');

// Waits for element to appear before asserting
await expect(page.locator('.result')).toBeVisible();
```

### 4. Assertions
Use `expect` for verifications:

```javascript
// Page assertions
await expect(page).toHaveTitle('Expected Title');
await expect(page).toHaveURL(/expected-url/);

// Element assertions
await expect(page.locator('.element')).toBeVisible();
await expect(page.locator('#input')).toHaveValue('expected value');
await expect(page.locator('.count')).toHaveText('5 items');
```

## Common Actions

### Navigation
```javascript
await page.goto('https://example.com');
await page.goBack();
await page.goForward();
await page.reload();
```

### Clicking and Typing
```javascript
await page.click('button');
await page.dblclick('.item');
await page.type('#input', 'Hello World');
await page.fill('#input', 'Hello World'); // Faster than type
```

### Waiting
```javascript
await page.waitForSelector('.dynamic-content');
await page.waitForURL('**/dashboard');
await page.waitForTimeout(1000); // Avoid this - use other waits
```

### Screenshots and Videos
```javascript
// Take screenshot
await page.screenshot({ path: 'screenshot.png' });

// Configure in playwright.config.js for automatic capture
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure'
}
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test tests/login.spec.js

# Run tests in specific browser
npx playwright test --project=firefox

# Run tests in parallel
npx playwright test --workers=4

# Generate HTML report
npx playwright test --reporter=html
```

## Best Practices for Beginners

1. **Use data-testid attributes**: Add `data-testid` to elements for reliable selection
   ```html
   <button data-testid="submit-btn">Submit</button>
   ```
   ```javascript
   await page.click('[data-testid=submit-btn]');
   ```

2. **Organize tests with describe blocks**:
   ```javascript
   const { test, expect } = require('@playwright/test');
   
   test.describe('Login functionality', () => {
     test('successful login', async ({ page }) => {
       // test code
     });
     
     test('invalid credentials', async ({ page }) => {
       // test code
     });
   });
   ```

3. **Use Page Object Model** for larger applications:
   ```javascript
   // pages/LoginPage.js
   class LoginPage {
     constructor(page) {
       this.page = page;
       this.usernameInput = page.locator('#username');
       this.passwordInput = page.locator('#password');
       this.loginButton = page.locator('#login-btn');
     }
     
     async login(username, password) {
       await this.usernameInput.fill(username);
       await this.passwordInput.fill(password);
       await this.loginButton.click();
     }
   }
   ```

4. **Handle test data**:
   ```javascript
   // Use test fixtures or external data files
   const testData = {
     validUser: { username: 'user1', password: 'pass123' },
     invalidUser: { username: 'wrong', password: 'wrong' }
   };
   ```

## Debugging Tests

1. **Use headed mode**: `npx playwright test --headed`
2. **Add debug points**: `await page.pause();`
3. **Use Playwright Inspector**: `npx playwright test --debug`
4. **Console logging**: `console.log(await page.textContent('.element'));`

## Common Patterns

### Before/After Hooks
```javascript
test.beforeEach(async ({ page }) => {
  await page.goto('https://example.com');
});

test.afterEach(async ({ page }) => {
  // Cleanup code
});
```

### Grouping Tests
```javascript
test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    // Setup for this group
  });
  
  test('create user', async ({ page }) => {
    // test implementation
  });
});
```

## Next Steps

1. Explore advanced features like API testing
2. Learn about fixtures and custom test helpers
3. Set up CI/CD integration
4. Practice with real applications
5. Study the official Playwright documentation

## Useful Resources

- [Playwright Official Documentation](https://playwright.dev/)
- [Playwright GitHub Repository](https://github.com/microsoft/playwright)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

## Sample Test Commands

```bash
# Development
npx playwright test --headed --workers=1

# CI/CD
npx playwright test --reporter=junit

# Visual testing
npx playwright test --update-snapshots
```

Happy testing with Playwright! 🎭
