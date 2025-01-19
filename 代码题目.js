
/** add(1)(2)(3)
 * @param {*} 
 * @return {*} 
 */ 
function add (num){
	let sum =num
	function inner(nextNum){
		if(nextNum === undefined){ return sum}
		sum = sum+num
		return inner
	}
	
	inner.toString = function(){
		return sum
	}
	return inner
}
/** 节流
 * @param {*} fn
 * @param {*} wait
 * @return {*} 
 */
function throttle(fn,wait){
	const startTime = Date.now()
	return function (){
		const nowTime = Date.now()
		if (nowTime - startTime >= wait){
			startTime = nowTime
			return fn.apply(this,arguments)
		}
	}
}
/** 防抖
 * @param {*} fn
 * @param {*} wait
 * @param {*} immediate=false
 * @return {*} 
 */
function debounce(fn,wait,immediate = false){
	let timer = null
	return function(){
		if (timer){
			clearInterval(timer)
			timer = null
		}
		if (immediate){
			const flag = !timer
			flag&&fn.apply(this,arguments)
			timer=setTimeout(timer=null,wait)
		}else{
			timer=setTimeout(()=>{fn.apply(this,arguments)},wait)
		}
	}
}

//add(1)(2)(3)
function add(num) {
	let sum = num
	return function inner(nextNum){
		if (nextNum === undefined){return sum}
		sum += nextNum
		return inner
	}
	inner.toString = function(){
		return sum
	}		
	return inner
}

/** 浅拷贝
 * @param {*} obj
 * @return {*} 
 */
function shollowCopy(obj){
	if (!obj || typeof obj !== "object")
		return obj
	const newobj = Array.isArray(obj)?[]:{}
	for(const key in obj){
		if(newobj.hasownProPerty(key))
			newobj[key] = obj[key]
	}
	return newobj
}

/** 深拷贝
 * @param {*} obj
 * @param {*} [map=new Map()]
 * @return {*} 
 */
function deepCopy(obj, map = new Map()) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    
    if (map.has(obj)) {
        return map.get(obj);
    }

    const newobj = Array.isArray(obj) ? [] : {};

    map.set(obj, newobj);

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {  // 注意这里的大小写
            newobj[key] = (typeof obj[key] === 'object' && obj[key] !== null) 
                ? deepCopy(obj[key], map) 
                : obj[key];
        }
    }

    return newobj;
}

/** 手写 new 操作符
 * @param {Function} fn 构造函数
 * @return {*}
 */
function myNew(fn, ...arg) {
    if (typeof fn !== 'function') {
        throw new TypeError('it is not a function');
    }

    let obj = {};
    obj.__proto__ = fn.prototype;  // 设置原型链

    const result = fn.apply(obj, arg);  // 使用 obj 作为 this 调用构造函数

    // 如果构造函数返回一个对象，则返回该对象，否则返回新创建的 obj
    return result instanceof Object ? result : obj;
}

/** 手写 instanceof 方法
 * 用法：instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
 * @param {Object} obj 需要判断的数据
 * @param {Object} constructor
 * @return {*}
 */
function myInstanceof(obj, type) {
    let myPrototype = Object.getPrototypeOf(obj);
    
    // 循环遍历原型链
    while (myPrototype) {
        if (myPrototype === type.prototype) {
            return true;  // 找到原型链匹配
        }
        myPrototype = Object.getPrototypeOf(myPrototype);  // 移动到上一级原型
    }
    
    return false;  // 如果没有匹配的原型链，返回 false
}
/** 冒泡排序
 * @param {Object} arr
 */
function bubbleSort(arr){
	const n = arr.length
	for(let i =0,i<n,i++)
		for(let j =0 ,j<n-i-1,j++){
			if (arr[j]>arr[j+1]){
				[arr[j],a[j+1]]=[a[j+1],a[j]]
			}

		}
	return arr
}

/** 选择排序
 * @param {Object} arr
 */
function selectionSort(arr){
	const n = arr.length

	for(let i =0;i<n;i++){
		let minindex = i
		for(let j = i+1 ;j<n;j++){
			if(arr[minindex]>arr[j])
				minindex = j
		}
		[arr[i],arr[minindex]]=[arr[minindex],arr[i]]
	}
	return arr
}

/** 插入排序
 * @param {Object} arr
 */
function insertSort(arr){
	n= arr.length
	for(i=1;i<n;i++){
		let current = arr[i]
		let j= i-1;
		while(j>=0&&arr[j]>current){
			arr[j+1] = arr[j]
			j--
		}
		arr[j+1]=current
	}
	return arr
}

