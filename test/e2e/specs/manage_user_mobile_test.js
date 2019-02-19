// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

const admin = {
  username: 'admin',
  password: 'secret'
}

const newTest = {
  first_name: 'Tesst',
  last_name: 'Tesstsson',
  username: 'testing',
  password: 'new_password123'
}

const test = {
  first_name: 'Test',
  last_name: 'Testsson',
  username: 'test',
  password: 'secret'
}

module.exports = {
  '@tags': ['manage_user_mobile'],
  'test manage user page': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .resizeWindow(320, 568)
      .url(devServer)
      .waitForElementVisible('#app', 500)
      .assert.urlEquals(`${devServer}/login`)
      .setValue('input[name=username]', admin.username)
      .setValue('input[name=password]', admin.password)
      .click('button[name=login]')
      .waitForElementVisible('div.navbar-burger', 1000)
      .assert.urlEquals(`${devServer}/`)
      .click('div.navbar-burger')
      .waitForElementVisible('a[name=manage]', 1000)
      .click('a[name=manage]')
      .useXpath()
      .waitForElementVisible("//h1[text()='Manage Users']", 1000)
      .assert.urlEquals(`${devServer}/manageusers`)
      .waitForElementVisible(`//span[text()='${test.first_name} ${test.last_name}']`, 1000)
      .getLocationInView(`//span[text()='${test.first_name} ${test.last_name}']`)
      .click(`//span[text()='${test.first_name} ${test.last_name}']`)
      .waitForElementVisible("//h1[text()='Create User']", 1000)
      .assert.elementPresent("//h2[text()='Add a new user']")
      .clearValue("//input[@placeholder='Username']")
      .setValue("//input[@placeholder='Username']", newTest.username)
      .getLocationInView("//input[@placeholder='Last Name']")
      .clearValue("//input[@placeholder='First Name']")
      .setValue("//input[@placeholder='First Name']", newTest.first_name)
      .clearValue("//input[@placeholder='Last Name']")
      .setValue("//input[@placeholder='Last Name']", newTest.last_name)
      .setValue("//input[@placeholder='Password']", newTest.password)
      .setValue("//input[@placeholder='Confirm Password']", newTest.password)
      .getLocationInView("//button[text()='Edit User']")
      .click("//button[text()='Edit User']")
      .waitForElementVisible("//p[text()='User was successfully edited']", 1000)
      .useCss()
      .waitForElementVisible('div.navbar-burger', 1000)
      .getLocationInView('div.navbar-burger')
      .click('div.navbar-burger')
      .useXpath()
      .click("//a[text()='Employees']")
      .useCss()
      .waitForElementVisible('div.card', 1000)
      .useXpath()
      .assert.elementPresent(`//p[text()='${newTest.first_name} ${newTest.last_name}']`)
      .assert.urlEquals(`${devServer}/employees`)
      .end() // Simple logout
  },
  'test to login with new credentials': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .resizeWindow(320, 568)
      .url(devServer)
      .useCss()
      .waitForElementVisible('#app', 500)
      .assert.urlEquals(`${devServer}/login`)
      .setValue('input[name=username]', newTest.username)
      .setValue('input[name=password]', newTest.password)
      .click('button[name=login]')
      .waitForElementVisible('div.navbar-burger', 1000)
      .assert.urlEquals(`${devServer}/`)
      .end()
  },
  'reset test account password and username': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .resizeWindow(320, 568)
      .url(devServer)
      .useCss()
      .waitForElementVisible('#app', 500)
      .assert.urlEquals(`${devServer}/login`)
      .setValue('input[name=username]', admin.username)
      .setValue('input[name=password]', admin.password)
      .click('button[name=login]')
      .waitForElementVisible('div.navbar-burger', 1000)
      .assert.urlEquals(`${devServer}/`)
      .useCss()
      .waitForElementVisible('div.navbar-burger', 1000)
      .click('div.navbar-burger')
      .useCss()
      .waitForElementVisible('a[name=manage]', 1000)
      .click('a[name=manage]')
      .useXpath()
      .waitForElementVisible("//h1[text()='Manage Users']", 1000)
      .assert.urlEquals(`${devServer}/manageusers`)
      .waitForElementVisible(`//span[text()='${newTest.first_name} ${newTest.last_name}']`, 1000)
      .getLocationInView(`//span[text()='${newTest.first_name} ${newTest.last_name}']`)
      .click(`//span[text()='${newTest.first_name} ${newTest.last_name}']`)
      .waitForElementVisible("//h1[text()='Create User']", 1000)
      .assert.elementPresent("//h2[text()='Add a new user']")
      .clearValue("//input[@placeholder='Username']")
      .setValue("//input[@placeholder='Username']", test.username)
      .getLocationInView("//input[@placeholder='Last Name']")
      .clearValue("//input[@placeholder='First Name']")
      .setValue("//input[@placeholder='First Name']", test.first_name)
      .clearValue("//input[@placeholder='Last Name']")
      .setValue("//input[@placeholder='Last Name']", test.last_name)
      .setValue("//input[@placeholder='Password']", test.password)
      .setValue("//input[@placeholder='Confirm Password']", test.password)
      .getLocationInView("//button[text()='Edit User']")
      .click("//button[text()='Edit User']")
      .waitForElementVisible("//p[text()='User was successfully edited']", 1000)
      .useCss()
      .waitForElementVisible('div.navbar-burger', 1000)
      .getLocationInView('div.navbar-burger')
      .click('div.navbar-burger')
      .useXpath()
      .click("//a[text()='Employees']")
      .useCss()
      .waitForElementVisible('div.card', 1000)
      .useXpath()
      .assert.elementPresent(`//p[text()='${test.first_name} ${test.last_name}']`)
      .assert.urlEquals(`${devServer}/employees`)
      .end() // Simple logout
  },
  'login with test user original credentials': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .resizeWindow(320, 568)
      .url(devServer)
      .useCss()
      .waitForElementVisible('#app', 500)
      .assert.urlEquals(`${devServer}/login`)
      .setValue('input[name=username]', test.username)
      .setValue('input[name=password]', test.password)
      .click('button[name=login]')
      .waitForElementVisible('div.navbar-burger', 1000)
      .assert.urlEquals(`${devServer}/`)
      .end()
  }
}
