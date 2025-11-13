const {test, expect} =require('@playwright/test')



test('Comparison of the Screenshot',  async ({browser})=>{

    const context= await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    expect(await page.screenshot()).toMatchSnapshot('landingpage.png');
    

})