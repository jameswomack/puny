const run = require('./')

const silentLogger = { info: ()=>{}, error: ()=>{} }

const tests = [() => [
    'When importing the module the result should be a function',
      typeof run,
      'should equal',
      'function'
], () => [
    'When running the module it should throw if tests is empty',
      () => { run([], silentLogger) },
      'always throws',
      Error
], () => {
    const dummyTests = [() => [
        'When asserting equal',
          true,
          'should equal',
          true
    ], () => [
        'When asserting true is ok',
          true,
          'should be ok',
          ''
    ]]
    return [
      'When running the module it should not throw if tests are not empty',
      () => { run(dummyTests, silentLogger) },
      'doesNotThrow',
      Error
    ]
}]

run(tests)
