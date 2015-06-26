"use strict";

module.exports = protochain;

function protochain(obj) {
  var result = [];
  var target = getPrototypeOf(obj);
  while (target) {
    result.push(target);
    target = getPrototypeOf(target);
  }

  return result;
}

function getPrototypeOf(obj) {
  if (obj == null) {
    return obj;
  }if (isPrimitive(obj)) obj = Object(obj);
  return Object.getPrototypeOf(obj);
}

function isPrimitive(item) {
  return item === null || typeof item !== "object" && typeof item !== "function";
}

