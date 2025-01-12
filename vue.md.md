


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
 在 Vue 3 中，响应式机制由 `Proxy` 来取代 `Object.defineProperty`。
 `Proxy` 是 ES6 新增的一个特性，可以直接对整个对象进行代理，包括其所有的属性和方法。它能更加简洁和高效地实现数据劫持。
 响应式的核心思想是：当数据发生变化时，自动更新与之相关的视图。Vue 的响应式系统通过 **依赖收集** 和 **视图更新机制** 实现这一目标。
 
当我们访问响应式对象的某个属性时，`get` 被触发；当我们设置属性时，`set` 被触发。
-   **`get`**：拦截对对象的访问，收集依赖。
-   **`set`**：拦截对对象的修改，通知视图更新。
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
#### 2.3 依赖收集与更新

Vue 3 的响应式系统是基于 **发布-订阅模式**（Observer Pattern）实现的。当某个数据被访问时，它会将这个数据与当前的计算属性或视图组件关联起来（收集依赖）。当数据变化时，Vue 会通知依赖更新。

-   **`track`**：用于收集依赖，当属性被访问时调用，记录哪些组件或计算属性依赖于这个数据。
-   **`trigger`**：用于触发更新，当数据变化时调用，通知依赖更新。

### 2.4. **Vue 3 响应式系统的关键 API**
`reactive` 用来将普通对象转换为响应式对象。所有嵌套的对象也会变成响应式的。
#### 2.4.1 `reactive`
```JS
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  user: { name: 'Alice' }
});
```
#### 2.4.2 `ref`

`ref` 用于处理基本数据类型（如 `number`、`string` 等）的响应式。它会返回一个包含 `value` 属性的对象，你可以通过 `value` 来访问或修改该值。
```JS
import { ref } from 'vue';

const count = ref(0);
count.value = 10;

```
#### 2.4.3 `computed`

`computed` 用于创建计算属性，它基于响应式数据，当数据发生变化时，`computed` 会自动重新计算。
```JS
import { computed, ref } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

```
#### 2.4.4 `watch`
`watch` 用于观察响应式数据的变化，并在数据变化时执行回调。
```JS
import { watch, ref } from 'vue';

const count = ref(0);
watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`);
});

```
### 2.5. **性能优化**

Vue 3 在性能上做了很多优化，尤其是在响应式系统上，以下是一些优化：

-   **懒代理**：Vue 3 采用懒代理（Lazy Proxy）的方式，只有在访问某个属性时才会将该属性转换为响应式。这样避免了一开始就对所有嵌套属性进行代理。
-   **减少计算开销**：通过 `Proxy` 的设计，Vue 3 可以对整个对象进行代理，减少了 Vue 2 中对每个属性单独设置 `getter` 和 `setter` 的性能开销。
-   **批量更新**：Vue 3 的响应式系统支持批量更新，可以在同一事件循环中处理多个数据变化，避免多次渲染
  

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTExNzMzNjU2MDQsMjA0ODc4MTMyLDQxOD
gwNTA4MSwtNzY5NzM0MjUwLC0yMTAzMjA5NzUzXX0=
-->