// // @ts
// JavaScript Proxy API 完整参考文档
// 1. 基础语法

// const proxy = new Proxy(target, handler)
// target: 原始对象，可以是任何类型的对象（数组、函数、甚至另一个代理）
// handler: 处理器对象，定义哪些操作将被拦截以及如何重新定义被拦截的操作
// 2. Handler 方法详解
// 2.1 get(target, property, receiver)
// 拦截对象的属性读取操作。

// 参数:

// target: 目标对象
// property: 被获取的属性名（字符串或 Symbol）
// receiver: Proxy 或者继承 Proxy 的对象
// 返回值: 任何值

// const obj = { name: 'Vue', version: 3 }

// const proxy = new Proxy(obj, {
//   get(target, property, receiver) {
//     console.log(`获取属性: ${property}`)
//     console.log('target:', target)
//     console.log('receiver:', receiver === proxy) // true
    
//     if (property === 'description') {
//       return `${target.name} v${target.version}`
//     }
    
//     return Reflect.get(target, property, receiver)
//   }
// })

// console.log(proxy.name)        // 获取属性: name -> Vue
// console.log(proxy.description) // 获取属性: description -> Vue v3
// 拦截的操作:

// proxy.foo
// proxy['foo']
// Object.create(proxy)[foo]
// Reflect.get()
// 2.2 set(target, property, value, receiver)
// 拦截对象的属性设置操作。

// 参数:

// target: 目标对象
// property: 被设置的属性名
// value: 被设置的新值
// receiver: 最初被调用的对象（通常是 proxy 本身）
// 返回值: 布尔值，表示设置是否成功


// const user = {}

// const userProxy = new Proxy(user, {
//   set(target, property, value, receiver) {
//     console.log(`设置 ${property} = ${value}`)
    
//     // 数据验证
//     if (property === 'age' && (typeof value !== 'number' || value < 0)) {
//       throw new TypeError('年龄必须是非负数')
//     }
    
//     // 属性转换
//     if (property === 'name' && typeof value === 'string') {
//       value = value.trim()
//     }
    
//     return Reflect.set(target, property, value, receiver)
//   }
// })

// userProxy.name = '  Alice  '  // 设置 name =   Alice   -> 实际存储 'Alice'
// userProxy.age = 25           // 设置 age = 25
// // userProxy.age = -1        // TypeError: 年龄必须是非负数
// 拦截的操作:

// proxy.foo = bar
// proxy['foo'] = bar
// Object.create(proxy)[foo] = bar
// Reflect.set()
// 2.3 has(target, property)
// 拦截 in 操作符。

// 参数:

// target: 目标对象
// property: 需要检查是否存在的属性名
// 返回值: 布尔值


// const secretData = {
//   publicInfo: '公开信息',
//   _privateKey: '私密信息',
//   __internalState: '内部状态'
// }

// const dataProxy = new Proxy(secretData, {
//   has(target, property) {
//     console.log(`检查属性: ${property}`)
    
//     // 隐藏私有属性
//     if (property.startsWith('_')) {
//       return false
//     }
    
//     return property in target
//   }
// })

// console.log('publicInfo' in dataProxy)     // 检查属性: publicInfo -> true
// console.log('_privateKey' in dataProxy)    // 检查属性: _privateKey -> false
// console.log('__internalState' in dataProxy) // 检查属性: __internalState -> false
// 拦截的操作:

// foo in proxy
// foo in Object.create(proxy)
// with(proxy) { (foo); }
// Reflect.has()
// 2.4 deleteProperty(target, property)
// 拦截 delete 操作符。

// 参数:

// target: 目标对象
// property: 待删除的属性名
// 返回值: 布尔值，表示该属性是否被成功删除


// const config = {
//   apiUrl: 'https://api.example.com',
//   timeout: 5000,
//   retryCount: 3,
//   readonly: true
// }

// const configProxy = new Proxy(config, {
//   deleteProperty(target, property) {
//     console.log(`尝试删除属性: ${property}`)
    
//     // 保护重要配置
//     const protectedProps = ['apiUrl', 'readonly']
//     if (protectedProps.includes(property)) {
//       console.log(`属性 ${property} 受保护，无法删除`)
//       return false
//     }
    
//     delete target[property]
//     console.log(`已删除属性: ${property}`)
//     return true
//   }
// })

// delete configProxy.timeout    // 尝试删除属性: timeout -> 已删除属性: timeout
// delete configProxy.apiUrl     // 尝试删除属性: apiUrl -> 属性 apiUrl 受保护，无法删除
// 拦截的操作:

// delete proxy.foo
// delete proxy['foo']
// Reflect.deleteProperty()
// 2.5 ownKeys(target)
// 拦截对象自身属性的读取操作。

// 参数:

// target: 目标对象
// 返回值: 可枚举对象（数组）


