const { test, expect, request } = require('@playwright/test');
const {ApiUtils} = require('../tests/Utils/ApiUtils');//D:\Playwright_UI_Automation\tests\Utils\ApiUtils.js

const loginPayload = { userEmail: "Testrv@gmail.com", userPassword: "123qwerty" };
//const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "68efcc2ef669d6cb0a15527c" }] };
const orderPayLoad ={ orders: [{country: "Cuba", productOrderedId: "68a961719320a140fe1ca57c"}] };

let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiutils = new ApiUtils(apiContext, loginPayload);
    response = await apiutils.createOrder(orderPayLoad)

})

test.beforeEach(async () => {
    //steps if needed
});

test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});


