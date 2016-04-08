const run = require('../../')
const Localization = require('./build/Localization').default

const localization = new Localization({ messages : { foo : 'Foo the foos. Also %s & %s.' } })

const tests = [() => [
    'When localizing with a key present in `this.props.messages`',
      localization.localize('foo', 'bars', 'bazzes'),
      'should equal',
      'Foo the foos. Also bars & bazzes.'
], () => [
    'When attempting to localize with a key absent in `this.props.messages`',
      localization.localize('BAR', 'bars', 'bazzes'),
      'should equal',
      'BAR bars bazzes'
]]

run(tests)
