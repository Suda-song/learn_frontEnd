# 1. console.log(`The exits will be ${y}`); 

# 2. js中传递参数的方式：
## 2.1 callback
```js
import { CozeAPI, ChatEventType, COZE_COM_BASE_URL } from '@coze/api';

const client = new CozeAPI({
  token: 'your_token',
  baseURL: COZE_COM_BASE_URL,
});

const query = 'Hello';

// streamingChat 函数接受 callback 参数
async function streamingChat(callback) {
  const v = await client.chat.stream({
    bot_id: botId,
    auto_save_history: false,
    additional_messages: [
      {
        role: 'user',
        content: query,
        content_type: 'text',
      },
    ],
  });

  for await (const part of v) {
    if (part.event === ChatEventType.CONVERSATION_CHAT_CREATED) {
      console.log('[START]');
      callback && callback(part.data); // 使用回调
    } else if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
      process.stdout.write(part.data.content);
    } else if (part.event === ChatEventType.CONVERSATION_MESSAGE_COMPLETED) {
      const { role, type, content } = part.data;
      if (role === 'assistant' && type === 'answer') {
        process.stdout.write('\n');
      } else {
        console.log('[%s]:[%s]:%s', role, type, content);
      }
      callback && callback(part.data); // 使用回调
    } else if (part.event === ChatEventType.CONVERSATION_CHAT_COMPLETED) {
      console.log(part.data.usage);
      callback && callback(part.data); // 使用回调
    } else if (part.event === ChatEventType.DONE) {
      console.log(part.data);
      callback && callback(part.data); // 使用回调
    }
  }

  console.log('=== End of Streaming Chat ===');
}

// 调用 streamingChat 并传入不同的 callback 实例

const logMessage = (data) => {
  console.log("Message received:", data);
};

// 使用 `logMessage` 作为回调
streamingChat(logMessage);

```
## 2.2 使用参数传递
```js
function functionA(value) {
    // 处理某些逻辑
    return value * 2; // 返回一个值
}

function functionB(value) {
    console.log("Value from functionA:", value);
}

const result = functionA(5); // 调用 functionA，获取返回值
functionB(result); // 将返回值传递给 functionB
```
## 2.3 使用 promise
```js
function functionA() {
    return new Promise((resolve) => {
        const value = 15; // 计算出某个值
        resolve(value); // 返回这个值
    });
}

async function functionB() {
    const result = await functionA(); // 等待 functionA 完成并获取值
    console.log("Value from functionA:", result);
}

functionB(); // 调用 functionB
```

# 3. 异步操作
使用 async/await 结构时，可以通过 try/catch 语句轻松捕获和处理错误，这样可以使错误处理逻辑更加简洁和清晰：
```js
const sendMessage = async () => {
    try {
        const response = await client.chat.send({ message });
        console.log(response);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};
```

# 4.useEffect
useEffect有这两个主要参数：

第一个参数：回调函数，用于执行副作用（比如数据获取、订阅、或直接操作 DOM）。
第二个参数：依赖项数组，控制这个回调函数何时运行。
具体来说：

回调函数：这是你希望在特定条件下执行的代码。它可以包含数据请求、事件监听或本地存储交互等操作。

依赖项数组：指定回调函数应该在什么时候触发。如果你传入一个变量数组，比如 [count]，useEffect 就会在 count 变化时触发这个回调函数。

如果依赖项是空数组 []，则表示回调函数只会在组件 首次渲染后 执行一次。
如果省略依赖项数组，回调函数会在每次渲染后都执行（不推荐这样使用，可能导致性能问题）。
```js
useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

```
# 5. map
map 是 JavaScript 数组的一个内置方法。它会遍历数组中每个元素，并对每个元素执行给定的回调函数，返回一个新数组。回调函数默认接收三个参数：

