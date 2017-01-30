

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Login litecart', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.manage().timeouts().implicitlyWait(10000);
        driver.getCapabilities().then(function(caps) {
            console.log(caps);
        });
    });

    test.it('should admin pannel appears', function() {
        driver.get('http://localhost/litecart/admin/');
        driver.findElement(By.name('username')).sendKeys('admin');
        driver.findElement(By.name('password')).sendKeys('admin');
        driver.findElement(By.name('login')).click();
        driver.findElement(By.id('platform'));
    });

    test.after(function() {
        driver.quit();
    })
});