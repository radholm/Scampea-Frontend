// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

const admin = {
  username: 'admin',
  password: 'secret'
}

const invalidUser = {
  username: 'invalidusername',
  password: 'lkgfdsgdfs'
}

module.exports = {
  '@tags': ['auth_mobile'],
  'test valid login as admin': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .resizeWindow(320, 568)
      .url(devServer)
      .waitForElementVisible('#app', 500, 'Check if the app loaded properly')
      .assert.urlEquals(`${devServer}/login`)
      .assert.elementPresent('.title', 'Scampea')
      .assert.elementPresent('.subtitle', 'Intranet login')
      .assert.elementPresent('input[name=username]')
      .assert.elementPresent('input[name=password]')
      .setValue('input[name=username]', admin.username)
      .setValue('input[name=password]', admin.password)
      .click('button[name=login]')
  },
  'test logout admin': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .waitForElementVisible('div.navbar-burger', 1000)
      .click('div.navbar-burger')
      .waitForElementVisible('a[name=logout]', 1000)
      .click('a[name=logout]')
      .waitForElementVisible('.title', 1000)
      .waitForElementVisible('input[name=username]', 1000)
      .assert.urlEquals(`${devServer}/login`)
      .end()
  },
  'test login with invalid credentials': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .resizeWindow(320, 568)
      .url(devServer)
      .waitForElementVisible('#app', 500)
      .assert.urlEquals(`${devServer}/login`)
      .setValue('input[name=username]', invalidUser.username)
      .setValue('input[name=password]', invalidUser.password)
      .click('button[name=login]')
      .waitForElementVisible('p.is-danger', 1000)
      .assert.containsText('p.is-danger', 'The user credentials were incorrect.')
      .end()
  },
  'test login with no password': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .resizeWindow(320, 568)
      .url(devServer)
      .waitForElementVisible('#app', 500)
      .assert.urlEquals(`${devServer}/login`)
      .setValue('input[name=username]', invalidUser.username)
      .click('button[name=login]')
      .waitForElementVisible('p.is-danger', 1000)
      .assert.containsText('p.is-danger', 'The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.')
      .end()
  },
  'test login with no username': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .resizeWindow(320, 568)
      .url(devServer)
      .waitForElementVisible('#app', 500)
      .assert.urlEquals(`${devServer}/login`)
      .setValue('input[name=password]', invalidUser.password)
      .click('button[name=login]')
      .waitForElementVisible('p.is-danger', 1000)
      .assert.containsText('p.is-danger', 'The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.')
      .assert.urlEquals(`${devServer}/login`)
      .end()
  }
}
