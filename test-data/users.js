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
  emptyUsernameAndPassword: {
    username: '',
    password: '',
  },
  usernameWithSpaces: {
    username: ` ${config.validUser.username} `,
    password: config.validUser.password,
  },
  passwordWithSpaces: {
    username: config.validUser.username,
    password: ` ${config.validUser.password} `,
  },
  usernameCasing: {
    username: 'TomSmith',
    password: config.validUser.password,
  },
  passwordCasing: {
    username: config.validUser.username,
    password: config.validUser.password.toLowerCase(),
  },
});

module.exports = { USERS };