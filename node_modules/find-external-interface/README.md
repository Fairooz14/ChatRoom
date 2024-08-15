# find-external-interface

[![Build Status](https://travis-ci.org/boneskull/find-external-interface.svg?branch=master)](https://travis-ci.org/boneskull/find-external-interface) [![Dependency Status](https://dependencyci.com/github/boneskull/find-external-interface/badge)](https://dependencyci.com/github/boneskull/find-external-interface) [![Coverage Status](https://coveralls.io/repos/github/boneskull/find-external-interface/badge.svg?branch=master)](https://coveralls.io/github/boneskull/find-external-interface?branch=master)

> Find the name of a network interface bound to an external (non-localhost) IP address

## Usage

This module exports a single function, [findExternalInterface](#findExternalInterface).

### findExternalInterface

Find the name of a network interface bound to an external (non-localhost) IP address or `null` if none found. This function returns the name of the first interface which satisfies the criteria.

#### Parameters

- `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Options
  - `options.IPv6` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** If true, find IPv6 interface (optional, default `false`)
  - `options.name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** If set, only check interface w/ this name for external address

#### Examples

```javascript
const {findExternalInterface} = require('find-external-interface');
const name = findExternalInterface(); // 'eth0'
const info = require('os').networkInterfaces(name); // ip address, etc.
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** Interface name

## Installation

```bash
$ npm install find-external-interface
```

## Requirements

- Node.js v4.0.0 or greater

## License

© 2017 [Christopher Hiller](https://github.com/boneskull). Licensed MIT.
