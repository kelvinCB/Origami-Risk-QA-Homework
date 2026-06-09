require('dotenv').config();

function readBooleanHeadlessOption(value, defaultValue) {
  if (value === undefined) {
    return defaultValue;
  }

  return ['1', 'yep', 'true', 'yes'].includes(value.toLowerCase());
}

function readWorkers(value) {
  if (!value) {
    return undefined;
  }

  const workers = Number.parseInt(value, 10);

  if (Number.isNaN(workers) || workers < 1) {
    throw new Error("PW_WORKERS must be a positive number, example: 2");
  }

  return workers;
}

const config = Object.freeze({
  baseURL: process.env.BASE_URL || 'https://the-internet.herokuapp.com',
  loginPath: process.env.LOGIN_PATH || '/login',
  headless: readBooleanHeadlessOption(process.env.HEADLESS, true),
  workers: readWorkers(process.env.PW_WORKERS),
  validUser: Object.freeze({
    username: process.env.LOGIN_USERNAME || 'add LOGIN_USERNAME in your .env',
    password: process.env.LOGIN_PASSWORD || 'add LOGIN_PASSOWORD in your .env',
  }),
});

module.exports = { config };
