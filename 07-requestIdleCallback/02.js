const myRequestIdleCallback = function (callback) {
  let startTime = Date.now()
  return setTimeout(function () {
    callback({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50.0 - (Date.now() - startTime))
      }
    })
  }, 1)
}

function cancelIdleCallback(id) {
  clearTimeout(id);
}