// const user = {
//   name: 'Alice',
//   age: 25,
//   email: 'alice@example.com',
//   _id: '12345',
//   _password: 'secret'
// }

// const userProxy = new Proxy(user, {
//   ownKeys(target) {
//     console.log('获取所有属性名')
    
//     // 过滤私有属性，只返回公共属性
//     return Object.keys(target).filter(key => !key.startsWith('_'))
//   }
// })

// console.log(Object.keys(userProxy))           // ['name', 'age', 'email']
// console.log(Object.getOwnPropertyNames(userProxy)) // ['name', 'age', 'email']

// for (const key in userProxy) {
//   console.log(key)  // name, age, email
// }
// 拦截的操作:

// Object.getOwnPropertyNames()
// Object.getOwnPropertySymbols()
// Object.keys()
// for...in 循环
// 2.6 getOwnPropertyDescriptor(target, property)
// 拦截获取属性描述符的操作。

// 参数:

// target: 目标对象
// property: 属性名
// 返回值: 属性描述符对象或 undefined


// const obj = {
//   name: 'Vue',
//   get version() { return '3.0' }
// }

// const objProxy = new Proxy(obj, {
//   getOwnPropertyDescriptor(target, property) {
//     console.log(`获取属性描述符: ${property}`)
    
//     const descriptor = Reflect.getOwnPropertyDescriptor(target, property)
    
//     if (descriptor && property === 'name') {
//       // 修改属性描述符
//       return {
//         ...descriptor,
//         writable: false,  // 设为只读
//         enumerable: true
//       }
//     }
    
//     return descriptor
//   }
// })

// const nameDesc = Object.getOwnPropertyDescriptor(objProxy, 'name')
// console.log(nameDesc)
// // {
// //   value: 'Vue',
// //   writable: false,
// //   enumerable: true,
// //   configurable: true
// // }
// 拦截的操作:

// Object.getOwnPropertyDescriptor()
// Reflect.getOwnPropertyDescriptor()
// 2.7 defineProperty(target, property, descriptor)
// 拦截对象的属性定义操作。

// 参数:

// target: 目标对象
// property: 待定义或修改的属性名
// descriptor: 待定义或修改的属性描述符
// 返回值: 布尔值，表示定义操作是否成功


// const obj = {}

// const objProxy = new Proxy(obj, {
//   defineProperty(target, property, descriptor) {
//     console.log(`定义属性: ${property}`)
//     console.log('描述符:', descriptor)
    
//     // 阻止定义私有属性
//     if (property.startsWith('_')) {
//       console.log('不允许定义私有属性')
//       return false
//     }
    
//     // 强制所有属性为可枚举
//     const newDescriptor = {
//       ...descriptor,
//       enumerable: true
//     }
    
//     return Reflect.defineProperty(target, property, newDescriptor)
//   }
// })

// Object.defineProperty(objProxy, 'name', {
//   value: 'Vue',
//   writable: true,
//   enumerable: false  // 会被强制改为 true
// })

// Object.defineProperty(objProxy, '_secret', {
//   value: 'hidden'  // 定义失败
// })

// console.log(Object.keys(objProxy))  // ['name']
// 拦截的操作:

// Object.defineProperty()
// Reflect.defineProperty()
// 2.8 getPrototypeOf(target)
// 拦截获取对象原型的操作。

// 参数:

// target: 目标对象
// 返回值: 对象或 null


// const obj = { name: 'Vue' }
// const customProto = { framework: true }

// const objProxy = new Proxy(obj, {
//   getPrototypeOf(target) {
//     console.log('获取原型')
//     // 返回自定义原型
//     return customProto
//   }
// })

// console.log(Object.getPrototypeOf(objProxy))  // { framework: true }
// console.log(objProxy.__proto__)               // { framework: true }
// 拦截的操作:

// Object.getPrototypeOf()
// Reflect.getPrototypeOf()
// __proto__
// Object.prototype.isPrototypeOf()
// instanceof
// 2.9 setPrototypeOf(target, prototype)
// 拦截设置对象原型的操作。

// 参数:

// target: 目标对象
// prototype: 对象的新原型或 null
// 返回值: 布尔值，表示原型设置是否成功


// const obj = { name: 'Vue' }

// const objProxy = new Proxy(obj, {
//   setPrototypeOf(target, prototype) {
//     console.log('设置原型:', prototype)
    
//     // 阻止设置某些原型
//     if (prototype && prototype.dangerous) {
//       console.log('危险原型，拒绝设置')
//       return false
//     }
    
//     return Reflect.setPrototypeOf(target, prototype)
//   }
// })

// const safeProto = { safe: true }
// const dangerousProto = { dangerous: true }

// Object.setPrototypeOf(objProxy, safeProto)      // 设置原型: { safe: true }
// Object.setPrototypeOf(objProxy, dangerousProto) // 设置原型: { dangerous: true } -> 危险原型，拒绝设置
// 拦截的操作:

