合并
```js
let res = [...coordinates] //将字符串拆分形成数组
['a', 'c', 'e', 'g'].includes(res[0]) //判断res中有没有acef
+res[1]%2 === 1 //%取余数，+可以把字符串转换为数字
```
闭包
```js
/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function (init) {
    let count = init;
    return {
        increment: () => count += 1,
        reset: () => count = init,
        decrement: () => count -= 1,
    }
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */
```