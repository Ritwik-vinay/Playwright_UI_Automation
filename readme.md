# 🎭 Playwright Basics – Learning Repository

A beginner-friendly repository for learning **Playwright** from scratch.  
This repo covers browser automation, selectors, assertions, running tests across browsers, and gradually moving toward a professional test framework setup.

---

## 📌 Prerequisites
Make sure you have the following before getting started:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- A code editor (VS Code recommended)
- Basic JavaScript/TypeScript knowledge (helpful but optional)

---

## ⚙️ Installation & Setup

1. **Clone this repository**:
   ```bash
   git clone https://github.com/your-username/playwright-basics.git
   cd playwright-basics

npm init -y
npm install -D @playwright/test

npx playwright install

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
npx playwright test
playwright-basics/
│
├── tests/                  # All test files
│   └── example.spec.ts
│
├── playwright.config.ts    # Playwright configuration file
├── package.json
└── README.md
🧠 Learning Roadmap (Progress Tracker)

✅ Step 1: Install Playwright & run your first test
✅ Step 2: Learn and practice page.locator() and CSS/XPath selectors
✅ Step 3: Work with assertions (expect())
✅ Step 4: Run tests in multiple browsers (Chromium, Firefox, WebKit)
⬜ Step 5: Learn test hooks (beforeEach, afterEach)
⬜ Step 6: Use fixtures for test data setup
⬜ Step 7: Configure parallel execution & retries
⬜ Step 8: Integrate with CI/CD (GitHub Actions, Jenkins)
🛠 Useful Commands Cheat Sheet
Command	Description
npx playwright test	Run all tests
npx playwright test --headed	Run tests with browser UI
npx playwright test --debug	Run in debug mode (step-by-step)
npx playwright codegen <url>	Open Codegen to generate selectors
npx playwright show-report	Open last HTML report

This `.md` file includes:
- Installation + setup
- First test example
- Commands cheat sheet
- Folder structure
- Learning roadmap (so you can track your progress)
- References for further learning  