当前元素（即 msg）。
当前元素的索引（即 index）。
被遍历的数组（不常用，主要用于特殊情况）。
```js
<div id="historyEnter">
    {messages.map((msg, index) => (
    <div key={index} className={`chat-record ${msg.role}`}>
     {msg.content}
    </div>
  ))}
</div>
```
写成函数方便运作，记得加return
```js
{messages.map((msg, index) => {
    if(msg.role === 'user'){
        return(
        <div key={index} className={`chat-record-${msg.role}`}>
    {msg.content}
        </div>)
    }else if(msg.role === 'assistant'){
        return(<div key={index} className={`chat-record-${msg.role}`}>
        {msg.content}
            </div>)
    }
    return null
})}
```
# 6. Promise 
主要作用之一就是允许调用异步函数时，调用它的代码可以 先继续执行其他任务，而不必等待异步操作完成。这是 异步编程 的核心思想。
构造函数
```js
const promise = new Promise((resolve, reject) => {
  // 执行异步操作
  
  // 如果操作成功
  resolve(value);  // Promise 状态变为 fulfilled
  
  // 如果操作失败
  reject(error);   // Promise 状态变为 rejected
});

```

```js
function fetchData() {
    setTimeout(() => {
        console.log("Data fetched!");
    }, 2000);  // 模拟延迟 2 秒
}

function main() {
    fetchData();  // 等待 fetchData 完成，但这个操作没有返回 Promise，所以会立即执行后面的代码
    console.log("This happens immediately, but we wait for fetchData.");
}

main();

可以改成
function fetchData() {
  return new promise(resolve =>{
    setTimeout(() => {
        console.log("Data fetched!");
        resolve();
    }, 2000);  // 模拟延迟 2 秒
    
  })
}
```

# 7. element ={<ChatWindow />}  来决定渲染哪个组件
```js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

// 对话列表
function ConversationList() {
  const conversations = [{ id: '1', name: 'Chat 1' }, { id: '2', name: 'Chat 2' }];
  const navigate = useNavigate(); //实现点击去往对应url的页面 ，navigate(-1)：返回到浏览历史中的上一页，相当于点击浏览器的“后退”按钮。navigate('/home', { replace: true })：跳转到 /home 页面，并且替换当前历史记录，这样用户点击浏览器的“后退”按钮时，不会回到原来页面。

  return (
    <div>
      {conversations.map((conv) => (
        <button key={conv.id} onClick={() => navigate(`/chat/${conv.id}`)}>
          {conv.name}
        </button>
      ))}
    </div>
  );
}

// 对话内容窗口
function ChatWindow() {
  const { conversationId } = useParams();//useParams()是获取id 他返回的是对象{112334}
  return <h2>Conversation ID: {conversationId}</h2>;
}

// 主应用
function App() {
  return (
    <Router>
      <ConversationList />
      <Routes>
        <Route path="/chat/:conversationId" element={<ChatWindow />} /> //path是用来给navigate定位的 同时:conversationId是用来动态占位的，只要所有以/chat都会链接到这里 
      </Routes>
    </Router>
  );
}

export default App;
```

# 8. call apply bind
call 和 apply：

当你需要立即执行函数，并且控制 this 的值以及传递给函数的参数时，使用 call 或 apply。
call 更适合函数的参数是独立的值，而 apply 更适合参数是数组。
bind：

当你需要创建一个新的函数，稍后执行，并且该函数要绑定特定的 this 和初始参数时，使用 bind。
```js
function greet(name) {
  console.log(`Hello, ${name}`);
}

// 1. 使用 call
greet.call(null, 'Alice');  // Hello, Alice

// 2. 使用 apply
greet.apply(null, ['Bob']);  // Hello, Bob

// 3. 使用 bind
const boundGreet = greet.bind(null, 'Charlie');
boundGreet();  // Hello, Charlie

```
```js
function greet() {
  console.log(this.name);
}
const person = { name: "Alice" };
greet.call(person); // 输出 "Alice"
```

# 9.深浅拷贝的区别就是，浅拷贝改变新数据的情况下原始数据也会改变
```js
const original = { a: 1, b: { c: 2 } };
const shallowCopy = { ...original };

// 修改 original.b.c
original.b.c = 3;

console.log(shallowCopy.b.c); // 输出 3
```
深拷贝无法处理函数
```js
const original = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(original));

deepCopy.b.c = 3;
console.log(original.b.c); // 输出 2，原对象未被修改

```

# 10. 箭头函数和普通函数区别
1. 省略了function
2. this的指向不一样
普通函数中，this 的值是调用时的上下文（调用者）。如果是对象的方法，this 会指向该对象；如果是直接调用函数，this 默认指向全局对象（在浏览器中是 window）
箭头函数没有自己的 this，它会继承定义时的上下文中的 this，也就是箭头函数外部的作用域中的 this。因此，箭头函数的 this 总是指向它所在的作用域，而不是调用它的地方。this.name 指的是这个函数自己的东西
```js
const obj = {
  name: 'Alice',
  greet: function() {
    setTimeout(() => {
      console.log(this.name); // 这里的 `this` 指向 `obj`，因为箭头函数继承了外部 `this`
    }, 1000);
  }
};
obj.greet(); // 输出 'Alice'
```

