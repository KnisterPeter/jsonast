# jsonast is a json to ast parser with some error correction

[![license][license-image]][license-url]
[![dep][daviddm-jsonast-image]][daviddm-jsonast-url]
[![dev][daviddm-dev-jsonast-image]][daviddm-dev-jsonast-url]
[![travis][travis-image]][travis-url]
[![coveralls][coveralls-image]][coveralls-url]
[![commitizen][commitizen-image]][commitizen-url]
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

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

const ast = parse('{}');
```

---
jsonast is built by [KnisterPeter](https://github.com/KnisterPeter) and
[contributors](https://github.com/jsonast/jsonast/graphs/contributors) and released under the
[MIT](./LICENSE) license.

[license-image]: https://img.shields.io/github/license/KnisterPeter/jsonast.svg
[license-url]: https://github.com/KnisterPeter/jsonast

[daviddm-jsonast-image]: https://david-dm.org/KnisterPeter/jsonast/status.svg
[daviddm-jsonast-url]: https://david-dm.org/KnisterPeter/jsonast
[daviddm-dev-jsonast-image]: https://david-dm.org/KnisterPeter/jsonast/dev-status.svg
[daviddm-dev-jsonast-url]: https://david-dm.org/KnisterPeter/jsonast?type=dev

[travis-image]: https://travis-ci.org/KnisterPeter/jsonast.svg?branch=master
[travis-url]: https://travis-ci.org/KnisterPeter/jsonast

[coveralls-image]: https://img.shields.io/coveralls/KnisterPeter/jsonast/master.svg
[coveralls-url]: https://coveralls.io/github/jsonast/jsonast

[commitizen-image]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]: http://commitizen.github.io/cz-cli/
