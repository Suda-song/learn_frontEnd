function mypromseall(promises){

    new Promise((resolve,reject)=>{
        const results = []
        let complete = 0
        promises.forEach((promise,index) => {
            Promise.resolve(promise).then(res=>{
                results[index]=res
                complete++
                if(complete === promises.length){
                    resolve(results)
                }
            }).catch(reject)
        });
    })
}