// Object.setPrototypeOf()
// Reflect.setPrototypeOf()
// 2.10 isExtensible(target)
// 拦截对象可扩展性检查。

// 参数:

// target: 目标对象
// 返回值: 布尔值


// const obj = { name: 'Vue' }

// const objProxy = new Proxy(obj, {
//   isExtensible(target) {
//     console.log('检查对象是否可扩展')
//     const result = Reflect.isExtensible(target)
//     console.log('结果:', result)
//     return result
//   }
// })

// console.log(Object.isExtensible(objProxy))  // 检查对象是否可扩展 -> 结果: true -> true

// Object.preventExtensions(objProxy)
// console.log(Object.isExtensible(objProxy))  // 检查对象是否可扩展 -> 结果: false -> false
// 拦截的操作:

// Object.isExtensible()
// Reflect.isExtensible()
// 2.11 preventExtensions(target)
// 拦截对象禁止扩展操作。

// 参数:

// target: 目标对象
// 返回值: 布尔值，表示操作是否成功


// const obj = { name: 'Vue' }

// const objProxy = new Proxy(obj, {
//   preventExtensions(target) {
//     console.log('阻止对象扩展')
    
//     // 在阻止扩展前添加一些元信息
//     target._sealed = new Date().toISOString()
    
//     return Reflect.preventExtensions(target)
//   }
// })

// Object.preventExtensions(objProxy)
// console.log(obj._sealed)  // 2024-01-01T00:00:00.000Z (示例时间)
// console.log(Object.isExtensible(objProxy))  // false
// 拦截的操作:

// Object.preventExtensions()
// Reflect.preventExtensions()
// 2.12 apply(target, thisArg, argumentsList)
// 拦截函数调用操作。只能用于函数对象。

// 参数:

// target: 目标对象（函数）
// thisArg: 被调用时的上下文对象
// argumentsList: 被调用时的参数数组
// 返回值: 任何值


// function greet(name, age) {
//   return `Hello ${name}, you are ${age} years old`
// }

// const greetProxy = new Proxy(greet, {
//   apply(target, thisArg, argumentsList) {
//     console.log('函数被调用')
//     console.log('this:', thisArg)
//     console.log('参数:', argumentsList)
    
//     // 参数验证
//     if (argumentsList.length !== 2) {
//       throw new Error('必须提供姓名和年龄两个参数')
//     }
    
//     // 参数预处理
//     const [name, age] = argumentsList
//     const processedArgs = [
//       typeof name === 'string' ? name.trim() : name,
//       typeof age === 'string' ? parseInt(age, 10) : age
//     ]
    
//     const result = Reflect.apply(target, thisArg, processedArgs)
    
//     // 结果后处理
//     return result.toUpperCase()
//   }
// })

// console.log(greetProxy('Alice', 25))      // HELLO ALICE, YOU ARE 25 YEARS OLD
// console.log(greetProxy('Bob', '30'))      // HELLO BOB, YOU ARE 30 YEARS OLD
// // greetProxy('Charlie')                  // Error: 必须提供姓名和年龄两个参数
// 拦截的操作:

// proxy(...args)
// Function.prototype.apply()
// Function.prototype.call()
// Reflect.apply()
// 2.13 construct(target, argumentsList, newTarget)
// 拦截 new 操作符。只能用于构造函数。

// 参数:

// target: 目标对象（构造函数）
// argumentsList: 构造函数的参数列表
// newTarget: 最初被调用的构造函数
// 返回值: 必须返回一个对象


// function Person(name, age) {
//   this.name = name
//   this.age = age
//   this.createdAt = new Date()
// }

// const PersonProxy = new Proxy(Person, {
//   construct(target, argumentsList, newTarget) {
//     console.log('使用 new 操作符创建实例')
//     console.log('参数:', argumentsList)
//     console.log('newTarget:', newTarget.name)
    
//     // 参数验证
//     if (argumentsList.length < 2) {
//       throw new Error('必须提供姓名和年龄')
//     }
    
//     const [name, age] = argumentsList
    
//     // 参数验证
//     if (typeof name !== 'string' || name.trim().length === 0) {
//       throw new Error('姓名必须是非空字符串')
//     }
    
//     if (typeof age !== 'number' || age < 0 || age > 150) {
//       throw new Error('年龄必须是0-150之间的数字')
//     }
    
//     // 创建实例
//     const instance = Reflect.construct(target, argumentsList, newTarget)
    
//     // 添加额外属性
//     instance.id = Math.random().toString(36).substr(2, 9)
//     instance.validated = true
    
//     return instance
//   }
// })

// const person1 = new PersonProxy('Alice', 25)
// console.log(person1)
// // Person {
// //   name: 'Alice',
// //   age: 25,
// //   createdAt: 2024-01-01T00:00:00.000Z,
// //   id: 'k3j5h2g8f',
// //   validated: true
// // }

