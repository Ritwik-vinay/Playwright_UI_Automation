const {request}= require('playwright');
const{test,expect} =require('@playwright/test');

test('Test the tables ',async({browser})=>//fat Operator
{
    const context= await browser.newContext();
    const page= await context.newPage();
    page.goto("https://rahulshettyacademy.com/AutomationPractice");
    await page.fill('#name',"Ritwik Vinay");

})

test('Testing the Frames Locator', async ({browser})=>{

    const context= await browser.newContext();
    const page= await context.newPage();
    page.goto("https://rahulshettyacademy.com/AutomationPractice");
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href='lifetime-access']:visible").click();
    const textCapture= await framePage.locator(".text h2").textContent();
    const text =  textCapture.split(" ")[1];
    console.log(text);
})