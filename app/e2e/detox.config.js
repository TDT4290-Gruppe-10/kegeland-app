/* istanbul ignore file */
module.exports = {
  maxWorkers: 1,
  testEnvironment: './environment',
  testRunner: 'jest-circus/runner',
  testTimeout: 180000,
  testRegex: '\\.e2e\\.ts$',
  reporters: ['detox/runners/jest/streamlineReporter'],
  verbose: true,
};
