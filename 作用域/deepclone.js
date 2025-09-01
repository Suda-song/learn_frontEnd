 function deepclone (obj){
    if(obj == null || typeof obj !== 'object'){
        return obj;
    }
    const clone = Array.isArray(obj)?[]:{}
    for (const key in obj){
        if(obj.hasOwnProperty(key)){
            clone[key] = deepclone(obj[key]);
        }
    }
    return clone;
 }