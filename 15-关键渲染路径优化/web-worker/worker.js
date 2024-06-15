// worker.js
self.addEventListener('message', async function (e) {
  // 接收从主线程发送的消息
  console.log('Worker received message:', e.data)

  console.log('worker self: ', self)

  console.log('globalThis: ', globalThis);

  // 执行一些计算任务
  const result = await performComplexCalculation(e.data)

  // 将结果发送回主线程
  self.postMessage(result)
})

function performComplexCalculation(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 这里只是一个示例，实际上你可以执行任何需要的计算
      let sum = 0
      for (let i = 0; i < data; i++) {
        sum += i
      }
      
      resolve(sum)
    }, 4000)
  })
}