3. arguments 对象
普通函数拥有 arguments 对象，它包含了所有传递给函数的参数（即使没有显式声明参数）。而箭头函数没有 arguments 对象。
```js
function sum() {
  console.log(arguments); // arguments 是一个类数组对象，包含所有传入的参数
}
sum(1, 2, 3); // 输出: { '0': 1, '1': 2, '2': 3 }

const sum = (...args) => {
  console.log(args); // args 是一个数组，包含所有传入的参数
};
sum(1, 2, 3); // 输出: [1, 2, 3]
```

4. 箭头函数如果没有花括号，默认返回表达式的值，这样可以省略 return 关键字。

5. 普通函数可以作为构造函数使用，使用 new 关键字时会创建一个新实例。然而，箭头函数不能作为构造函数，试图使用 new 调用箭头函数会导致错误
```js
function Person(name) {
  this.name = name;
}
const person1 = new Person('Alice');
console.log(person1.name); // 输出 'Alice'

const Person = (name) => {
  this.name = name;
};
const person2 = new Person('Alice'); // TypeError: Person is not a constructor
```

# 11. 基本数据类型
Number：表示数字，包含整数和浮点数。
String：表示文本。
Boolean：表示 true 或 false。
Undefined：表示一个变量声明了但未赋值。
Null：表示一个空值或无值。
Symbol：表示一个唯一的、不可变的值。
BigInt：表示超大整数。
## 数据结构：
Map
键值对：每个 `Map` 由键（key）和值（value）组成。
-   `set(key, value)`：设置键值对。
-   `get(key)`：根据键获取对应的值。
-   `has(key)`：检查是否存在指定的键。
-   `delete(key)`：删除指定的键值对。
-   `clear()`：清空所有键值对。、

WeakMap
`WeakMap` 是一个类似 `Map` 的键值对集合，但它的键必须是 **对象**，并且与 `WeakMap` 相关联的对象是“弱引用”。这意味着，如果没有其他引用指向 `WeakMap` 中的对象，它们会被垃圾回收机制自动回收。
-   `set(key, value)`：设置键值对。
-   `get(key)`：根据键获取对应的值。
-   `has(key)`：检查是否存在指定的键。
-   `delete(key)`：删除指定的键值对。
```js
let obj = {};
let weakMap = new WeakMap();
weakMap.set(obj, 'value');
console.log(weakMap.get(obj)); // value
```
Set
`Set` 是一个集合，存储唯一的值。与数组不同，`Set` 不允许重复的元素。
-   `add(value)`：添加一个新的值。
-   `has(value)`：检查集合中是否存在该值。
-   `delete(value)`：删除指定的值。
-   `clear()`：清空集合。

WeakSet
`WeakSet` 类似于 `Set`，但是它只能存储 **对象** 且对对象是弱引用。这意味着如果 `WeakSet` 中的对象没有其他引用，它们会被垃圾回收机制自动回收。
-   `add(value)`：向 `WeakSet` 添加一个对象。
-   `has(value)`：检查 `WeakSet` 是否包含某个对象。
-   `delete(value)`：删除某个对象。



# 12. 信息传递
1. 通过createContext和useContext 来创建全局的变量，Provider提供数据，useContext消费数据,适用于多层级组件的通信，避免了 props 传递过多。
```js
import React, { createContext, useState, useContext } from 'react';

// 创建一个 Context
const MyContext = createContext();

function ParentComponent() {
  const [message, setMessage] = useState("Hello from Parent!");

  return (
    // 使用 Provider 提供数据
    <MyContext.Provider value={message}>
      <ChildComponent />
      <button onClick={() => setMessage("Updated message from Parent!")}>
        Update Message
      </button>
    </MyContext.Provider>
  );
}

function ChildComponent() {
  // 使用 useContext 获取数据
  const message = useContext(MyContext);

  return <h1>{message}</h1>;
}

export default ParentComponent;
```

