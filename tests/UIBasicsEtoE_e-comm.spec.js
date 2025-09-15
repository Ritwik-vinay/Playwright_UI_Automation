const { test, expect } = require('@playwright/test');

test('UI End to End Ecomm test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    //Product mentioned below to select 
    const productName = "ADIDAS ORIGINAL";
    //Locators 
    const email_Id = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login_btn = page.locator("#login");
    const error_msg = page.locator("[role='alert']");
    const products = page.locator(".card-body");
    const cart_btn = page.locator("[routerlink='/dashboard/cart']");

    //Actions Performed on Locators
    await email_Id.fill("Testrv@gmail.com")
    await password.fill("123qwerty");
    await login_btn.click();
    //console.log( await expect(error_msg).toHaveText("Incorrect email or password."));
    await page.waitForLoadState('networkidle');
    //get the titles
     await page.waitForSelector(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    // get the product count 
    const prodCount = await products.count();
    for (let i = 0; i < prodCount; ++i) {
        const productTitle = await products.nth(i).locator("b").textContent();
        //If condition to go to the nth of the card-body and select the product name 
        if (productTitle.trim() === productName) {
            console.log("Adding to cart:", productTitle);
            //After selecting the card- name going to 
            // the nth of the
            //  card-body and selecting the product to add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }

    }
    await cart_btn.click();





});


