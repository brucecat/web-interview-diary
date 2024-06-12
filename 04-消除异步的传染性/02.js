function getUser(){
  return fetch('https://my-json-server.typicode.com/typicode/demo/profile')
}

function m1() {
  // other work
  return getUser()
}

function m2() {
  // other work
  return m1()
}

function main() {
  // other work
  console.log("main 运行了")
  const user = m2()
  console.log('user: ', user);

  return user
}

function run(func) {
  const _originalFetch = window.fetch

  const cache = []
  let i = 0

  window.fetch = (...args) => {
    // 有缓存
    if (cache[i]) {
      if (cache[i].status === 'fulfilled') {
        // 交付缓存结果
        return cache[i].data
      } else if (cache[i].status === 'rejected') {
        throw cache[i].err
      }
    }

    const result = {
      status: 'pending',
      data: null,
      err: null
    }

    cache[i] = result
    i++

    // 正式发送请求
    const prom = _originalFetch(...args)
      .then(res => res.json())
      .then(
        resp => {
          result.status = 'fulfilled'
          result.data = resp
        },
        err => {
          result.status = 'rejected'
          result.err = err
        }
      )

    // 报错
    throw prom
  }

  try {
    func()
  } catch (err) {
    // 什么时候引发重新执行func
    if (err instanceof Promise) {
      const reRun = () => {
        i = 0
        func()
      }
      err.then(reRun, reRun)
    }
  }
}

run(main)
