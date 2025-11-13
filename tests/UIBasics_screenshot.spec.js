const {test} = require('@playwright/test')

test('Screenshot FullPage', async ({browser}) =>{

    const context= await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.locator('#displayed-text').isVisible();
    await page.screenshot({path : 'screenshot.png'})
    await page.locator('#displayed-text').isHidden();
})

test.only('Screenshot of Element', async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.locator('#displayed-text').screenshot({path : 'partialScreenshot.png'});

})