// requestIdleCallback回调的执行的前提条件是当前浏览器处于空闲状态
// 在网页中，有许多耗时但是却又不能那么紧要的任务。它们和紧要的任务，比如对用户的输入作出及时响应的之类的任务，它们共享事件队列。如果两者发生冲突，用户体验会很糟糕。我们可以使用setTimout，对这些任务进行延迟处理。但是我们并不知道，setTimeout在执行回调时，是否是浏览器空闲的时候。
// 而requestIdleCallback就解决了这个痛点，requestIdleCallback会在帧结束时并且有空闲时间，或者用户不与网页交互时，执行回调。
// https://www.cnblogs.com/goloving/p/14074006.html

// callback：回调，即空闲时需要执行的任务，该回调函数接收一个IdleDeadline对象作为入参。其中IdleDeadline对象包含：
// didTimeout，布尔值，表示任务是否超时，结合 timeRemaining 使用。
// timeRemaining()，表示当前帧剩余的时间，也可理解为留给任务的时间还有多少。

function work() {
  tasks.shift()()
  console.log('执行任务')
}

function myNonEssentialWork(deadline) {
  // 如果帧内有富余的时间，或者超时
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0) {
    work()
  }
  if (tasks.length > 0) requestIdleCallback(myNonEssentialWork)
}

requestIdleCallback(myNonEssentialWork, { timeout: 2000 })
