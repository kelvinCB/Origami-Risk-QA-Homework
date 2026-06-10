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
  emptyUsername: {
    username: '',
    password: config.validUser.password,
  },
  emptyPassword: {
    username: config.validUser.username,
    password: '',
  },
});

module.exports = { USERS };