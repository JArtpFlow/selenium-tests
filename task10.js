// Задание 10. Проверить, что открывается правильная страница товара

const webdriver = require('selenium-webdriver'),
    //ie = require('selenium-webdriver/ie'),
    chrome = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

const expect = require('chai').expect;

//var options = new ie.Options();
//options.requireWindowFocus(true)

test.describe('Check product on main page and product page', function() {
    let driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            //.setIeOptions(options)
            .build();
        driver.manage().timeouts().implicitlyWait(2000);
        driver.getCapabilities().then(function(caps) {
        });
    });

    test.it('Product attributes equal on main and product page', function() {
        driver.get('http://localhost/litecart');
        driver.findElement(By.id('logotype-wrapper'));

        let prodMain = driver.findElement(By.css('#box-campaigns li a'));
        let regPrice = prodMain.findElement(By.css('.regular-price'));
        let campPrice = prodMain.findElement(By.css('.campaign-price'));
        let mainName = prodMain.findElement(By.css('.name'));
        regPrice.then(price => {price.getText().then(mainRegPrice => {
        campPrice.then(price => {price.getText().then(mainCampPrice => {
        mainName.then(name => {name.getText().then(mainName => {
        regPrice.getCssValue('font-size').then(regPriceFont => {
        campPrice.getCssValue('font-size').then(campPriceFront => {
        campPrice.getAttribute('tagName').then(campPriceTag => {
        regPrice.getAttribute('tagName').then(regPriceTag => {

        expect(parseInt(regPriceFont)).to.lessThan(parseInt(campPriceFront));
        expect(campPriceTag).to.equal('STRONG');
        expect(regPriceTag).to.equal('S');

        prodMain.click();  // Переход на страницу товара

        let prodPage = driver.findElement(By.css('#box-product'));
        let regPrice = prodPage.findElement(By.css('.regular-price'));
        let campPrice = prodPage.findElement(By.css('.campaign-price'));
        let prodName = prodPage.findElement(By.css('.title'));
        prodName.then(name => {name.getText().then(prodName => {
        regPrice.then(name => {name.getText().then(prodRegPrice => {
        campPrice.then(name => {name.getText().then(prodCampPrice => {
        regPrice.getCssValue('font-size').then(regPriceFont => {
        campPrice.getCssValue('font-size').then(campPriceFront => {
        campPrice.getAttribute('tagName').then(campPriceTag => {
        regPrice.getAttribute('tagName').then(regPriceTag => {

        expect(parseInt(regPriceFont)).to.lessThan(parseInt(campPriceFront));
        expect(campPriceTag).to.equal('STRONG');
        expect(regPriceTag).to.equal('S');
        expect(mainRegPrice).to.equal(prodRegPrice);
        expect(mainCampPrice).to.equal(prodCampPrice);
        expect(mainName).to.equal(prodName);

        }); }); }); }); }); }); }); }); }); }); }); });  }); });  }); }); }); }); }); });

    });

    after(function(done) {
        driver.quit().then(() => done())
    });

});