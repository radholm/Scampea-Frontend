// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

const user = {
  username: 'admin',
  password: 'secret'
}
const realUserToAddToProject = 'Admin Adminsson'
const userToAddToProject = 'Test Testsson'
const projectTestName = 'abc123abc'
const changedProjectTestName = '123abc123'

module.exports = {
  '@tags': ['project'],
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
  'test create project': function (browser) {
    const projectNameInput = 'projectName'
    const createNewProjectBtn = 'Create New Project'

    browser
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
  },
  'test add user to created project': function (browser) {
    browser
      .useXpath()
      .waitForElementVisible("//a[text()='Projects']", 1000)
      .click("//a[text()='Projects']")
      .click("//option[text()='Show all projects']")
      .waitForElementVisible(`//p[text()='${projectTestName}']/../..//a[text()='Edit']`, 1000)
      .click(`//p[text()='${projectTestName}']/../..//a[text()='Edit']`)
      .waitForElementVisible(`//button[text()='${realUserToAddToProject}']`, 1000)
      .click(`//button[text()='${realUserToAddToProject}']`)
      .pause(500)
      .waitForElementVisible(`//button[text()='${realUserToAddToProject}']`, 1000)
      .click("//span[text()='Back']")
  },
  'test change project manager': function (browser) {
    browser
    .useXpath()
    .waitForElementVisible("//a[text()='Projects']", 1000)
    .click("//a[text()='Projects']")
    .click("//option[text()='Show all projects']")
    .waitForElementVisible(`//p[text()='${projectTestName}']/../..//a[text()='Edit']`, 1000)
    .click(`//p[text()='${projectTestName}']/../..//a[text()='Edit']`)
    .waitForElementVisible(`//option[text()='${realUserToAddToProject}']`, 1000)
    .click(`//option[text()='${realUserToAddToProject}']`)
    .waitForElementVisible("//button[text()='Update name / Project manager']",1000)
    .click("//button[text()='Update name / Project manager']")
    .click("//span[text()='Back']")
  },
  'test remove user to created project': function (browser) {
    browser
    .useXpath()
    .waitForElementVisible("//a[text()='Projects']", 1000)
    .click("//a[text()='Projects']")
    .click("//option[text()='Show all projects']")
    .waitForElementVisible(`//p[text()='${projectTestName}']/../..//a[text()='Edit']`, 1000)
    .click(`//p[text()='${projectTestName}']/../..//a[text()='Edit']`)
    .waitForElementVisible(`//button[text()='${realUserToAddToProject}']`, 1000)
    .click(`//button[text()='${realUserToAddToProject}']`)
    .pause(500)
    .waitForElementVisible(`//button[text()='${realUserToAddToProject}']`, 1000)
    .click("//span[text()='Back']")
  },
  'test change project name': function (browser) {
    browser
    .useXpath()
    .waitForElementVisible("//a[text()='Projects']", 1000)
    .click("//a[text()='Projects']")
    .click("//option[text()='Show all projects']")
    .waitForElementVisible(`//p[text()='${projectTestName}']/../..//a[text()='Edit']`, 1000)
    .click(`//p[text()='${projectTestName}']/../..//a[text()='Edit']`)
    .useCss()
    .waitForElementVisible('input[name=projectName]', 1000)
    .assert.valueContains('input[name=projectName]', 'abc123abc')
    .setValue(`input[name='projectName']`, changedProjectTestName)
    .waitForElementVisible('input[name=projectName]', 1000)
    .useXpath()
    .waitForElementVisible("//button[text()='Update name / Project manager']",1000)
    .click("//button[text()='Update name / Project manager']")
    .click("//span[text()='Back']")
  },
  'test delete project': function (browser) {
    browser
      .useXpath()
      .waitForElementVisible("//a[text()='Projects']", 1000)
      .click("//a[text()='Projects']")
      .click("//option[text()='Show all projects']")
      .waitForElementVisible(`//p[text()='${projectTestName}${changedProjectTestName}']/../..//a[text()='Edit']`, 1000)
      .click(`//p[text()='${projectTestName}${changedProjectTestName}']/../..//a[text()='Edit']`)
      .waitForElementVisible("//span[text()='DELETE project']", 1000)
      .click("//span[text()='DELETE project']")
      .acceptAlert()
  }
}
