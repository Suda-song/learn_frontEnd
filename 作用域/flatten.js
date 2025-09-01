function flatten(arr){
    return arr.reduce((flat,item)=>{
        return flat.concat(Array.isArray(item)?flatten(item):item)
    },[])
}