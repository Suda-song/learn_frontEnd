


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
# 2. vue响应式的原理
 在 Vue 3 中，响应式机制由 `Proxy` 来取代 `Object.defineProperty`。
 `Proxy` 是 ES6 新增的一个特性，可以直接对整个对象进行代理，包括其所有的属性和方法。它能更加简洁和高效地实现数据劫持。
 响应式的核心思想是：当数据发生变化时，自动更新与之相关的视图。Vue 的响应式系统通过 **依赖收集** 和 **视图更新机制** 实现这一目标。
#### 2.2 拦截
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

-   **`track`**：用于收集依赖，在访问响应式数据时，Vue 会调用 `track` 方法，记录当前的订阅者。
-   **`trigger`**：用于触发更新，在修改响应式数据时，Vue 会调用 `trigger` 方法，通知所有相关订阅者。

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

# 3 vue双向绑定
**Vue 的双向绑定**是指数据和视图之间的双向流动，即数据的变化会自动反映到视图中，视图的变化也能反过来更新数据。这是 Vue 响应式系统的一个核心特性，通常用于表单输入元素与数据的绑定，比如文本框、复选框等。

Vue 使用 **数据劫持** 和 **发布-订阅模式**（通过 `getter` 和 `setter`）来实现这一特性。

具体实现使用的是v-model
```JS
<template>
  <input v-model="message" />
  <p>{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');
</script>
```
自定义
`CustomInput` 组件通过 `modelValue` 接收来自父组件的值，并通过 `@input` 事件将更新的值通过 `update:modelValue` 事件发送回父组件。
```ts
<!-- Parent.vue -->
<template>
  <CustomInput v-model: another="message" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomInput from './CustomInput.vue';

const message = ref<string>(''); // 指定类型为 string
</script>

//在父组件中，我们使用 `v-model` 绑定了 `message`，这个 `v-model` 会自动处理 `update:modelValue` 事件的监听。当子组件触发 `update:modelValue` 时，`message` 的值会自动更新。

<!-- CustomInput.vue -->
<template>
  <input :value="another" @input="updateValue" />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// 定义 props 类型
const props = defineProps<{
  modelValue: string;
}>();

// 定义 emits 类型
const emit = defineEmits<{
  (e: 'update:another', value: string): void; //父组件v-model=“message”的情况下这里只能用modelvalue这个值
}>();

function updateValue(event: Event): void {
  const newValue = (event.target as HTMLInputElement).value; // 类型断言
  emit('update:modelValue', newValue);
}
</script>
```

# 4 指令
-   `v-if`：条件渲染指令，根据表达式的真假来决定是否渲染元素。
-   `v-show`：条件显示指令，根据表达式的真假来决定元素的显示和隐藏。
-   `v-for`：列表渲染指令，用于根据数据源循环渲染元素列表。
-   `v-bind ：`：属性绑定指令，用于动态绑定元素属性到 `Vue` 实例的数据。
-   `v-on`@：事件绑定指令，用于监听 `DOM` 事件，并执行对应的 `Vue` 方法。
-   `v-model`：双向数据绑定指令，用于在表单元素和 `Vue` 实例的数据之间建立双向绑定关系。
-   `v-text`：文本插值指令，用于将数据插入到元素的文本内容中。
-   `v-html`：`HTML` 插值指令，用于将数据作为 `HTML` 解析并插入到元素中。

 provided 父组件中使用
 inject 子组件中获取
# 5 路由相关
## 5.1 路由守卫
**全局守卫**：

-   在应用的整个路由配置中生效，适用于所有路由跳转。
-   分为：`beforeEach`、`afterEach`
```js
router.beforeEach(async (to, from, next) => {
if (to.meta.requiresAuth) {
	const  userStore = useUserStore();
	await  userStore.init();
	const  appConfigStore = useAppConfigStore();
	await  appConfigStore.init();
}
next();
});
```
-   to 参数：

 类型为  RouteLocationNormalized
表示即将要进入的目标路由对象
包含诸如 path, name, params, query, meta 等路由信息

例如：当用户访问 /editor?id=123 时，to 对象会包含这些信息

-   from 参数：

 类型为 RouteLocationNormalized

表示当前即将离开的路由对象

结构与 to 相同，但包含当前路由的信息

例如：如果用户从首页跳转到编辑器，from 会包含首页的路由信息

-   next 参数：

类型为 NavigationGuardNext

这是一个函数，用于控制导航的行为

调用方式：

-   next() - 继续导航

-   next(false)  - 中断导航

-   next('/login') - 重定向到其他路由

-   next(error) - 导航失败并触发错误
## 5.2 路由独享守卫
针对某一个特定路由进行设置的守卫，它只能在该路由的跳转过程中使用。
- `beforeEnter`
 是在路由配置中定义的守卫，用来处理特定路由的跳转逻辑。
 ```js
 const router = new Router({
  routes: [
    {
      path: '/about',
      component: About,
      beforeEnter: (to, from, next) => {
        console.log('Before entering About page.');
        next();  // 必须调用 next() 来继续跳转
      }
    }
  ]
});
```

## 5.3 组件内守卫
`beforeRouterEnter`、`beforeRouterUpdate`、`beforeRouterLeave`
组件生命周期

-   **导航触发：** 当用户点击链接、调用 `router.push()` 或手动修改 URL 时，Vue Router 会开始执行导航过程。
-   **`beforeEach`**：全局的前置守卫，在导航开始时调用。
-   **`beforeEnter`**：路由独享守卫，在进入某个特定路由时调用。
-   **`beforeRouteEnter`**：组件内守卫，在组件加载前调用。
-   **`afterEach`**：全局的后置守卫，在导航完成后调用。
<!--stackedit_data:
eyJoaXN0b3J5IjpbOTg3MDE5MjYyLDEzMTExNzAyMDksLTQ2NT
UzMjUxLC01MjU5MjYwMjcsLTEyNzQ2Njc4ODIsMzQ0NDUxMDMy
LDgxNTYyMzk0NywyMDQ4NzgxMzIsNDE4ODA1MDgxLC03Njk3Mz
QyNTAsLTIxMDMyMDk3NTNdfQ==
-->