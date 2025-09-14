import { test } from '@playwright/test';

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
        const productCard = page.locator('.card').filter({ has: page.locator('.card-title a', { hasText: 'Nokia Edge' }) });
        await productCard.locator('.card-footer button').click();
    }
}
page.pause();
await page.locator("a.btn-primary").click();
const prod = page.locator(".media-heading a");
console.log(await prod.allTextContents());
await page.waitForTimeout(2000); // Waits for 2 seconds   
await page.locator("[class='btn btn-success']").click();




});