2. 父子组件通信：通过 props 传递数据。
```js
function Parent() {
  const handleClick = () => {
    alert("Button clicked in Child!");
  };
  return <Child onClick={handleClick} />;
}

function Child({ onClick }) {
  return <button onClick={onClick}>Click Me</button>;
}

```
子组件给父组件传值
```js
function Parent() {
  const handleData = (data) => {
    console.log("Data from Child:", data);
  };

  return <Child sendData={handleData} />;
}

function Child({ sendData }) {
  const data = "Hi, Parent!";
  return <button onClick={() => sendData(data)}>Send Data</button>;
}
```
3. 兄弟组件通信：通过父组件共享状态来实现。
```js
function Parent() {
  const [message, setMessage] = React.useState("");

  return (
    <div>
      <ChildA sendMessage={(msg) => setMessage(msg)} />
      <ChildB message={message} />
    </div>
  );
}

function ChildA({ sendMessage }) {
  return <button onClick={() => sendMessage("Hello from ChildA!")}>Send Message</button>;
}

function ChildB({ message }) {
  return <div>Message from ChildA: {message}</div>;
}
```
Redux：适用于全局状态管理，多个组件共享状态。
自定义 Hook：提取和共享逻辑。

# 13. 生命周期
1. 类组件生命周期
在 React 16.3 版本之前，类组件的生命周期方法分为三个主要阶段：
挂载阶段：组件被创建并插入到 DOM 中。
更新阶段：组件接收到新的 props 或者 state。
卸载阶段：组件从 DOM 中移除。
2. 函数组件
useEffect 用于处理副作用，类似于 componentDidMount 和 componentDidUpdate
useState 用于状态管理
useLayoutEffect 用于同步 DOM 操作

# 14. 跨域
同源策略要求，只有当两个页面属于同一个协议、域名和端口时，才能互相访问。
CORS 配置：确保后端 API 服务器在响应头中允许跨域访问。例如，Node.js Express 后端可以设置 CORS 头部来解决跨域问题：
```js 后端
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());  // 允许所有域的跨域请求

app.post('/register', (req, res) => {
  // 处理注册逻辑
});

app.listen(5000, () => console.log('Server is running on port 5000'));
```
```js 前端
const registerUser = async (userData) => {
  const response = await fetch('http://localhost:5000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const result = await response.json();
  console.log(result);
};
```
开发和生产环境的跨域问题
在开发环境中，前端和后端的服务器通常是在不同的端口运行（例如前端 localhost:3000，后端 localhost:5000）。在生产环境中，前端和后端通常会部署在同一域下，但仍有可能遇到跨域问题，特别是如果你使用了 CDN 或第三方 API 服务时。
在 webpack的 package.json 文件中配置代理
```js
{
  "proxy": "http://localhost:5000"
}
```

jsonp方式实现的跨域
客户端代码
```JS
function fetchWeatherData() {
  // 创建回调函数
  window.handleWeatherData = function (data) {
    console.log('Weather Data:', data);
  };

  // 动态创建 <script> 标签
  const script = document.createElement('script');
  script.src = `https://example.com/weather?callback=handleWeatherData`;
  document.body.appendChild(script);
}

// 调用函数，发起 JSONP 请求
fetchWeatherData();
```

# 15. 正则表达式

- `.` 匹配任意单个字符，除换行符。
- `\d` 匹配数字（0-9）。
- `\w` 匹配任意字母、数字或下划线。
- `\s` 匹配空格字符，包括空格、制表符、换页符等。
- `\b` 匹配单词边界。
- `^` 匹配字符串的开头。
- `$` 匹配字符串的结尾。

**修饰符：**
- `g` 全局搜索
- `i` 不区分大小写
- `m` 多行匹配

示例代码：

```js
const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const text = "Contact us at support@example.com or admin@domain.org";
const emails = text.match(regex);
console.log(emails); // ["support@example.com", "admin@domain.org"]
```

# 16 localstorage session sessionstorage  cookie
![alt text](image.png)

# 17.语义化

<header>：定义网页头部，通常包含网站的 logo、导航栏或页面标题。
<footer>：定义网页页脚，通常包含版权声明、联系信息或网站底部导航等。
<article>：表示独立的内容块，如博客文章、新闻文章、论坛帖子等。
<section>：表示网页中的一个区块，用于将页面内容分成不同部分。
<nav>：定义导航链接区块。
<aside>：表示和主内容稍微不相关的内容，通常用于侧边栏或额外的说明内容。
<main>：标识文档的主要内容部分，通常是唯一的，用于包裹页面的主体部分。

# 18. 高阶函数

高阶函数（Higher-order function，简称 HOF）是指至少满足以下两个条件之一的函数：接受一个或多个函数作为参数、返回一个函数
1. 函数式编程（Functional Programming）
```js
const numbers = [1, 2, 3, 4];
const squaredNumbers = numbers.map(num => num * num);
console.log(squaredNumbers); // [1, 4, 9, 16]
```
在函数式编程中，我们使用了 .map() 方法，它是一个内置的高阶函数，不会修改原始数组，而是返回一个新数组。map() 是一个纯函数，它接受一个函数并返回一个新的数组，原始数据保持不变。

2. 事件处理和回调函数：
在 React 中，事件处理通常是通过高阶函数来实现的。例如，React 的 setState 方法可以接受一个函数作为参数，从而更新状态值。这个函数是一个回调函数，接收当前状态并返回新的状态。

```js
const [count, setCount] = useState(0);

