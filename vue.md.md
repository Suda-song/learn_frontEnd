


# vue
1. vue的单项数据流
在 Vue.js 中，**单向数据流**是指组件之间的数据传递遵循的规则：**父组件只能通过 `props` 将数据传递给子组件，子组件不能直接修改从父组件接收到的 `props`**。数据流是单向的，从父组件流向子组件。
```js
//父组件文档
<script setup lang="ts">
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

// 定义响应式数据
const parentTitle = ref('初始标题');

// 定义更新方法
function updateTitle(newTitle: string) {
  parentTitle.value = newTitle;
}
</script>

<template>
  <div>
    <h1>父组件</h1>
    <p>当前标题: {{ parentTitle }}</p>
    <!-- 传递 props 和绑定事件 -->
    <ChildComponent :title="parentTitle" @update-title="updateTitle" />
  </div>
</template>

```
```js
//子组件文档
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// 定义 props
defineProps<{ title: string }>();

// 定义事件
const emit = defineEmits<{
  (event: 'update-title', newTitle: string): void;
}>();

// 示例触发事件的方法
function changeTitle() {
  emit('update-title', '新的标题');
}
</script>

<template>
  <div>
    <h2>子组件</h2>
    <p>接收到的标题: {{ title }}</p>
    <button @click="changeTitle">更新父组件标题</button>
  </div>
</template>

```
2. vue响应式的原理
 在 Vue 3 中，响应式机制由 `Proxy` 来取代 `Object.defineProperty`。`Proxy` 是 ES6 新增的一个特性，可以直接对整个对象进行代理，包括其所有的属性和方法。它能更加简洁和高效地实现数据劫持。
 ```js
 function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      track(target, key); // 追踪依赖
      return Reflect.get(...arguments); // 获取值
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(...arguments); // 设置值
      trigger(target, key); // 触发视图更新
      return result;
    }
  };
  return new Proxy(target, handler); // 创建并返回 Proxy 对象
}
```
  

<!--stackedit_data:
eyJoaXN0b3J5IjpbNDE4ODA1MDgxLC03Njk3MzQyNTAsLTIxMD
MyMDk3NTNdfQ==
-->