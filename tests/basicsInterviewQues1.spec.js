const { test, expect } = require('@playwright/test')

test('Navigate multiple Pages ,Open the page ', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/dropdownsPractise/", { waitUntil: 'load' })

    const page2 = await context.newPage();
    await page2.goto("https://rahulshettyacademy.com/AutomationPractice/", { waitUntil: 'load' })
 
    const title = await page.title()
    const title2 = await page2.title()

    console.log(title)
    console.log(title2)
    await context.close();



})

