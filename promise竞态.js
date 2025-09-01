const createLatestPromise = ()=>{
    let currentIndex = 0
    return (promisefn)=>{
        const resquestId = ++currentIndex
        return new Promise((resolve,reject)=>{
            promisefn.then((res)=>{
                if(resquestId === currentIndex){
                    resolve(res)
                }
            }).catch((err)=>{
                if(resquestId === currentIndex){
                    reject(err)
                }
            })
        })

    }
}

const useLatestPromise = createLatestPromise();
useLatestPromise(new Promise((resolve) => setTimeout(() => resolve("Result 1"), 1000)));
useLatestPromise(new Promise((resolve) => setTimeout(() => resolve("Result 2"), 500)));
useLatestPromise(new Promise((resolve) => setTimeout(() => resolve("Result 3"), 2000)));
