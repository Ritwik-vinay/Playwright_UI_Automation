const { request } = require('playwright');
const { test, expect } = require('@playwright/test');

test('UI All Locator End to End Practice', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.goto("https://google.com")
    await page.goBack();
    await page.getByText("Check me out if you Love IceCreams!").click();
    await page.getByText("Gender").selectOption("Female");
    await page.getByLabel("Employed").check();
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByRole("link", { name: 'Shop' }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();
    const allButtons = await page.locator("a, button").allTextContents();
    console.log(allButtons);
    await page.getByText(/Checkout/).click()
    // await page.getByRole('link', { name: /Checkout/ }).click();







});