const { request } = require('playwright')
const { test, expect } = require('@playwright/test');

test('UI element testing Hidden Element', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const showElement = page.locator("[value='Show']");
    const enterValue = page.getByPlaceholder("Hide/Show Example");
    const hideElement = page.locator("[value='Hide']");

    await showElement.click();
    await enterValue.isVisible();
    await enterValue.fill("Ritwik");
    await hideElement.click();
    await enterValue.isHidden();
})

test('Handle Alert element', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const enterName = page.getByPlaceholder("Enter Your Name");
    const confirmBtn = page.locator("[value='Confirm']");

    await enterName.fill("Ritwik");
    await confirmBtn.click();


    await page.on("dialog", dialog => dialog.accept());

})

test('Hover action to be performed', async({browser})=>
{
    const context= await browser.newContext();
    const page = await context.newPage();
    page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const hoverbtn= page.locator("[id='mousehover']");
    const reloadbtn= page.getByText("Reload");
    await hoverbtn.hover();
    await reloadbtn.isVisible();
    await reloadbtn.click();

})

