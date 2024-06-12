function myRequestIdleCallback(callback, options) {
  const channel = new MessageChannel();
  channel.port2.onmessage = function(event) {
    const startTime = performance.now();
    const idleDeadline = {
      timeRemaining: function() {
        return Math.max(0, options.timeout - (performance.now() - startTime)); // 模拟剩余时间
      },
      didTimeout: false // 初始化为 false
    };

    let shouldYield = false;

    const taskRunner = {
      run: function() {
        const taskStartTime = performance.now();
        while (idleDeadline.timeRemaining() > 0 && !shouldYield) {
          // 模拟执行任务
          if (performance.now() - taskStartTime > 0.9 * options.timeout) {
            shouldYield = true; // 如果执行时间超过剩余时间的90%，设置 shouldYield 为 true
          }
        }
        idleDeadline.didTimeout = shouldYield; // 如果 shouldYield 为 true，表示任务超时
        callback(idleDeadline);
      }
    };

    requestAnimationFrame(taskRunner.run); // 使用 requestAnimationFrame 来模拟执行任务
  };
  window.postMessage('requestIdleCallback', '*', [channel.port1]);
}

// 使用示例
myRequestIdleCallback(function(deadline) {
  if (deadline.didTimeout) {
    console.log('Task timed out');
  } else {
    console.log('Task completed within deadline');
  }
}, { timeout: 100 }); // 设置超时时间为100毫秒