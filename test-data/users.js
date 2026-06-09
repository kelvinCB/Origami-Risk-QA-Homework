const { config } = require('../utils/config');

const USERS = Object.freeze({
  valid: config.validUser,
  invalidUsername: {
    username: 'invalid-user',
    password: config.validUser.password,
  },
  invalidPassword: {
    username: config.validUser.username,
    password: 'InvalidPassword!',
  },
});

module.exports = { USERS };