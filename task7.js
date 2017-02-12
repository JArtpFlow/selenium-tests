const webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Login litecart', function() {
    let driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.manage().timeouts().implicitlyWait(2000);
        driver.getCapabilities().then(function(caps) {
            //console.log("Caps: ", caps);
        });
    });

    test.it('should click all menu and submenu', function(done) {
        driver.get('http://localhost/litecart/admin/');
        driver.findElement(By.name('username')).sendKeys('admin');
        driver.findElement(By.name('password')).sendKeys('admin');
        driver.findElement(By.name('login')).click();
        driver.findElement(By.id('platform'));

        driver.findElements(By.css('#box-apps-menu > li')).then(menuItems => {
            for (let i=1; i < menuItems.length+1; i++) {
                driver.findElement(By.css('#box-apps-menu > li:nth-child('+i+') a' )).click();
                driver.findElements(By.css('#box-apps-menu > li:nth-child('+i+') li')).then(subMenuItems => {
                    for (let j = 1; j < subMenuItems.length + 1; j++) {
                        driver.findElement(By.css('#box-apps-menu > li:nth-child('+i+') li:nth-child('+j+') a')).click();
                        driver.findElement(By.css('h1'));
                    }
                });
            }
        }).then(() => done());
    });

    after(function(done) {
        driver.quit().then(() => done())
    });

});