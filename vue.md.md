


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
3. 

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTc2OTczNDI1MCwtMjEwMzIwOTc1M119
-->