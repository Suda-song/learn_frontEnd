function myfunction () {
    if(new.target){
        console.log('通过new输出')
    }
}

class myclass {
    constructor(){
        if(new.target === undefined){
            console.log('不是通过new创建')
        }
    }

}

function myNew(constructor, ...args) {
  // 1. 严格的参数验证
  if (typeof constructor !== 'function') {
    throw new TypeError(`${constructor} is not a constructor`)
  }
  
  // 2. 创建一个新对象
  // 方法一：使用 Object.create
  const obj = Object.create(constructor.prototype)
  
  // 3. 执行构造函数，绑定 this 到新对象
  const result = constructor.apply(obj, args)
  
  // 4. 判断构造函数的返回值
  // 如果返回值是对象（包括数组、函数等），则返回该对象
  // 如果返回值是原始类型（undefined、null、string、number、boolean、symbol、bigint），则返回新创建的对象
  const isObject = result !== null && (typeof result === 'object' || typeof result === 'function')

  return isObject ? result : obj
}

// 原型链图示：
// car 实例对象:
// {
//   type: 'Car',
//   __proto__: Vehicle.prototype
// }
//
// Vehicle.prototype:
// {
//   constructor: Vehicle,
//   start: function() { ... },
//   __proto__: Object.prototype
// }
//
// Object.prototype:
// {
//   constructor: Object,
//   toString: function() { ... },
//   valueOf: function() { ... },
//   // ... 其他方法
//   __proto__: null
// }

// 比如这个构造函数，apply一下这个this指向创建的新的对象
function Car(make, model, year) {
  console.log('构造函数内部 - this 指向:', this)
  console.log('this 是 Car 实例吗:', this instanceof Car)
  
  this.make = make
  this.model = model
  this.year = year
  this.mileage = 0
}

