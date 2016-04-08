const Assert  = require('assert')
const canExit = typeof process !== 'undefined' && process && typeof process.exit === 'function'

module.exports = function run (tests, _logger) {
  var failed, logger = (_logger || console)
  Assert.ok(Array.isArray(tests) && tests.length , '`tests` must be an Array with at least one function')

  tests.forEach(function (testLambda) { // run each test lambda to get the returned (quad|quin)tuplet
    Assert.ok(typeof testLambda === 'function', 'Each item in `tests` must be a function')
    const test = testLambda()
    Assert.ok(Array.isArray(test) && test.length >= 4 && typeof test[0] === 'string', 'Each item in `tests` must be a function that returns a (quad|quin)tuplet containing the test title, result, assertion type, expected result and [optionally] assertion message')
    logger.info('\x1b[1m', test[0], '\x1b[0m')
    const assertionMessage = test.length === 5 ? test[4] : undefined

    try {
      const assertField = test[2].split(' ').reverse()[0];
      if (typeof Assert[assertField] !== 'function') throw new Error(`Assert.${assertField} is not a function — See https://nodejs.org/api/assert.html for valid assertion types`)
      Assert[assertField](test[1], test[3], assertionMessage)
      logger.info('\x1b[32m','\t✓ - ', assertionMessage?assertionMessage:'passed', '\x1b[0m') // green output
    } catch (assertionError) {
      if (assertionError.name === 'AssertionError') {
        failed = true
        logger.error('\x1b[31m', assertionError.actual?`\t✗ - ${assertionError.actual} ${assertionError.operator} ${assertionError.expected} ${assertionError.generatedMessage ? '' : '('+assertionMessage+')'}`:`\t✗ - ${assertionError.message}`, '\x1b[0m') // red output
      } else { logger.error('\x1b[31m', `\t✗ - (${test[2]}) ${assertionError.message}`, '\x1b[0m') }
    }
  })

  logger.info('\n\nTests', '\x1b[1m', failed ? '\x1b[31mFAILED :(' : '\x1b[32mPASSED :)', '\x1b[0m', '\n\n')
  failed && canExit && process.exit(1) // let NPM, Travis etc. know we failed
}
