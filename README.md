# jsonast is a json to ast parser with some error correction

[![license][license-image]][license-url]
[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![coveralls][coveralls-image]][coveralls-url]
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![renovate badge](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovateapp.com/)

## Rationale

jsonast is a json to AST parser with some error correction.
Most json parsers do not do error correction or do not allow parsing to AST. jsonast combines both of this.

## Installation

Grab jsonast via [npm](https://www.npmjs.com/package/jsonast):

```shell
npm install jsonast
```

## API documentation

```javascript
import parse from 'jsonast';

// Allows plain valid json
const ast = parse('{}');

// but also invalid json like this ones (note the missing commas)
const ast = parse(`
  {
    "key1": "value"
    "key2": "value"
  }
`);
const ast = parse(`
  [
    "entry1"
    "entry2"
  ]
`);
```

---
jsonast is built by [KnisterPeter](https://github.com/KnisterPeter) and
[contributors](https://github.com/jsonast/jsonast/graphs/contributors) and released under the
[MIT](./LICENSE) license.

[license-image]: https://img.shields.io/github/license/KnisterPeter/jsonast.svg
[license-url]: https://github.com/KnisterPeter/jsonast

[npm-image]: https://img.shields.io/npm/v/jsonast.svg?maxAge=2592000
[npm-url]: https://www.npmjs.com/package/jsonast

[travis-image]: https://travis-ci.org/KnisterPeter/jsonast.svg?branch=master
[travis-url]: https://travis-ci.org/KnisterPeter/jsonast

[coveralls-image]: https://img.shields.io/coveralls/KnisterPeter/jsonast/master.svg
[coveralls-url]: https://coveralls.io/github/KnisterPeter/jsonast

[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
