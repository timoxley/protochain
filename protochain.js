'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = protochain;


function protochain(obj) {
  var chain = [];
  var target = getPrototypeOf(obj);
  while (target) {
    chain.push(target);
    target = getPrototypeOf(target);
  }

  return chain;
}

function getPrototypeOf(obj) {
  if (obj == null) return null;
  return Object.getPrototypeOf(Object(obj));
}

