const { test, expect } = require('@playwright/test');

test.only('Positive Login Test - UI Basics Test 2', async ({ browser}) =>
    {
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await page.locator("#username").fill("rahulshettyacademy");
await page.locator('#password').fill("learning");
await page.locator("#signInBtn").click();
console.log(await page.locator("[class='my-4']").textContent());
console.log(await page.title());
const allProducts = page.locator(".card-title a");
console.log(await allProducts.first().textContent());
console.log(await allProducts.nth(1).textContent());
const allproductstitle=  await allProducts.allTextContents();
console.log(allproductstitle);
for(const producttitle of allproductstitle) {
    console.log(producttitle);
    if(producttitle.includes('Nokia Edge')){
        // Click the "Add to Cart" button for the matching product
        await page.locator(".card-title a", { hasText: 'Nokia Edge' }).locator('xpath=ancestor::div[contains(@class,"card")]').locator(".card-footer button").click();
    }
}
await page.locator("a.btn-primary").click();

        



});