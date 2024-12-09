# 1.布局方式：display: flex
```html
<div class="container">
    <div class="left">
        左侧内容
    </div>
    <div class="right">
        右侧内容
    </div>
</div>
```
```css
.container {
    display: flex;
    height: 100vh; /* 设置全屏高度，视需求而定 */
    display: flex;                /* 启用Flexbox 布局 */
    flex-direction: column;      /* 设置主轴为纵向 */
    height: 100vh;              /* 设置容器高度为视口高度 */
    justify-content: space-between; /* 在主轴上均匀分布子元素 */
    align-items: center;         /* 在交叉轴上居中对齐 */
    background-color: #f0f0f0;  /* 背景色 */
}

.left {
    flex: 1; /* 左侧部分占据可用空间的 1 倍 */
    background-color: #f0f0f0; /* 设置左侧背景色 */
    padding: 20px;
}

.right {
    flex: 1; /* 右侧部分占据可用空间的 1 倍 */
    background-color: #ffffff; /* 设置右侧背景色 */
    padding: 20px;
}

```

# 2. 边框
Content（内容）：元素的实际内容区域，比如文字、图片等。
Padding（内边距）：在内容和边框之间的间隔，将内容推离边框。padding 不会影响元素的实际位置，但会让内容与边框之间保持距离。
Border（边框）：围绕内容和 padding 的一层边框，可以设定宽度、颜色和样式（如实线、虚线）。
Margin（外边距）：在边框之外的空间，用于将当前元素与周围其他元素隔开。

# 3.靠左靠右
写在父元素里和flex写在一起子元素整体靠右 
```css
display: flex;
justify-content: flex-end; 
```
父元素设置flex，写在子元素里靠右，
```css
margin-left: auto;
```
子元素靠左
```css
margin-right: auto;
```

# 3. css3 新特性
3.1 选择器扩展：
CSS3 增加了许多新的选择器，比如属性选择器 [attribute=value]、结构伪类选择器 :nth-child()、:not() 伪类等，选择元素更灵活。
边框和背景：
3.2 圆角（border-radius）：实现圆角效果，适合按钮和框的圆角设计。
背景图片多层叠加：使用 background-image 可以叠加多层背景图。背景裁剪（background-clip） 和 背景原点（background-origin）：控制背景图片的显示区域。
3.3 线性渐变（linear-gradient） 和 径向渐变（radial-gradient）：实现颜色渐变效果，适用于按钮、背景等场景。
阴影效果：
3.4 文本阴影（text-shadow） 和 盒阴影（box-shadow）：可以为文本和盒子增加阴影效果，使页面更具层次感。
3.5 2D 变换：支持 translate、rotate、scale、skew 等，让元素在平面上移动、旋转、缩放和倾斜。
3.6 3D 变换：支持 rotateX、rotateY 等，可以实现三维空间中的旋转、缩放效果。
3.7 过渡（Transition）：使用 transition 可以设置元素的属性变化过渡效果，比如渐变的透明度、背景色、大小等。
3.8 动画（Animation）：使用 @keyframes 定义动画，并通过 animation 属性调用，可以实现复杂的自定义动画效果。
3.9 弹性盒模型（Flexbox）：提供了一种灵活的布局方式，可以轻松控制元素的对齐、顺序和方向，适合创建响应式布局。
3.10 网格布局（Grid Layout）：CSS Grid 布局是二维布局系统，能够在水平和垂直方向上排列元素，适合复杂的页面布局。
3.11 媒体查询（Media Queries）：支持响应式设计，根据设备的宽度、高度、分辨率等条件应用不同的样式，适合在移动设备和桌面设备上显示不同的布局。

# 4. 双飞翼布局
双飞翼布局是一种经典的网页布局方式，常用于实现页面的三栏结构：左右两侧为侧边栏，中间为主内容区。双飞翼布局的关键是保持中间主栏的内容优先渲染，并且两侧栏的宽度固定或自适应。
怎么确保优先加载：
1.将主内容写在 HTML 结构的最前面
2.可以延迟加载侧边栏中的图片、视频、广告等资源，以减少首次加载的资源量。这样可以通过以下方法实现：使用 loading="lazy" 属性懒加载图片和 iframe
3.内联一些css，通常指将样式、脚本或元素直接嵌入到 HTML 代码中，而不是以外部文件的形式引用。内联代码的主要目的是减少请求数量，使浏览器能够更快速地加载网页中的关键内容。

```css
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>双飞翼布局</title>
  <style>
    /* 公共样式 */
    * {
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      display: flex;
    }
    .main {
      flex: 1;
      background-color: #f0f0f0;
      padding: 0 200px; /* 给主内容区两侧预留侧边栏宽度 */
    }
    .sidebar-left,
    .sidebar-right {
      width: 200px;
      position: relative;
    }
    .sidebar-left {
      background-color: #ffd700;
      left: -100%;
    }
    .sidebar-right {
      background-color: #87ceeb;
      right: -100%;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="main">
      <p>这是主内容区。</p>
    </div>
    <div class="sidebar-left">
      <p>这是左侧栏。</p>
    </div>
    <div class="sidebar-right">
      <p>这是右侧栏。</p>
    </div>
  </div>
</body>
</html>
```
# 5. 清楚浮动
在 CSS 中，清除浮动（clear float）是一种常用的技巧，主要用于解决 父元素未能包含子元素的高度 问题。浮动（float）元素会从正常的文档流中脱离，可能导致父元素的高度坍塌，因此需要通过清除浮动让父元素正确包含子元素。
```css
<div class="container">
  <div class="box" style="float: left; width: 100px; height: 100px; background: red;"></div>
  <div class="box" style="float: left; width: 100px; height: 100px; background: blue;"></div>
</div>

.container::after {
  content: "";
  display: block;
  clear: both;
}


```

# 6.CSS 响应式设计（Responsive Design）
指通过 CSS 技术实现网页能够根据不同设备（如手机、平板、桌面电脑）屏幕尺寸、分辨率的变化，自动调整布局和样式，以提升用户体验。
1. 媒体查询
```css
/* 针对宽度小于600px的设备 */
@media (max-width: 600px) {
  body {
    font-size: 14px;
  }
}

/* 针对宽度在600px到1024px之间的设备 */
@media (min-width: 601px) and (max-width: 1024px) {
  body {
    font-size: 16px;
  }
}
```
2. 弹性盒子布局（Flexbox）
```CSS
.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex: 1 1 200px; /* 每个子元素至少200px宽，剩余空间平分 */
}
```
3. 弹性单位

%：相对于父元素的百分比。
vw 和 vh：相对于视口宽度和高度的百分比。
em 和 rem：相对于字体大小的单位，rem 是相对于根元素的字体大小。

4. 图片处理
```css
img {
  max-width: 100%;
  height: auto;
}
```
5. 使用现成的框架
Bootstrap：提供预定义的网格系统和组件。
Tailwind CSS：使用实用性类（utility-first）的方式实现响应式设计。
Foundation：另一个响应式框架，具有良好的兼容性。

# 7. 回流和重绘
回流和重绘的区别是什么？
回流是重新计算布局，重绘是更新外观。
回流开销大于重绘。

如何优化回流和重绘？
减少 DOM 操作、合并样式更改、使用 transform 和 opacity、避免频繁访问触发回流的属性。

