// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

const user = {
  username: 'admin',
  password: 'secret'
}
const newPassword = 'secretsecret'
const expertiseTestValue = 'Test value'

module.exports = {
  '@tags': ['userSetting'],
  before: function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .resizeWindow(1200, 980)
      .url(devServer)
      .waitForElementVisible('#app', 500)
      .assert.elementPresent('.title')
      .assert.elementPresent('.subtitle')
      .assert.elementPresent('input[name=username]')
      .assert.elementPresent('input[name=password]')
      .setValue('input[name=username]', user.username)
      .setValue('input[name=password]', user.password)
      .click('button[name=login]')
  },
  after: function (browser) {
    browser
      .end()
  },
  'test update expertise': function (browser) {
    const successMsg = 'The settings were successfully changed'

    browser
      .useCss()
      .waitForElementVisible('div.navbar-link', 1000)
      .click('div.navbar-link')
      .useXpath()
      .waitForElementVisible("//a[text()='User Settings']", 1000)
      .click("//a[text()='User Settings']")
      .useCss()
      .assert.elementPresent('.label')
      .useXpath()
      .waitForElementVisible("//textarea[@placeholder='Expertise']", 1000)
      .setValue("//textarea[@placeholder='Expertise']", expertiseTestValue)
      .waitForElementVisible("//button[text()='Change Settings']", 1000)
      .click("//button[text()='Change Settings']")
      .waitForElementVisible(`//p[text()='${successMsg}']`, 3000)
      .assert.containsText(`//p[text()='${successMsg}']`, successMsg)
      .useXpath()
      .waitForElementVisible("//a[@class='navbar-item router-link-active']", 1000)
      .click("//a[@class='navbar-item router-link-active']")
  },
  'test change password': function (browser) {
    const successMsg = 'The password was successfully changed'

    browser
      .useCss()
      .waitForElementVisible('div.navbar-link', 1000)
      .click('div.navbar-link')
      .useXpath()
      .waitForElementVisible("//a[text()='User Settings']", 1000)
      .click("//a[text()='User Settings']")
      .useCss()
      .assert.elementPresent('.title', 'Change Password')
      .assert.elementPresent('.subtitle', 'Update your password')
      .assert.elementPresent('.label', 'Old password')
      .assert.elementPresent('.label', 'New password')
      .assert.elementPresent('.label', 'Confirm new password')
      .useXpath()
      .waitForElementVisible("//input[@placeholder='Old password']", 1000)
      .setValue("//input[@placeholder='Old password']", user.password)
      .setValue("//input[@placeholder='New password']", newPassword)
      .setValue("//input[@placeholder='Confirm new password']", newPassword)
      .waitForElementVisible("//button[text()='Change Password']", 1000)
      .click("//button[text()='Change Password']")
      .waitForElementVisible(`//p[text()='${successMsg}']`, 3000)
      .assert.containsText(`//p[text()='${successMsg}']`, successMsg)
      .useCss()
      .waitForElementVisible('div.navbar-link', 1000)
      .click('div.navbar-link')
      .useXpath()
      .waitForElementVisible("//a[text()='Logout']", 1000)
      .click("//a[text()='Logout']")
      .pause(1000)
  },
  'test login new password': function(browser) {
    browser
    .useCss()
    .assert.containsText('.title', 'Scampea')
    .assert.containsText('.subtitle', 'Intranet login')
    .assert.elementPresent('input[name=username]')
    .assert.elementPresent('input[name=password]')
    .setValue('input[name=username]', user.username)
    .setValue('input[name=password]', newPassword)
    .click('button[name=login]')
    .end()
  }
}