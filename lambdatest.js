const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const USERNAME = '{username}';
const KEY = '{accessKey}';
const GRID_HOST = 'hub.lambdatest.com/wd/hub';
const capabilities = {
    platform: 'Windows 8',
    browserName: 'Firefox',
    version: '94.0',
    resolution: '2048x1536',
    network: true,
    visual: true,
    console: true,
    video: true,
    name: 'Market App - full workflow Firefox', // name of the test
    build: 'NodeJS build' // name of the build
}
const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;
let username = "", password = "";

(async function example() {
    let driver = await new Builder()
        .usingServer(gridUrl)
        .withCapabilities(capabilities)
        .build();

    let element;
    try {
        await driver.get("https://team-market-app.herokuapp.com/")

        //Login
        await driver.wait(until.elementLocated(By.id('login-username')), 30000);
        await driver.findElement(By.id("login-username")).sendKeys(username)
        await driver.findElement(By.id("login-password")).sendKeys(password)
        await driver.findElement(By.css(".button")).click()
        await driver.manage().setTimeouts({ implicit: 10000 })
        await driver.findElement(By.css('div.form-inputs div:nth-child(3) div.error-message'))
            .then(res => res.getText())
            .then(msg => console.log(`Without data (username): ${username}, (password): ${password} ##### ${msg} #####`))

        username = "asdasd"
        password = "asas"
        await driver.wait(until.elementLocated(By.id('login-username')), 30000);
        await driver.findElement(By.id("login-username")).sendKeys(username)
        await driver.findElement(By.id("login-password")).sendKeys(password)
        await driver.findElement(By.css(".button")).click()
        await driver.manage().setTimeouts({ implicit: 10000 })
        await driver.findElement(By.css('div.form-inputs div:nth-child(3) div.error-message'))
            .then(res => res.getText())
            .then(msg => console.log(`With wrong data (username): ${username}, (password): ${password} ##### ${msg} #####`))

        username = "admin"
        password = "1234"
        await driver.wait(until.elementLocated(By.id('login-username')), 30000);
        await driver.findElement(By.id("login-username")).clear()
        await driver.findElement(By.id("login-username")).sendKeys(username)
        await driver.findElement(By.id("login-password")).click()
        await driver.findElement(By.id("login-password")).clear()
        await driver.findElement(By.id("login-password")).sendKeys(password)
        await driver.findElement(By.css(".button")).click()
        await driver.manage().setTimeouts({ implicit: 10000 })
        await driver.findElement(By.css('div.form-inputs div:nth-child(3) div.error-message'))
            .then(res => res.getText())
            .then(msg => console.log(`With correct user and bad password (username): ${username}, (password): ${password} ##### ${msg} #####`))

        username = "admin"
        password = "admin"
        await driver.wait(until.elementLocated(By.id('login-username')), 30000);
        await driver.findElement(By.id("login-username")).clear()
        await driver.findElement(By.id("login-username")).sendKeys(username)
        await driver.findElement(By.id("login-password")).click()
        await driver.findElement(By.id("login-password")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE))
        await driver.findElement(By.id("login-password")).sendKeys(password)
        await driver.findElement(By.css(".button")).click()
        await driver.manage().setTimeouts({ implicit: 10000 })
        await driver.wait(until.elementLocated(By.id('main-message')), 30000)
                .then(res => res.getText())
                .then(msg => console.log(`With correct user and correct password (username): ${username}, (password): ${password} ##### ${msg} #####`))
        // element = driver.findElement(By.id('main-message'));
        // assert.strictEqual(await element.getText(), 'Bienvenido');

         //Register
         await driver.wait(until.elementLocated(By.css('#main-buttons')), 30000);
         await driver.findElement(By.css("#main-buttons > .button:nth-child(1)")).click()
         //Wrong data
         let barcode = '0101010101031X'
         let name = ""
         let quantity = "100000"
         await driver.findElement(By.id("addProduct-barcode")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
         await driver.findElement(By.id("addProduct-barcode")).sendKeys(barcode)
         await driver.findElement(By.id("addProduct-name")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
         await driver.findElement(By.id("addProduct-name")).sendKeys(name)
         await driver.findElement(By.id("addProduct-quantity")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
         await driver.findElement(By.id("addProduct-quantity")).sendKeys(quantity)
         await driver.findElement(By.css("#addProduct .button:nth-child(1)")).click()
         await driver.findElement(By.css('div#addProduct form div.form-inputs div:nth-child(2) div div.error-message'))
             .then(res => res.getText())
             .then(msg => console.log(`Barcode message (${barcode}): ##### ${msg} #####`))
         await driver.findElement(By.css('div#addProduct form div.form-inputs div:nth-child(3) div div.error-message'))
             .then(res => res.getText())
             .then(msg => console.log(`Product Name message (${name}): ##### ${msg} #####`))
         await driver.findElement(By.css('div#addProduct form div.form-inputs div:nth-child(4) div div.error-message'))
             .then(res => res.getText())
             .then(msg => console.log(`Quantity message (${quantity}): ##### ${msg} #####`))
 
         barcode = String(new Date().getTime())
         name = "Test of " + barcode
         quantity = "2"
         await driver.findElement(By.id("addProduct-barcode")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
         await driver.findElement(By.id("addProduct-barcode")).sendKeys(barcode)
         await driver.findElement(By.id("addProduct-name")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
         await driver.findElement(By.id("addProduct-name")).sendKeys(name)
         await driver.findElement(By.id("addProduct-quantity")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
         await driver.findElement(By.id("addProduct-quantity")).sendKeys(quantity)
         await driver.findElement(By.css("#addProduct .button:nth-child(1)")).click()
         await driver.manage().setTimeouts({ implicit: 10000 })
         await driver.wait(until.elementLocated(By.id('main-message')), 30000)
             .then(res => res.getText())
             .then(msg => console.log(`With correct data \n Barcode (${barcode}) \n Product Name message (${name}) \nQuantity message (${quantity}) \n ##### ${msg} #####`))
         await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.id('main-message')), 10000), 'El producto se ha registrado exitosamente.'), 30000)
 
         //update - Wrong data
         barcode = '0101010101031X'
         name = ""
         quantity = "100000"
 
         await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.id('main-message')),30000),''), 30000)
         await driver.wait(until.elementLocated(By.css('#main-buttons')), 30000)
         await driver.wait(until.elementLocated(By.css("div#products-table table tbody tr:nth-last-child(-n+1) td:nth-child(1)")), 30000);
         await driver.findElement(By.css("div#products-table table tbody tr:nth-last-child(-n+1) img:nth-child(3)")).click()
         await driver.findElement(By.id("updateProduct-barcode")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
         await driver.findElement(By.id("updateProduct-barcode")).sendKeys(barcode)
         await driver.findElement(By.id("updateProduct-name")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
         await driver.findElement(By.id("updateProduct-name")).clear()
         await driver.findElement(By.id("updateProduct-name")).sendKeys(name)
         await driver.findElement(By.id("updateProduct-quantity")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
         await driver.findElement(By.id("updateProduct-quantity")).sendKeys(quantity)
         await driver.findElement(By.css("div#updateProduct form div.form-buttons div:nth-child(1)")).click()
         await driver.findElement(By.css('div#updateProduct form div.form-inputs div:nth-child(2) div div.error-message'))
             .then(res => res.getText())
             .then(msg => console.log(`Barcode message (${barcode}): ##### ${msg} #####`))
         await driver.findElement(By.css('div#updateProduct form div.form-inputs div:nth-child(3) div div.error-message'))
             .then(res => res.getText())
             .then(msg => console.log(`Product Name message (${name}): ##### ${msg} #####`))
         await driver.findElement(By.css('div#updateProduct form div.form-inputs div:nth-child(4) div div.error-message'))
             .then(res => res.getText())
             .then(msg => console.log(`Quantity message (${quantity}): ##### ${msg} #####`))
 
         //Correct data
         barcode = String(new Date().getTime())
         name = "Update Test " + barcode
         quantity = "2"
         await driver.findElement(By.id("updateProduct-barcode")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
         await driver.findElement(By.id("updateProduct-barcode")).sendKeys(barcode)
         await driver.findElement(By.id("updateProduct-name")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
         await driver.findElement(By.id("updateProduct-name")).sendKeys(name)
         await driver.findElement(By.id("updateProduct-quantity")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
         await driver.findElement(By.id("updateProduct-quantity")).sendKeys(quantity)
         await driver.findElement(By.css("#updateProduct .button:nth-child(1)")).click()
         await driver.manage().setTimeouts({ implicit: 20000 })
         await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.id('main-message')),30000),'El producto se ha editado exitosamente.'), 30000)
         await driver.wait(until.elementLocated(By.id('main-message')), 30000)
             .then(res => res.getText())
             .then(msg => console.log(`With correct data \n Barcode (${barcode}) \n Product Name message (${name}) \nQuantity message (${quantity}) \n ##### ${msg} #####`))
 
        //set price - Wrong price
        let price = "XXXX"

        await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.id('main-message')), 30000), ''), 30000)
        await driver.wait(until.elementLocated(By.css('#main-buttons')), 30000)
        await driver.wait(until.elementLocated(By.css("div#products-table table tbody tr:nth-last-child(-n+1) td:nth-child(1)")), 30000);
        await driver.findElement(By.css("div#products-table table tbody tr:nth-last-child(-n+1) img:nth-child(2)")).click()
        await driver.findElement(By.id("addPrice-price")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
        await driver.findElement(By.id("addPrice-price")).sendKeys(price)
        await driver.findElement(By.css("div#addPrice form div.form-buttons div:nth-child(1)")).click()
        await driver.findElement(By.css('div#addPrice form div.form-inputs div:nth-child(2) div.error-message'))
            .then(res => res.getText())
            .then(msg => console.log(`Price message (${price}): ##### ${msg} #####`))

        //Correct price
        price = "9.99"
        await driver.findElement(By.id("addPrice-price")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
        await driver.findElement(By.id("addPrice-price")).sendKeys(price)
        await driver.findElement(By.css("div#addPrice form div.form-buttons div:nth-child(1)")).click()
        await driver.manage().setTimeouts({ implicit: 20000 })
        await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.id('main-message')), 30000), 'El precio se ha asignado exitosamente.'), 30000)
        await driver.wait(until.elementLocated(By.id('main-message')), 30000)
            .then(res => res.getText())
            .then(msg => console.log(`With correct price \n price (${price}) \n ##### ${msg} #####`))

        //Enable - Cancel
        await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.id('main-message')), 30000), ''), 30000)
        await driver.wait(until.elementLocated(By.css('#main-buttons')), 30000)
        await driver.wait(until.elementLocated(By.css("div#products-table table tbody tr:nth-last-child(-n+1) td:nth-child(1)")), 30000);
        await driver.findElement(By.css("div#products-table table tbody tr:nth-last-child(-n+1) img:nth-child(1)")).click()
        await driver.findElement(By.css("div#enableProduct form div.form-buttons div:nth-child(2)")).click()

        //enable - ok
        await driver.findElement(By.css("div#products-table table tbody tr:nth-last-child(-n+1) img:nth-child(1)")).click()
        await driver.findElement(By.css("div#enableProduct form div.form-buttons div:nth-child(1)")).click()

        //disable - Cancel
        await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.id('main-message')), 30000), ''), 30000)
        await driver.wait(until.elementLocated(By.css('#main-buttons')), 30000)
        await driver.wait(until.elementLocated(By.css("div#products-table table tbody tr:nth-last-child(-n+1) td:nth-child(1)")), 30000);
        await driver.findElement(By.css("div#products-table table tbody tr:nth-last-child(-n+1) img:nth-child(1)")).click()
        await driver.findElement(By.css("div#disableProduct form div.form-buttons div:nth-child(2)")).click()

        //disable - ok
        await driver.findElement(By.css("div#products-table table tbody tr:nth-last-child(-n+1) img:nth-child(1)")).click()
        await driver.findElement(By.css("div#disableProduct form div.form-buttons div:nth-child(1)")).click()

        //delete - Cancel
        await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.id('main-message')), 30000), ''), 30000)
        await driver.wait(until.elementLocated(By.css('#main-buttons')), 30000)
        await driver.wait(until.elementLocated(By.css("div#products-table table tbody tr:nth-last-child(-n+1) td:nth-child(1)")), 30000);
        await driver.findElement(By.css("div#products-table table tbody tr:nth-last-child(-n+1) img:nth-child(4)")).click()
        await driver.findElement(By.css("div#deleteProduct form div.form-buttons div:nth-child(2)")).click()

        //delete - ok
        await driver.findElement(By.css("div#products-table table tbody tr:nth-last-child(-n+1) img:nth-child(4)")).click()
        await driver.findElement(By.css("div#deleteProduct form div.form-buttons div:nth-child(1)")).click()

        //Deslogueo
        await driver.manage().setTimeouts({ implicit: 10000 })
        await driver.wait(until.elementLocated(By.css('#main-buttons')), 30000)
        await driver.findElement(By.css("#main-buttons > .button:nth-child(2)")).click()

        await driver.executeScript('lambda-status=passed')
        await driver.quit();
    } catch (e) {
        console.log(e);
        await driver.executeScript('lambda-status=failed');
        await driver.quit();
    } finally {
        await driver.quit();
    }
})();