# protochain

Get the prototype chain of any JavaScript object or primitive as an Array.

[![Build Status](https://travis-ci.org/timoxley/protochain.svg?branch=master)](https://travis-ci.org/timoxley/protochain)

[![NPM](https://nodei.co/npm-dl/protochain.png?months=3&height=3&chrome)](https://nodei.co/npm/protochain/)

## Installation

```
> npm install protochain
```

## Usage

```js
const protochain = require('protochain')
```

### Primitives

```js

protochain(123)
// => [Number.prototype, Object.prototype]

protochain('abc')
// => [String.prototype, Object.prototype]

protochain(/abc/)
// => [RegExp.prototype, Object.prototype]

protochain(true)
// => [Boolean.prototype, Object.prototype]

protochain(false)
// => [Boolean.prototype, Object.prototype]

protochain(NaN)
// => [Number.prototype, Object.prototype]
```

### Objects & null/undefined

```js
protochain({})
// => [Object.prototype]

protochain(Object.create(null))
// => []

protochain(null)
// => []

protochain(undefined)
// => []

protochain()
// => []
```

### Errors

```
protochain(new Error('message'))
// => [Error.prototype, Object.prototype]

protochain(new TypeError('message'))
// => [TypeError.prototype, Error.prototype, Object.prototype]
```

### Classes

```js
class Person {}
class FancyPerson extends Person {}

protochain(new Person())
// => [Person.prototype, Object.prototype]

protochain(new FancyPerson())
// => [FancyPerson.prototype, Person.prototype, Object.prototype])
```

### ES5 Inheritance

```js
function Person() {

}

function FancyPerson() {
  Person.call(this)
}

FancyPerson.prototype = Object.create(Person.prototype)

protochain(new Person())
// => [Person.prototype, Object.prototype]

protochain(new FancyPerson())
// => [FancyPerson.prototype, Person.prototype, Object.prototype]
```

### Promises

```js
protochain(Promise.resolve())
// => [Promise.prototype, Object.prototype]
```

### Collections

```js
protochain(new Map())
// => [Map.prototype, Object.prototype]

protochain(new Set())
// => [Set.prototype, Object.prototype]

protochain(new WeakMap())
// => [WeakMap.prototype, Object.prototype]

protochain(new WeakSet())
// => [WeakSet.prototype, Object.prototype]
```

### Typed Arrays

Note: different hierarchy in newer JS engines.

```js
protochain(new Int8Array())

// Newer Engines
// => [Int8Array.prototype, TypedArray.prototype, Object.prototype]

// Older Engines
// => [Int8Array.prototype, Object.prototype]
```

## License

MIT
