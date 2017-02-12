const webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

const expect = require('chai').expect;

test.describe('Login litecart', function() {
    let driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.manage().timeouts().implicitlyWait(2000);
        driver.getCapabilities().then(function(caps) {
        });
    });

    test.it('should click all menu and submenu', function(done) {
        driver.get('http://localhost/litecart');
        driver.findElement(By.id('logotype-wrapper'));

        driver.findElements(By.css('.listing-wrapper.products li')).then(products => {
            expect(products.length).to.greaterThan(2);  // продуктов несколько
            products.forEach(function(product) {
                product.findElements(By.css('.sticker')).then(stickers => {
                    expect(stickers.length).to.equal(1);
                });
            });
        }).then(() => done());
    });

    after(function(done) {
        driver.quit().then(() => done())
    });

});