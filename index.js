"use strict"

export default protochain

function protochain(obj) {
  let result = []
  let target = getPrototypeOf(obj)
  while (target) {
    result.push(target)
    target = getPrototypeOf(target)
  }

  return result
}

function getPrototypeOf(obj) {
  if (obj == null) return obj
  if (isPrimitive(obj)) obj = new obj.constructor(obj)
  return Object.getPrototypeOf(obj)
}

function isPrimitive(item) {
  return (
    !(item instanceof Object) &&
    Object.prototype.toString.call(item) !== '[object Object]'
  )
}
