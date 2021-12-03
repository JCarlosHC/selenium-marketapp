const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
let username = "", password = "";

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    let element;
    try {
        await driver.get("https://team-market-app.herokuapp.com/")
        await driver.manage().window().setRect({ width: 1296, height: 705 })

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
        await driver.findElement(By.id("login-password")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
        await driver.findElement(By.id("login-password")).sendKeys(password)
        await driver.findElement(By.css(".button")).click()
        await driver.manage().setTimeouts({ implicit: 10000 })
        await driver.wait(until.elementLocated(By.id('main-message')), 30000)
            .then(res => res.getText())
            .then(msg => console.log(`With correct user and correct password (username): ${username}, (password): ${password} ##### ${msg} #####`))
        element = driver.findElement(By.id('main-message'));
        assert.strictEqual(await element.getText(), 'Bienvenido');

        //update - Wrong data
        let barcode = '0101010101031X'
        let name = ""
        let quantity = "100000"

        await driver.wait(until.elementTextIs(driver.wait(until.elementLocated(By.id('main-message')),30000),''), 30000)
        await driver.wait(until.elementLocated(By.css('#main-buttons')), 30000)
        await driver.wait(until.elementLocated(By.css("div#products-table table tbody tr:nth-last-child(-n+1) td:nth-child(1)")), 30000);
        await driver.findElement(By.css("div#products-table table tbody tr:nth-last-child(-n+1) img:nth-child(3)")).click()
        await driver.findElement(By.id("updateProduct-barcode")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
        await driver.findElement(By.id("updateProduct-barcode")).sendKeys(barcode)
        await driver.findElement(By.id("updateProduct-name")).sendKeys(Key.chord(Key.CONTROL, "a", Key.DELETE))
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

        //Deslogueo
        await driver.manage().setTimeouts({ implicit: 10000 })
        await driver.wait(until.elementLocated(By.css('#main-buttons')), 30000)
        await driver.findElement(By.css("#main-buttons > .button:nth-child(2)")).click()
    } catch (e) {
        console.log(e);
    } finally {
        await driver.quit();
    }
})();