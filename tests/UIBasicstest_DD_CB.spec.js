import { test, expect } from '@playwright/test';
test('UI RadioButton test',async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage(); // Correct method
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const radioButton=  page.locator("input[type='radio'][value='user']");
    const pop_up= page.locator("#okayBtn");
    const pop_up_text= page.locator("[class='modal-body'] p");

    await radioButton.click();    
    console.log(await pop_up_text.textContent());
    await pop_up.click();
});

test("UI DropDown" ,async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropdown= page.locator("[data-style=btn-info]");    
    await dropdown.selectOption("Consultant");
    page.pause();
    console.log(await dropdown.textContent());
   
});

test("UI Checkbox", async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const checkbox= page.locator("[type='checkbox']");

    await checkbox.check();
    console.log(await checkbox.isChecked());
    await checkbox.uncheck();

});


