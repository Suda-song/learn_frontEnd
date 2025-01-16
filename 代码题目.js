
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
	n=arr.length
	for(i = 1 ;i<n ;i++ ){
		let current = arr[i]
		let j=i-1
		while(j>=0&&arr[j]>current){
			arr[j+1]= arr[j]
			j--
		}
		arr[j]=current
	}
	return arr
}

/** 希尔排序
 * @param {Object} arr
 */
function shellSort(arr) {
  for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < arr.length; i++) {
      let current = arr[i];
      let j = i - gap;
      while (j >= 0 && arr[j] > current) {
        arr[j + gap] = arr[j];
        j -= gap;
      }
      arr[j] = current;
    }
  }
  return arr;
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