/** 希尔排序
 * @param {Object} arr
 */
function shellSort(arr) {
	let n =arr.length
	for(let gap = Math.floor(n/2);gap>0;gap=Math.floor(gap/2))
		for(let i = gap; i<n;i++){
			let current = arr[i]
			let j = i-gap
			while(j>=0&&arr[j]>current){
				arr[j+gap] = arr[j]
				j-=gap
			}
			arr[j+gap] = current
		}
		return arr
}

/** 归并排序
 * @param {Object} arr
 */
function mergeSort(arr){
	n = arr.length
	if(n<=1)
		return arr
	const middle = Math.floor(n/2)
	const left = arr.slice(0,middle)
	const right = arr.slice(middle)
	return merge(mergeSort(left),mergeSort(right))
}
function merge(left,right){
	let result = []
	let leftIndex = 0
	let rightIndex = 0
	while(leftIndex<left.length&&rightIndex<=right.length){
		if(left[leftIndex]<right[rightIndex]){
			result.push(left[leftIndex])
			leftIndex++
		}else{
			result.push(right[rightIndex])
			rightIndex++
		}
	}
	return result.concat(left.slice(leftIndex)).concat(right(rightIndex))
}
/** 快速排序
 * @param {Object} arr
 */
function quickSort(arr){
	if(arr.length<=1)
		return arr 
	const pivot = arr[0]
	const left =[]
	const right = []
	for(let i=1; i<arr.length;i++){
		if(arr[i]<=pivot){
			left.push(arr[i])
		}else {
			right.push(arr[i])
		}
	}
	return quickSort(left).concat(pivot,quickSort(right))
}

/** 快速排序
 * @param {Object} arr
 * @param {number} n
 * @param {number} i 堆顶
 */
function heapSort(arr){
	let n = arr.length
	for(let i = Math.floor(n/2)-1;i>=0;i--){
		heapify(arr,n,i)
	}
	for(let i =n-1;i>0,i--){
		[arr[0],arr[i]] = [arr[i],arr[0]]
		heapify(arr,n,0)
	}
	return arr
}
function heapify(arr,n,i){
	const largest = i
	const left=2*i+1
	const right = 2*i+2
	if(left<n&&arr[left]>arr[largest])
		largest = left
	if(right<n&&arr[right]>arr[largest])
		largest = right
	if(largest!==i){
		[arr[i],arr[largest]]=[arr[largest],arr[i]]
		heapify(arr,n,largest)
	}
}

/** 基数排序
 * @param {Object} arr
 */
function radixSort(arr){
	const maxdigit = getmaxdigit(arr)
	for(let digit = 0;digit<maxdigit;digit++){
		const bucketList = Array.from({length:10},()=>{})
		for(let i =0;i<arr.length;i++){
			const digitValue =getDigitValue(arr[i],digit)
			bucketList[digitValue].push(arr[i])
		}
		arr.bucketList.flat()
	}
	return arr
}

function getmaxdigit(arr){
	let max = 0
	for(let i =0 ;i<arr.length;i++)
		max = Math.max(max,arr[i].toString().length)
	return max
}

function getDigitValue(num,digit){
	return Math.floor(Math.abs(num)/Math.pow(10,digit))%10
}

/** 函数柯里化
 * 用法：函数柯里化是一种将接受多个参数的函数转换为接受一系列单一参数的函数的技术
 * 思路：
 *  1、使用 fn.length 获取函数的形参数量
 *  2、如果没有传入初始参数数组 则将其初始化为空数组 在递归的时候会接受上一次的形参
 *  3、返回一个闭包函数 接受函数的实参 将 args 中的形参和当前的形参进行合并 得到 newArgs
 *  4、如果新的参数数组 newArgs 长度大于等于 length 函数的形参数量 调用 apply 执行函数 传入 newArgs
 *  5、如果新的参数数组长度小于函数的形参数量 则再次调用 curry 函数 将新的参数数组作为初始参数传入 返回一个新的闭包函数
 * @param {*} fn
 * @param {*} args
 * @return {*} 
 */

function curry(fn,args){
	const length = fn.length
	args=args||[]
	return function(){
		const newArgs=[...args,...arguments]
		if(newArgs.length>=length){
			return fn.apply(this,newArgs)
		}else{
			return curry(fn,newArgs)
		}
	}
}

/** promise
 * 构造函数：定义 state 和 value，管理 pending、fulfilled 和 rejected 状态。
 * then 方法：注册成功和失败的回调函数，并支持链式调用。
 * catch 方法：处理错误。
 * resolve 和 reject 静态方法：返回成功或失败的 Promise。
 * resolvePromise：确保返回值符合 Promise 的规范。
 */
