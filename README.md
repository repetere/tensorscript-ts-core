# @tensorscript/ts-core

[![Coverage Status](https://coveralls.io/repos/github/repetere/@tensorscript/ts-core/badge.svg?branch=master)](https://coveralls.io/github/repetere/@tensorscript/ts-core?branch=master) [![Build Status](https://travis-ci.org/repetere/@tensorscript/ts-core.svg?branch=master)](https://travis-ci.org/repetere/@tensorscript/ts-core)

Machine Learning tools built with Tensorflow
### [Full Documentation](https://github.com/repetere/@tensorscript/ts-core/blob/master/docs/API.md)

### Installation

```sh
$ npm i @tensorscript/ts-core
```


### Testing

```sh
$ npm i
$ npm test
```

### Contributing

Fork, write tests and create a pull request!

### Misc

As of Node 8, ES modules are still used behind a flag, when running natively as an ES module

```sh
$ node --experimental-modules my-machine-learning-script.mjs
# Also there are native bindings that require Python 2.x, make sure if you're using Andaconda, you build with your Python 2.x bin
$ npm i --python=/usr/bin/python
 ```

License
----

MIT