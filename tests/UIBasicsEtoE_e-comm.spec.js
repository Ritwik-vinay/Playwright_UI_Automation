const { request } = require('playwright');
const { test, expect } = require('@playwright/test');

test('UI End to End Ecomm test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    //Product mentioned below to select 
    const email = "Testrv@gmail.com";
    const productName = "ADIDAS ORIGINAL";
    //Locators 
    const email_Id = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login_btn = page.locator("#login");
    const error_msg = page.locator("[role='alert']");
    const products = page.locator(".card-body");
    const cart_btn = page.locator("[routerlink='/dashboard/cart']");

    //Actions Performed on Locators
    await email_Id.fill(email)
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
    //h3:has-text('ADIDAS ORIGINAL')
    //locator for the Item in the Cart 

    await page.locator("div li").first().waitFor();
    const bool = page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    // CART PAGE validation done in this code let's move to the checkout page
    expect(bool).toBeTruthy();

    //locator for checkout
    await page.locator("text='Checkout'").click();

    //CheckoutPage
    //Validate the EmailId, Enter the Country Name 
    // Enter the coupon and click on Apply and capture the coupon Applied Text

    //Step 1 validated the Email ID 
    await page.waitForLoadState('networkidle');
    await page.locator("div img").waitFor();
    const emailVerification = await (page.locator(".mt-5 label").textContent());
    expect(emailVerification).toEqual(email);

    //Step 2 Enter the country name
    const select_country = page.locator("[placeholder='Select Country']");
    select_country.pressSequentially("ind", { delay: 150 });

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const count_dd = await dropdown.locator("button").count();
    //iterate each and every option and find the option with name india
    for (let i = 0; i < count_dd; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;

        }
    }

    //Enter the coupon and get text
    //Locators on the Place Order Page
    const coupon_code = page.locator("[name ='coupon']");
    const coupon_appliedBtn = page.locator("button:has-text('Apply Coupon')");
    const coupon_appliedMsg = page.locator(".mt-1.ng-star-inserted");
    const placeOrder_btn= page.locator("text='Place Order'");

   // Actions Performed on the Place Order Page
    await coupon_code.fill("rahulshettyacademy");
    await coupon_appliedBtn.click();
    await coupon_appliedMsg.waitFor({ state: "visible" });
    console.log(await coupon_appliedMsg.textContent());
    await placeOrder_btn.click();
    //End of the Place order page

    //Confirmed Order Page 
    const orderPlacedSuccessfully= page.locator(".hero-primary");
    const order_btn= page.locator("button[routerlink*='dashboard/myorders']");
    const orderId=page.locator(".em-spacer-1 .ng-star-inserted");
    const cnfrmMsg = await orderPlacedSuccessfully.textContent();
    await expect(cnfrmMsg).toContain(" Thankyou for the order. ");
    const orderIdText= await orderId.textContent();
    console.log(orderIdText.trim())
    await order_btn.click();



    //OrderPage 
    await page.locator("tbody").waitFor();
    const orderRows= page.locator("tbody tr");
    for(let i=0; i<await orderRows.count();++i){
       const rowOrderId=  await orderRows.nth(i).locator("th").textContent();      
       if(orderIdText.includes(rowOrderId))
       {
        await orderRows.nth(i).locator("button").first().click();
        break;
       }

    }
    const order_id= await page.locator(".col-text").textContent();
    expect(orderIdText.includes(order_id)).toBeTruthy();



});


