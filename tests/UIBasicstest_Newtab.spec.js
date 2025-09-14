import { test, expect } from '@playwright/test';

test("UI new Tab actions", async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinking_link = page.locator("[href*='documents-request']");
   

    const[newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinking_link.click()
    ]);
    var text= await newPage.locator(".red").textContent();
    const username =  page.locator("#username");
    const password=  page.locator("#password");
    const signinbtn=  page.locator("#signInBtn");
    text= text.split("@")[1];
    text= text.split(" ")[0];
    text= text.split(".")[0]
    console.log("----Under page " + text);
    await username.fill(text);
    console.log("----Under page " + (await username.inputValue()));
    await password.fill("learning");
    await signinbtn.click();




    






});
