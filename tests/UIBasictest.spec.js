const { request } = require('playwright');
const {test, expect} =require('@playwright/test');

test('First Playwright Test', async ({browser})=>
    {

    //playwright code
    //chrome - plugin/cookies
    const context= await browser.newContext();
    const page = await context.newPage();   
    await page.goto("https://testautomationpractice.blogspot.com/");
    
});
test('Browser context Playwright test', async ({browser})=>
    {

    //playwright code
    //chrome - plugin/cookies
    const context= await browser.newContext();
    const page = await context.newPage();   
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await page.locator("input#username").fill("rahulshettyacademy");
    await page.locator("[name='password']").fill("abc123");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
   // let const
    
});