'use strict';

function makeIterable(object) {
  if (object !== null && object[Symbol.iterator] === 'function') {
    return object;
  }
  return [];
}
