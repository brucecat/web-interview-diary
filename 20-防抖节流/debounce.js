const debounce = function(func, timeout = 300){
  let timer = null

  return function(...args){
    const that = this

    if(timer){
      clearTimeout(timer)
    }

    timer = setTimeout(()=>{
      // func(...args)
      typeof func === 'function' && func.apply(that, args)
    }, timeout)
  }
}