class myPromise{
	constructor(executor){
		this.state = 'pending' //初始状态
		this.value = undefined
		this.reason = undefined
		this.onFulfillCallbacks = []
		this.onRejectedCallbacks = []

		const resolve = (value) => {
			this.state = 'fulfilled'
			this.value = 'value'
			this.onFulfillCallbacks.forEach(fn=>fn(value))
		}
		const reject = (reason) => {
			this.state = 'rejected'
			this.reason = reason
			this.onRejectedCallbacks.forEach(fn=>fn(reason))
		}

		try{
			executor(resolve,reject)
		}catch(err){
			reject(err)
		}
	}
	then(onFulfilled,onRejected){

		return new myPromise((resolve,reject)=>{
			onFulfilled = typeof onFulfilled === 'function'? onFulfilled:(value)=>value
			onRejected = typeof onRejected === 'function'?onRejected:(reason)=>{throw reason}
			if(this.state === 'fulfilled'){
				setTimeout(()=>{
					try{
						const x = onFulfilled(this.value)
						resolvePromise(x,resolve,reject)
					}catch(err){
						reject(err)
					}
				},0) //setTimeout 将 onFulfilled(this.value) 的调用推入任务队列。即使我们设置了 0 延迟，它也会在当前栈中的其他代码执行完毕之后才被调用。
			}
			if(this.state === 'rejected'){
				setTimeout(()=>{
					try{
						const x = onRejected(this.value)
						resolvePromise(x, resolve,reject)
					}catch(err){
						reject(err)
					}
				},0)	
			}
			if(this.state === 'pending'){
				this.onFulfillCallbacks.push(()=>{
					setTimeout(()=>{
						try{
							const x = onFulfilled(this.value)
							resolvePromise(x,resolve,reject)
						}catch(err){
							reject(err)
						}
						},0)
				})
				this.onRejectedCallbacks.push(()=>{
					setTimeout(()=>{
						try{
							const x = onRejected(this.value)
							resolvePromise(x, resolve,reject)
						}catch(err){
							reject(err)
						}
					},0)						
				})	
			}
		})
	}

	catch(onRejected){
		return this.return(null,onRejected)
	}
	static resolve(value){
		return new myPromise((resolve)=>resolve(value))
	}
	static reject(reason){
		return new myPromise((_,reject)=>reject(reason))
	} 
	function resolvePromise(x,resolve,reject){
		if(x instanceof myPromise){
			x.then(resolve,reject)
		}else{
			resolve(x)
		}
	}
}
/** 手写 call
 * 用法：call 方法用于调用一个函数，并指定函数内部 this 的指向，传入一个对象
 * const funcSymbol = Symbol('func');：
 * Symbol('func') 创建了一个唯一的符号值，作为 greet 函数的临时属性名。因为 Symbol 是唯一的，即使 context 对象已经有一个属性叫 'func'，也不会发生冲突。
 * context[funcSymbol] = this;：
 * 我们将 greet 函数（即 this）添加到 context 对象上，使用唯一的 funcSymbol 作为属性名，避免了与 context 中已有的属性产生冲突。
 * delete context[funcSymbol];：
 * 执行完函数后，删除临时添加的 funcSymbol 属性，确保 context 对象不会被污染。
 */

const person = {
  name: 'Alice',
  greet: function(age, city) {
    console.log(`Hi, I'm ${this.name}. I'm ${age} years old and I live in ${city}.`);
  }
};

Function.prototype.myCall = function(context, ...args) {
	const funcSymbol = Symbol('func')
	context[funcSymbol] = this
	const result = context[funcSymbol](...args)
	delete context[funcSymbol]
	return result
}

// 在 greet 上调用 myCall
const context = {greet : 'Bob' }
person.greet.myCall(context, 30, 'New York');

/** 手写 apply
 */
Function.prototype.myApply= function(context,args){
	const fn = Symbol('func')
	context[fn] = this
	const result = context[fn](...args)
	delete context[fn]
	return result
}

/** 订阅发布
 * 订阅相当于把某个事件触发的函数放进队列里
 * 发布相当于触发队列里的事件
 */
class eventEmit{
	constructor(){
		this.events = {}
	}
	subscribe(event,callback){
		if(! this.events[event])
			this.events[event]=[]
		this.events[event].push(callback)
	}
	publish(event,data){
		if(this.events[event]){
			this.events[event].forEach(callback=>callback(data))
		}
	}
	unsubscribe(event,callback){
		if(this.events[event])
			this.events[event]=this.events[event].filter(cb=>cb!==callback)
	}
}
