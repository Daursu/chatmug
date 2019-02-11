// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'homepage loads': (browser) => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('#username')
      .assert.containsText('h1', 'ChatMUG');
  },

  'user logs in': (browser) => {
    browser
      .waitForElementVisible('#username', 2000)
      .setValue('#username', 'John')
      .click('button[type="submit"]')
      .waitForElementPresent('#p-chat', 2000)
      .assert.containsText('h1', 'Lobby');
  },

  'sends a chat message': (browser) => {
    browser
      .setValue('#chat-input', 'hello')
      .keys(browser.Keys.ENTER)
      .waitForElementVisible('.message-container', 2000)
      .end();
  },
};
