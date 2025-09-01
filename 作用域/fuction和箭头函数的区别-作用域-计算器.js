function cal(initialValue = 0){
    let state = initialValue
    function inc(arg){
        state =state+arg
    }
    function dec(arg){
        state=state+arg
    }

    function reset(val){
        state = val
    }
    return {
        inc,
        dec,
        reset,    
        get value(){
            return state
        }
    }
}

function cal2(initialValue = 0){
    let state = initialValue
    return {
        inc(arg){
            state+=arg
            return this
        },//等价于 inc:inc(){}
        dec(arg){
            state+=arg
            return this
        },
        get value(){
            return state
        }

    }
}

const cal = cal()

cal.inc()
dec(3)

// 位置	语法	原因
// 函数内部	必须用 function inc() {}	JavaScript 语法规则，函数内部只能用函数声明或函数表达式
// 对象内部	可以用 inc() {}	ES6 对象方法简写语法，专门为对象方法设计

// var和const/let区别
// 1. 作用域不同，let和const是块级作用域，var是函数级作用域，同时var可以变量提升，var允许重复声明；const：必须初始化
// ❌ 问题代码：使用 var
console.log("=== 使用 var 的问题 ===");
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log("var:", i); // 输出 3, 3, 3
    }, 100);
}

// ✅ 解决方案1：使用 let
console.log("=== 使用 let 解决 ===");
for (let j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log("let:", j); // 输出 0, 1, 2
    }, 200);
}

// ✅ 解决方案2：使用闭包
console.log("=== 使用闭包解决 ===");
for (var k = 0; k < 3; k++) {
    (function(index) {
        setTimeout(() => {
            console.log("closure:", index); // 输出 0, 1, 2
        }, 300);
    })(k);
}
//2. var：会成为全局对象的属性
var globalVar = "全局 var";
console.log(window.globalVar); // "全局 var" (浏览器中)
console.log(global.globalVar); // "全局 var" (Node.js 中)


// this 指向
let globalVar = 'global';
const obj = {
    name: 'Alice',
    
    outerMethod: function() {
        let outerVar = 'outer';
        console.log('外层方法 this:', this.name); // 'Alice' - 因为通过 obj.outerMethod() 调用
        
        function innerRegular() {
            // 这里的 this 不是继承自 outerMethod！
            console.log('普通函数 this:', this); // undefined 或 window
        }
        
        // 关键：看这里是怎么调用的
        innerRegular(); // 直接调用，没有通过对象调用！
    }
};

obj.outerMethod(); // outerMethod 通过 obj 调用，所以 this 指向 obj






// 普通函数和箭头函数的区别
// 1. 语法区别
// 普通函数
function add(a, b) {
    return a + b;
}

// 箭头函数
const add = (a, b) => {
    return a + b;
}

// 箭头函数简写
const add = (a, b) => a + b;  // 单行可省略 return 和 {}
const square = x => x * x;    // 单参数可省略括号
const greet = () => "Hello";  // 无参数需要括号
// 2. this绑定
const obj2 = {
    name: 'Alice',
    
    // 普通函数：this 指向调用者
    regularFunc: function() {
        console.log(this.name);  // 'Alice'
        
        setTimeout(function() {
            console.log(this.name);  // undefined (this指向window/global)
        }, 1000);
    },
    
    // 箭头函数：this 继承自外层作用域
    arrowFunc: () => {
        console.log(this.name);  // undefined (this继承自全局)
    },
    
    // 实际应用场景
    init: function() {
        console.log(this.name);  // 'Alice'
        
        // 箭头函数继承了 init 的 this
        setTimeout(() => {
            console.log(this.name);  // 'Alice'
        }, 1000);
    }
};

//3. augument
// 普通函数：有 arguments 对象
function normalFunc() {
    console.log(arguments);     // [1, 2, 3]
    console.log(arguments[0]);  // 1
}

// 箭头函数：没有 arguments 对象
const arrowFunc = () => {
    console.log(arguments);  // ❌ ReferenceError: arguments is not defined
}

// 箭头函数使用剩余参数
const arrowFunc2 = (...args) => {
    console.log(args);      // [1, 2, 3]
    console.log(args[0]);   // 1
}

normalFunc(1, 2, 3);
arrowFunc2(1, 2, 3);

// 4. 构造函数
// 普通函数：可以作为构造函数
function Person(name) {
    this.name = name;
}

const person1 = new Person('Alice');  // ✅ 正常工作

// 箭头函数：不能作为构造函数
const PersonArrow = (name) => {
    this.name = name;
}

const person2 = new PersonArrow('Bob');  // ❌ TypeError: PersonArrow is not a constructor

// 5. 提升
// // 普通函数：会被提升
console.log(regularFunc());  // ✅ "Hello" - 可以在定义前调用

function regularFunc() {
    return "Hello";
}

// 箭头函数：不会被提升
console.log(arrowFunc());  // ❌ ReferenceError: Cannot access 'arrowFunc' before initialization

// const arrowFunc = () => "Hello";
