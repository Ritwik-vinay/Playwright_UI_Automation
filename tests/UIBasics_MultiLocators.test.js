const{request} =require('playwright'); 
const {test, expect} =require('@playwright/test');

test('UI All Locator End to End Practice', async ({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();
    page.goto("https://rahulshettyacademy.com/angularpractice/");




});