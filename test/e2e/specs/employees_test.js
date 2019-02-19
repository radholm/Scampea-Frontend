// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

const admin = {
  username: 'admin',
  password: 'secret'
}

const normal = {
  username: 'test',
  password: 'secret'
}

module.exports = {
  '@tags': ['employees'],
  'test employee page as admin': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .resizeWindow(1200, 980)
      .url(devServer)
      .waitForElementVisible('#app', 500)
      .assert.urlEquals(`${devServer}/login`)
      .setValue('input[name=username]', admin.username)
      .setValue('input[name=password]', admin.password)
      .click('button[name=login]')
      .useXpath()
      .waitForElementVisible("//a[text()='Employees']", 1000)
      .click("//a[text()='Employees']")
      .useCss()
      .waitForElementVisible('div.card', 1000)
      .assert.elementPresent('div.card')
      .waitForElementVisible('div.card-image', 1000)
      .assert.elementPresent('div.card-image')
      .assert.elementPresent('div.card-content')
      .end()
  },
  'test employee page as normal user': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .resizeWindow(1200, 980)
      .url(devServer)
      .waitForElementVisible('#app', 500)
      .assert.urlEquals(`${devServer}/login`)
      .setValue('input[name=username]', normal.username)
      .setValue('input[name=password]', normal.password)
      .click('button[name=login]')
      .useXpath()
      .waitForElementVisible("//a[text()='Employees']", 1000)
      .click("//a[text()='Employees']")
      .useCss()
      .waitForElementVisible('div.card', 1000)
      .assert.elementPresent('div.card')
      .waitForElementVisible('div.card-image', 1000)
      .assert.elementPresent('div.card-image')
      .assert.elementPresent('div.card-content')
      .end()
  }
}
