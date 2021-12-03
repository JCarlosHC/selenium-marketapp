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
        await driver.findElement(By.id("login-password")).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE))
        await driver.findElement(By.id("login-password")).sendKeys(password)
        await driver.findElement(By.css(".button")).click()
        await driver.manage().setTimeouts({ implicit: 10000 })
        await driver.wait(until.elementLocated(By.id('main-message')), 30000)
                .then(res => res.getText())
                .then(msg => console.log(`With correct user and correct password (username): ${username}, (password): ${password} ##### ${msg} #####`))
        element = driver.findElement(By.id('main-message'));
        assert.strictEqual(await element.getText(), 'Bienvenido');

        //Deslogueo
        await driver.manage().setTimeouts({ implicit: 10000 })
        await driver.wait(until.elementLocated(By.css('#main-buttons')), 30000)
        await driver.findElement(By.css("#main-buttons > .button:nth-child(2)")).click()
        // await driver.wait(until.urlIs('https://team-market-app.herokuapp.com'),10000)
    } catch (e) {
        console.log(e);
    } finally {
        await driver.quit();
    }
})();