// // const person2 = new PersonProxy('', 25)     // Error: 姓名必须是非空字符串
// // const person3 = new PersonProxy('Bob', -1)  // Error: 年龄必须是0-150之间的数字
// 拦截的操作:

// new proxy(...args)
// Reflect.construct()
// 3. 完整示例：创建一个功能完整的代理

// class SmartObject {
//   constructor(data = {}) {
//     this._data = data
//     this._history = []
//     this._validators = {}
    
//     return new Proxy(this, {
//       get(target, property, receiver) {
//         // 内部属性和方法直接返回
//         if (property.startsWith('_') || typeof target[property] === 'function') {
//           return Reflect.get(target, property, receiver)
//         }
        
//         // 记录访问历史
//         target._history.push({
//           type: 'get',
//           property,
//           timestamp: new Date()
//         })
        
//         return Reflect.get(target._data, property, receiver)
//       },
      
//       set(target, property, value, receiver) {
//         // 内部属性直接设置
//         if (property.startsWith('_')) {
//           return Reflect.set(target, property, value, receiver)
//         }
        
//         // 数据验证
//         const validator = target._validators[property]
//         if (validator && !validator(value)) {
//           throw new Error(`验证失败: ${property} = ${value}`)
//         }
        
//         const oldValue = target._data[property]
        
//         // 记录变更历史
//         target._history.push({
//           type: 'set',
//           property,
//           oldValue,
//           newValue: value,
//           timestamp: new Date()
//         })
        
//         return Reflect.set(target._data, property, value, receiver)
//       },
      
//       has(target, property) {
//         if (property.startsWith('_')) return false
//         return property in target._data
//       },
      
//       ownKeys(target) {
//         return Object.keys(target._data)
//       },
      
//       deleteProperty(target, property) {
//         if (property.startsWith('_')) {
//           console.log('无法删除内部属性')
//           return false
//         }
        
//         target._history.push({
//           type: 'delete',
//           property,
//           oldValue: target._data[property],
//           timestamp: new Date()
//         })
        
//         return Reflect.deleteProperty(target._data, property)
//       }
//     })
//   }
  
//   // 添加验证器
//   addValidator(property, validator) {
//     this._validators[property] = validator
//   }
  
//   // 获取历史记录
//   getHistory() {
//     return [...this._history]
//   }
  
//   // 清空历史记录
//   clearHistory() {
//     this._history = []
//   }
// }

// // 使用示例
// const smartObj = new SmartObject({ name: 'Vue', version: 3 })

// // 添加验证器
// smartObj.addValidator('version', value => typeof value === 'number' && value > 0)
// smartObj.addValidator('name', value => typeof value === 'string' && value.length > 0)

// // 正常操作
// console.log(smartObj.name)      // Vue
// smartObj.version = 4            // 设置成功
// console.log(smartObj.version)   // 4

// // 验证失败
// try {
//   smartObj.version = -1         // Error: 验证失败: version = -1
// } catch (e) {
//   console.log(e.message)
// }

// // 查看历史记录
// console.log(smartObj.getHistory())
// // [
// //   { type: 'get', property: 'name', timestamp: ... },
// //   { type: 'set', property: 'version', oldValue: 3, newValue: 4, timestamp: ... },
// //   { type: 'get', property: 'version', timestamp: ... }
// // ]

// // 枚举属性
// console.log(Object.keys(smartObj))  // ['name', 'version']
// console.log('name' in smartObj)     // true
// console.log('_data' in smartObj)    // false (隐藏内部属性)
// 4. 性能考虑和最佳实践
// 4.1 性能对比

// const obj = { x: 1, y: 2 }
// const proxy = new Proxy(obj, {
//   get(target, prop) { return target[prop] },
//   set(target, prop, value) { target[prop] = value; return true }
// })

// console.time('直接访问')
// for (let i = 0; i < 1000000; i++) {
//   obj.x
// }
// console.timeEnd('直接访问')

// console.time('代理访问')
// for (let i = 0; i < 1000000; i++) {
//   proxy.x
// }
// console.timeEnd('代理访问')
// 4.2 最佳实践

// // ✅ 推荐：使用 Reflect API
// const goodProxy = new Proxy(target, {
//   get(target, prop, receiver) {
//     return Reflect.get(target, prop, receiver)
//   },
//   set(target, prop, value, receiver) {
//     return Reflect.set(target, prop, value, receiver)
//   }
// })

// // ❌ 不推荐：直接操作 target
// const badProxy = new Proxy(target, {
//   get(target, prop) {
//     return target[prop]  // 可能导致 this 绑定问题
//   },
//   set(target, prop, value) {
//     target[prop] = value
//     return true
//   }
// })
