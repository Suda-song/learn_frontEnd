function add(){
    let count = 0
    function inner(...args){
        if(args.length===0){
            return count
        }
        for(let val of args){
             count=count+val
        }
       return inner
    }
    return inner
}