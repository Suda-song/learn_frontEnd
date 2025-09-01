class EventBus {
  private events: Map<string, Function[]> = new Map();
  constructor() {}
  on(event:string,callback:Function){
    if(!this.events.has(event)){
        this.events.set(event,[])
    }
    this.events.get(event)!.push(callback) 
  }
  emit(event:string,...args:any[]){
    const callbacks = this.events.get(event)
    callbacks?.forEach(callback=>{
        try{
            callback(...args)
        }catch(e){
            console.error('fail',e);   
        }
    })
  }
  off(event:string,callback?:Function){
    if(!this.events.has(event)) return 
    if(!callback){
        this.events.delete(event)
    }else{
        this.events.get(event)?.filter((func)=>{(func)=>
            func !== callback
        })
        if(this.events.get(event)?.length===0){
            this.events.delete(event)
        }
    }
  }
  once(event:string,callback:Function){
    const oncecallback = (...args)=>{
        callback(...args)
        this.off(event,oncecallback)
    }
    this.on(event,oncecallback)
  }
}
