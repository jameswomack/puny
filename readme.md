# puny
## The bantamweight JavaScript test runner with no dependencies
<img src="https://pixabay.com/static/uploads/photo/2013/07/13/12/35/boxing-gloves-159920_960_720.png" height="200">


## No dependencies? Are you sure?
Yes, and Puny is just 30 lines of human-readable JavaScript including helpful error messages and colorized, indented output. Puny simply leverages:
* Node's powerful Assert library
* The beauty of arrow functions
* try->catch
* ANSI escape codes

## But Puny is bad right?
If you still want to use a big test module that you don't use most of, more power to you. Mocha's custom utils file alone is 746 lines of code, so you might want to start there.

![Make testing huge again](https://i.imgflip.com/p8blw.jpg)

## Is it universal?
Yes. Puny will even work in the Browser if you package it with the optional Assert library available in NPM.

## Running a test looks like this:

```js
const run = require('puny')
const Localization = require('./src/Localization')

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
```

## Is there a catch?
Not really. Puny even gives you useful error messages when you don't use it correctly. Puny eats its own dogfood too—the tests for Puny are written using Puny. Puny tests itself!

## Can I easily extend Puny?
Sure you can. Puny accepts a second parameter named `logger` that you can use to intercept the default output mechanism to replace it with your own. You could use this to print Puny's messages to the DOM, send it to an API or feed it to Socket.io. It's up to you! Here's a toy example:
```js
const run = require('puny')

const tests = [/* ... */]

run(tests, function customLogInterceptor (...args) {
	const logArea = document.querySelector('section#log-area')
	const logTextNode = document.createTextNode(args.toString())
	logArea.appendChild(logTextNode)
})
```

## Wait, were you really serious about all this?
Not really. 