const increment = () => {
  setCount(prevCount => prevCount + 1);  // 这里的 `prevCount => prevCount + 1` 是一个高阶函数
};
```

3. 自定义 Hook 是 React 中实现可重用逻辑的一种方式，它本质上是高阶函数。自定义 Hook 接受参数并返回新的函数或值。这是一个典型的高阶函数模式，可以让我们封装共享的逻辑，方便跨组件复用。
```js
import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// 使用自定义 Hook
function App() {
  const [name, setName] = useLocalStorage('name', 'Alice');

  return (
    <div>
      <h1>{name}</h1>
      <button onClick={() => setName('Bob')}>Change Name</button>
    </div>
  );
}
```
# 19. 闭包
当一个内部函数在定义时访问了外部函数的变量，并在外部函数执行后仍然能够引用这些变量时，就形成了闭包
```js
function Counter() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1); // 使用了闭包，访问外部的 `count`
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}
```
当使用 setTimeout 或异步操作时，闭包可能会导致捕获的变量值不符合预期。
```js
function Timer() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // 捕获了初始的 `count` 值（可能是 0）
    }, 1000);

    return () => clearInterval(timer);
  }, []); // 依赖为空，闭包会导致 `count` 不更新
}
```
修改
```js
React.useEffect(() => {
  const timer = setInterval(() => {
    setCount((prevCount) => prevCount + 1); // 使用函数式更新
  }, 1000);

  return () => clearInterval(timer);
}, []); 
```
父子传递参数
```js
function Parent() {
  const [value, setValue] = React.useState('Hello');

  const handleChildClick = () => {
    console.log(value); // 闭包访问父组件的 `value`
  };

  return <Child onClick={handleChildClick} />;
}

function Child({ onClick }) {
  return <button onClick={onClick}>Click Me</button>;
}
```
# 20.代码分割
代码分割通过将应用程序拆分为多个较小的代码块（chunks），只加载当前所需的部分，而非一次性加载整个应用。常用场景包括：
按路由分割：不同页面只加载相关代码。
按组件分割：较大的组件在需要时加载。
按功能模块分割：加载特定功能所需的资源。
1.动态引入 (Dynamic Import)
使用 JavaScript 的 import() 函数动态加载模块，而不是静态引入。React 提供了 React.lazy 和 Suspense 来支持动态引入。
```js
import React, { Suspense } from 'react';

// 使用 React.lazy 动态加载组件
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```
React.lazy：返回一个动态加载的 React 组件。
Suspense：定义加载状态时显示的内容（如加载指示器）。

2.路由级别代码分割
使用路由库（如 react-router-dom）结合动态加载，为每个页面生成单独的代码块。
Home 和 About 页面会被单独打包，只有在用户访问对应路由时才加载相关代码。

```js
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```
3. 按需加载库 (Library)
```js
import React, { useState } from 'react';

