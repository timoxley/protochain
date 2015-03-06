"use strict"

import test from 'tape'
import protochain from './'

test('protochain', t => {
  t.test('finds correct prototype chain', t => {
    let obj = {}
    t.deepEqual(protochain(obj), [Object.prototype])
    t.deepEqual(protochain(Object.create(obj)), [obj, Object.prototype])
    t.deepEqual(protochain(new Error('message')), [Error.prototype, Object.prototype])
    t.deepEqual(protochain(new TypeError('message')), [TypeError.prototype, Error.prototype, Object.prototype])
    t.deepEqual(protochain(new String()), [String.prototype, Object.prototype])
    t.deepEqual(protochain(new Number()), [Number.prototype, Object.prototype])
    t.deepEqual(protochain(new RegExp('abc')), [RegExp.prototype, Object.prototype])
    t.deepEqual(protochain(new Date()), [Date.prototype, Object.prototype])
    t.end()
  })

  t.test('null prototype is handled correctly', t => {
    let noProtoObject = Object.create(null)
    t.deepEqual(protochain(noProtoObject), [])
    t.deepEqual(protochain(Object.create(noProtoObject)), [noProtoObject])
    t.end()
  })

  t.test('non-object values cooerce to object counterparts correctly', t => {
    t.deepEqual(protochain('abc'), [String.prototype, Object.prototype])
    t.deepEqual(protochain(123), [Number.prototype, Object.prototype])
    t.deepEqual(protochain(/abc/), [RegExp.prototype, Object.prototype])
    t.deepEqual(protochain(true), [Boolean.prototype, Object.prototype])
    t.deepEqual(protochain(false), [Boolean.prototype, Object.prototype])
    // falsey values
    t.deepEqual(protochain(''), [String.prototype, Object.prototype])
    t.deepEqual(protochain(0), [Number.prototype, Object.prototype])
    t.end()
  })

  t.test('null values produce empty list', t => {
    t.deepEqual(protochain(), [])
    t.deepEqual(protochain(undefined), [])
    t.deepEqual(protochain(null), [])
    t.end()
  })

  t.test('examples', t => {
    t.test('ES5', t => {
      function Person() {}
      function FancyPerson() {
        Person.call(this)
      }
      FancyPerson.prototype = Object.create(Person.prototype)

      t.deepEquals(protochain(new Person()), [Person.prototype, Object.prototype])
      t.deepEquals(protochain(new FancyPerson()), [FancyPerson.prototype, Person.prototype, Object.prototype])
      t.end()
    })
    t.test('ES6', t => {
      class Person {}
      t.deepEquals(protochain(new Person()), [Person.prototype, Object.prototype])

      class FancyPerson extends Person {}
      t.deepEquals(protochain(new FancyPerson()), [FancyPerson.prototype, Person.prototype, Object.prototype])
      t.end()
    })

  })

  t.end()
})
