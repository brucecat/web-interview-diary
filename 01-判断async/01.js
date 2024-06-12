// 思路：Symbol.toStringTag 知名符号
function isAsyncFunction(func) {

  // Object.prototype.toString.call(a) === 'AsyncFunction'
  return typeof func === 'function' && func[Symbol.toStringTag] === 'AsyncFunction'
}

isAsyncFunction(() => {}) // false
isAsyncFunction(async () => {}) // true
