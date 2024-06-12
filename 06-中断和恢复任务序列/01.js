/*
 * 依次顺序执行一系列任务
 * @param {...Function} tasks 任务列表，每个任务无参、异步
 */
function processTasks(...tasks) {
  let isRunning = false

  // 当前执行任务的下标
  let taskIndex = 0

  // 接受每个任务的执行结果
  const result = []

  let prom = null
  return {
    start() {
      return new Promise(async (resolve, reject) => {
        if (prom) {
          // 结束了
          prom.then(resolve, reject)
          return
        }

        if (isRunning) {
          return
        }

        isRunning = true

        while (taskIndex <= tasks.length - 1) {
          try {
            console.log("执行中...")
            result.push(await tasks[taskIndex]())
            console.log("执行完成")
          } catch (err) {
            // 失败了
            isRunning = false

            reject(err)

            prom = Promise.reject(err)
            return
          }

          if (!isRunning && i !== tasks.length - 1) {
            console.log("执行被中断")
            // 中断
            return
          }
        }

        // 成功
        isRunning = false
        resolve(result)
        prom = Promise.resolve(result)
      })
    },
    pause() {
      isRunning = false
    }
  }
}


// 应用场景：大文件分片上传