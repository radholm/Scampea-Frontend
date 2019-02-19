// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

const user = {
  username: 'admin',
  password: 'secret'
}
const realUserToAddToProject = 'Admin Adminsson'
const userToAddToProject = 'Test Testsson'
const projectTestName = 'abc123abc'
const dateTestValue = '2017-10-09'
const timeTestValue = '12:34'
const contributionTestValue = "Testing."

module.exports = {
  '@tags': ['timelog_mobile'],
  before: function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .resizeWindow(320, 568)
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
  'test create timelog': function (browser) {
    const createNewTimelog = 'New timelog'
    const projectNameInput = 'projectName'
    const createNewProjectBtn = 'Create New Project'

    browser
      .useCss()
      .waitForElementVisible('div.navbar-burger', 1000)
      .click('div.navbar-burger')
      .useXpath()
      .waitForElementVisible("//a[text()='Projects']", 1000)
      .click("//a[text()='Projects']")
      .waitForElementVisible(`//a[text()='${createNewProjectBtn}']`, 1000)
      .click(`//a[text()='${createNewProjectBtn}']`)
      .useCss()
      .waitForElementVisible(`input[name=${projectNameInput}]`, 1000)
      .setValue(`input[name=${projectNameInput}]`, projectTestName)
      .useXpath()
      .click(`//option[text()='${userToAddToProject}']`)
      .click("//input[@value='Create project']")
      // Timelog
      .useCss()
      .waitForElementVisible('div.navbar-burger', 1000)
      .click('div.navbar-burger')
      .useXpath()
      .waitForElementVisible("//a[text()='Time Logs']", 1000)
      .click("//a[text()='Time Logs']")
      .waitForElementVisible(`//a[text()='${createNewTimelog}']`, 1000)
      .click(`//a[text()='${createNewTimelog}']`)
      .waitForElementVisible(`//option[text()='${projectTestName}']`, 1000)
      .click(`//option[text()='${projectTestName}']`)
      .useCss()
      .waitForElementVisible(`input[type=time]`, 1000)
      .useXpath()
      .setValue(`//input[@type='date']`, dateTestValue)
      .setValue(`//input[@type='time']`, timeTestValue)
      .setValue(`//textarea`, contributionTestValue)
      .waitForElementVisible(`//input[@value='Create timelog' and not(@disabled)]`, 1000)
      .click(`//input[@value='Create timelog']`)
  }
}
