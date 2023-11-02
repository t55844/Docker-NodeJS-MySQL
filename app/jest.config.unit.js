const commonConfig = require('./jest.config');

module.exports = {
  ...commonConfig,
  testMatch: [
    '**/*.unit.test.{js,ts}'
  ],
  collectCoverageFrom: [
    '**/src/controller/*.js',
  ],
  coverageDirectory: 'coverage/unit'
};