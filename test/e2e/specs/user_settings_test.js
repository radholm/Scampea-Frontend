// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

const admin = {
  username: 'admin',
  password: 'secret'
}

module.exports = {
  /*'@tags': ['user_settings', 'user_settings_desktop'],
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
      .end()
  }*/
}
