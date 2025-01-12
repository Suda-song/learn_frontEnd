


# vue
1. vue的单项数据流
在 Vue.js 中，**单向数据流**是指组件之间的数据传递遵循的规则：**父组件只能通过 `props` 将数据传递给子组件，子组件不能直接修改从父组件接收到的 `props`**。数据流是单向的，从父组件流向子组件。
```js
<script  setup  lang="ts">
updateTitle(newTitle) { this.parentTitle = newTitle; }
</script>
<temple>
<ChildComponent :title="parentTitle" @update-title="updateTitle"/> //父组件的文档
</temple>
```
```js
<script  setup  lang="ts">

const  props = defineProps<{
modelValue: string;
containerStyle?: CSSProperties;
}>();
</script>
<temple>
<button @click="$emit('update-title', '新的标题')">更新标题</button>
<temple>
}; //子组件的文档
```
3. 

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTE5MDMyOTcxMywtMjEwMzIwOTc1M119
-->