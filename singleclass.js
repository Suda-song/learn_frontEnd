const singleton = ()=>{
    let instance 
    const createInstance = ()=>{
        return () => console.log("I am the instance")
    }
    return ()=>{
        if(!instance){
            instance = createInstance()
        }
        return instance;
    }
}

class singleton2 {
    constructor() {
        if (!singleton2.instance) {
            singleton2.instance = this;
        }
        return singleton2.instance;
    }

    getInstance() {
        return this;
    }
}

const instance1 = new singleton2();
export default instance1;
