const {test} = require('@playwright/test')

test('Automate login on a dummy website', async ({browser})=>{
    const context= await browser.newContext();
    const page = await context.newPage();

    page.goto('https://demoqa.com/login')
    await page.getByPlaceholder('UserName').fill('Ritwik')
    await page.getByPlaceholder('Password').fill('@Test123')
    await page.locator('button[id= "login"]').click()
    const userName = await page.locator("label[id= 'userName-value']").textContent()
    console.log(userName)
})


test('Get all the links from the page', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
   const linksFound = await page.$$eval('a', links => links.map(link=>link.href));
   console.log('total links found' +linksFound.length )
   linksFound.forEach((link, index)=>{
    console.log(`${index+1} : ${link}`)

   })
})


test.only('Find the Broken Links', async ({browser , request})=>{
    
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

    const allLinks = await page.$$eval('a', collectLinks=> collectLinks.map(linked=> linked.href))

    console.log('total links found '  + (allLinks.length))
    const brokenLink = []
    for (const link of allLinks){
        try{
            const response = await request.get(link)
            const status= response.status()
            if (status>=400){
                console.log(`Broken :  ${link} Status : ${status}`)
                brokenLink.push({link , status})

            }
            else{
                console.log(`working :  ${link} Status : ${status}`)
            }
        }
        catch(error ){
            console.log(`Error accession : ${link}`)
            brokenLink.push({link, status  : 'Error'})

        }
    }
    console.log(`total linked broken ${brokenLink.length}`)
    brokenLink.forEach((b, i) => console.log(`${i + 1}. ${b.link} (Status: ${b.status})`));

    

})