function throttle (func,delay){
    let last = 0
    return function (...args){
    const now = Date.now()
    if(now-last>=delay){
            func.apply(this,args)
            last = now
        }
    }
}