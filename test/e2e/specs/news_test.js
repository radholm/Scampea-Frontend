// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

const user = {
  username: 'admin',
  password: 'secret'
}
const titleTestValue = 'Test  titel'
const messageTestValue = 'Test message'

module.exports = {
  '@tags': ['news'],
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
  'test create news': function (browser) {
    browser
    .useXpath()
    .waitForElementVisible("//a[text()='Create News']", 1000)
    .click("//a[text()='Create News']")
    .waitForElementVisible("//input[@placeholder='Title']", 1000)
    .setValue("//input[@placeholder='Title']", titleTestValue)
    .waitForElementVisible("//textarea[@placeholder='News message...']", 1000)
    .setValue("//textarea[@placeholder='News message...']", messageTestValue)
    .waitForElementVisible("//input[@type='submit']", 1000)
    .click("//input[@type='submit']")
  }
}
