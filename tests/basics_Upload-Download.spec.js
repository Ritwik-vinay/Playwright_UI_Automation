const ExcelJs = require('exceljs')
const { test, expect } = require('@playwright/test')
const path = require('path');


async function writeExcelTest(searchText, replaceText, change, filePath) {

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);

    //Move to the sheet in the workbook
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = readExcel(worksheet, searchText)
    const targetColumn = output.column + (change.colChange || 0);
    if (output.row === -1 || output.column === -1) {
    throw new Error(`❌ Value "${searchText}" not found in Excel.`);
  }


    const cell = worksheet.getCell(output.row, output.column + change.colChange);

    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}
// We don't use the async because we have to call the read funntion to the WriteExcelTest
function readExcel(worksheet, searchText) {
    let output = { row: -1, column: -1 }
    worksheet.eachRow((row, rownumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output = { row: rownumber, column: colNumber }
            }

        })
    })
    return output;
}
test('Upload and Download functionality ', async ({ page }) => {
    const textSearch = 'Mango';
    const updatevalue = '350';

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    // const download = page.waitForEvent('download');
    // await page.getByRole('button',{name : 'Download'}).click();
    // const d1= await download;
    // //await page.pause();
    // const filePath = "C:\\Users\\vinay\\Downloads\\download.xlsx";

    // // ✅ Ensure the edit finishes before upload
    // await writeExcelTest(textSearch, updatevalue,{rowChange :0, colChange : 2}, filePath)

    // await page.locator('#fileinput').setInputFiles(filePath);
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const d1 = await download;

    // ✅ Save it to your desired folder
    const filePath = path.join(__dirname, 'download.xlsx');
    await d1.saveAs(filePath);

    console.log('Downloaded file saved to:', filePath);

    // ✅ Modify Excel
    await writeExcelTest(textSearch, updatevalue, { rowChange: 0, colChange: 2 }, filePath);

    // ✅ Upload the modified Excel file
    await page.locator('#fileinput').setInputFiles(filePath);

     const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
     await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updatevalue);



})