function App() {
  const [moment, setMoment] = useState(null);

  const loadMoment = async () => {
    const momentModule = await import('moment'); // 动态加载
    setMoment(momentModule);
  };

  return (
    <div>
      <button onClick={loadMoment}>Load Moment.js</button>
      {moment && <div>{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>}
    </div>
  );
}
```

ps:Webpack 会自动将 import() 生成的动态模块分割成单独的代码块。
```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all', // 自动分割所有模块
    },
  },
};
```
# 21.深拷贝
可以直接
```js
const original = { a: 1, b: { c: 2 } }
const copy = JSON.parse(JSON.stringify(original))
```
或者递归复制
```js
function deepCopy(obj){
  if(obj === null || typeof obj !== 'object'){ //这个返回value
    return obj
  }
  const copy = Array.isArray(obj)? []:{}
  for (const key in obj){
    if (obj.hasOwnProperty(key)){
      copy[key] = deepCopy(key) 
    }
  }
  return copy
const original = { a: 1, b: { c: 2 } };
const copy = deepCopy(original);
}
```
# 22. defer
defer	
加载方式	异步加载	
执行顺序	按 HTML 中的顺序执行	
HTML 解析	HTML 解析完成后执行脚本
典型用途	依赖其他脚本或需要 DOM 的脚本	
async
加载方式 异步加载
执行顺序 加载完成后立即执行（无顺序保证）
HTML 解析 	脚本加载完成后立即中断 HTML 解析
典型用途 独立脚本或无需依赖其他脚本的功能
```html
<!-- defer -->
<script src="a.js" defer></script>
<script src="b.js" defer></script>
<!-- 按顺序执行：先 a.js 后 b.js -->

<!-- async -->
<script src="a.js" async></script>
<script src="b.js" async></script>
<!-- 执行顺序不保证，取决于加载完成的先后 -->
```

# 23 循环
1. for
2. while
3. do...while 
与 while 循环类似，但它在执行前不会先判断条件，而是至少执行一次代码块，然后才检查条件。
```js
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);
```
4. for...in 
用于遍历对象的属性或数组的索引。它返回对象的可枚举属性或数组的索引。
```js
const obj = {a: 1, b: 2, c: 3};
for (let key in obj) {
  console.log(key, obj[key]);
}
```
5. for...of 
循环用于遍历可迭代对象（如数组、字符串、Set、Map 等）的元素。它直接返回元素，而不是索引。
```js
const arr = [1, 2, 3, 4, 5];
for (let value of arr) {
  console.log(value);
}
```
6. forEach 是数组的一个方法，
用于遍历数组的每个元素。与 for 循环不同，forEach 无法提前退出（如使用 break 或 return）
```js
const arr = [1, 2, 3, 4, 5];
arr.forEach((value, index) => {
  console.log(value, index);
});
```
7. map 和 filter（数组方法）
虽然 map 和 filter 不属于传统意义上的循环语句，但它们也用于遍历数组，并生成新的数组。
```js
const arr = [1, 2, 3];
const doubled = arr.map(x => x * 2);
console.log(doubled); // [2, 4, 6]

const arr = [1, 2, 3, 4, 5];
const even = arr.filter(x => x % 2 === 0);
console.log(even); // [2, 4]
```
map：创建一个新数组，数组的每个元素是通过提供的函数处理过的值。
filter：创建一个新数组，包含通过提供的函数条件测试的所有元素。

# 24 代码分割
代码分割通过将应用程序拆分为多个较小的代码块（chunks），只加载当前所需的部分，而非一次性加载整个应用。常用场景包括：

按路由分割：不同页面只加载相关代码。
按组件分割：较大的组件在需要时加载。
按功能模块分割：加载特定功能所需的资源。
1. 动态引入 (Dynamic Import)
React.lazy：返回一个动态加载的 React 组件。
Suspense：定义加载状态时显示的内容（如加载指示器）
```js
import React, { Suspense } from 'react';

// 使用 React.lazy 动态加载组件
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```
2. 路由级别代码分割
```js
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

3. 第三方库按需加载
```js
import React, { useState } from 'react';

function App() {
  const [moment, setMoment] = useState(null);

  const loadMoment = async () => {
    const momentModule = await import('moment'); // 动态加载
    setMoment(momentModule);
  };

  return (
    <div>
      <button onClick={loadMoment}>Load Moment.js</button>
      {moment && <div>{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>}
    </div>
  );
}
```

# 25 节流
函数在 n 秒内只执行一次，如果 n 秒内多次触发，则忽略执行
```js
//闭包
function throttle(fn,wait) {
const startTime = Date().now
return function(){
	const nowTime = Date().now
	if(nowTime - startTime >= wait){
		startTime = nowTime
		return fn.apply(this,arguments) 
		}
	}
}
```
# 26 防抖
```js
f
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzk0Njc2MDU0LC01OTA1MDY0NzNdfQ==
-->