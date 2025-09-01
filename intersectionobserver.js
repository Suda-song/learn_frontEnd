// IntersectionObserver 是一个现代浏览器提供的 Web API，用于异步观察目标元素与其祖先元素或顶级文档视口（viewport）的交叉状态变化。

// 核心作用
// 检测元素可见性：判断元素是否进入或离开视口
// 异步监听：不会阻塞主线程，性能优异
// 精确控制：可以设置交叉比例阈值和边距
// 批量处理：可以同时观察多个元素
const observer = new IntersectionObserver(callback, options)
const callback = (entries, observer) => {
  entries.forEach(entry => {
    console.log('目标元素:', entry.target)
    console.log('是否相交:', entry.isIntersecting)
    console.log('相交比例:', entry.intersectionRatio)
    console.log('相交区域:', entry.intersectionRect)
    console.log('目标区域:', entry.boundingClientRect)
    console.log('根元素区域:', entry.rootBounds)
  })
}
const options = {
  root: null,              // 根元素，null 表示视口
  rootMargin: '0px',       // 根元素边距
  threshold: 0.5           // 触发阈值
}


const target = document.querySelector('.target')
observer.observe(target) // 开始观察
observer.unobserve(target) //停止观察
observer.disconnect() // 停止所有观察

// 埋点系统
class trackplugin{
    constructor(){
        this.exposeElements = new Set() // 避免重复曝光
        this.setupObserver()        
    }
    setupObserver(){
        this.observer = new IntersectionObserver((entries,observer)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    if(!this.exposeElements.has(entry.id)){
                        this.exposeElements.add(entry.id)
                        sendTrackData()
                        
                    }else{
                        console.log('已经曝光过了，不再触发')
                    }
                    
                }
            })
        },
        {
         rootMargin: '0px',
          threshold: 0.1
        })
    }

    observe(element){
        if(element && element.nodeType === Node.ELEMENT_NODE){
            this.observe.observe(element)
        }
        
    }
    sendTrackData(params) {
        console.log('埋点曝光')
    }

}

// 无限滚动的实现
class InfiniteScroll {
  constructor(container, loadMore) {
    this.container = container
    this.loadMore = loadMore
    this.loading = false
    this.page = 1
    
    this.setupObserver()
    this.createSentinel()
  }
  
  setupObserver() {
    this.observer = new IntersectionObserver((entries, observer) => {
      // entries: 观察目标的变化数组
      // observer: 当前观察器实例
      
      entries.forEach(entry => {
        // entry.target: 哨兵元素
        console.log('哨兵元素状态:', {
          isIntersecting: entry.isIntersecting, // 哨兵元素是否在视口中
          intersectionRatio: entry.intersectionRatio,// // 哨兵元素可见程度 ，0-1
          targetElement: entry.target.className // // 哨兵元素的类名
        })
        
        if (entry.isIntersecting && !this.loading) {
          this.handleLoadMore(observer)
        }
      })
    }, {
      rootMargin: '100px', // 提前100px触发
      threshold: 0.1
    })
  }
  
  createSentinel() {
    this.sentinel = document.createElement('div')
    this.sentinel.className = 'scroll-sentinel'
    this.sentinel.textContent = '加载更多...'
    this.container.appendChild(this.sentinel)
    
    // 开始观察哨兵元素
    this.observer.observe(this.sentinel)
  }
  
  async handleLoadMore(observer) {
    this.loading = true
    
    try {
      const newData = await this.loadMore(this.page)
      
      if (newData.length === 0) {
        // 没有更多数据，停止观察
        observer.unobserve(this.sentinel)
        this.sentinel.textContent = '没有更多内容了'
        return
      }
      
      // 渲染新内容
      this.renderData(newData)
      this.page++
      
    } catch (error) {
      console.error('加载失败:', error)
      // 发生错误时可能需要重试，不停止观察
    } finally {
      this.loading = false
    }
  }
  
  renderData(data) {
    data.forEach(item => {
      const element = document.createElement('div')
      element.textContent = item.title
      element.className = 'content-item'
      
      // 在哨兵元素之前插入新内容
      this.container.insertBefore(element, this.sentinel)
    })
  }
  
  destroy() {
    // 清理资源
    this.observer.disconnect()
    this.sentinel?.remove()
  }
}

// 使用
const container = document.querySelector('.content-container')
const infiniteScroll = new InfiniteScroll(container, async (page) => {
  const response = await fetch(`/api/data?page=${page}`)
  return response.json()
})

