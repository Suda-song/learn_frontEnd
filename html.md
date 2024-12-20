# 1. html5 新特性
1.1 语义化标签：
新增了一些语义化的标签，让文档结构更清晰，比如 <header>、<footer>、<article>、<section>、<nav> 等。
这些标签有助于 SEO，且更易于维护和理解。
1.2 多媒体标签：
<audio> 和 <video>：支持音频和视频的嵌入，提供控制属性（如播放、暂停、音量控制等），不需要依赖 Flash。
支持格式：如 MP4、WebM、Ogg 等。
1.3 表单增强：
新增了许多表单控件，比如 <date>, <email>, <url>, <range>, <color> 等。
支持客户端输入验证、占位符、自动完成等属性。
1.4 本地存储：
localStorage 和 sessionStorage：用于在客户端保存数据，localStorage 可永久保存数据，sessionStorage 在会话结束时清除。
替代了传统的 cookie，更加安全、高效。
1.5 Canvas：
<canvas> 元素用于绘制图形，如游戏、数据可视化、动画等，提供了 JavaScript API 支持 2D 绘图。
1.6 SVG：
HTML5 支持在 HTML 文档中嵌入 SVG（可缩放矢量图形），用于绘制矢量图形，适合在不同分辨率下保持清晰度。
1.7 地理位置（Geolocation）：
允许网页获取用户的地理位置数据，用户同意授权后可以使用 navigator.geolocation 访问位置数据，常用于地图服务和个性化推荐。
1.8 拖放（Drag and Drop）：
通过 draggable 属性和事件监听，允许用户在页面上进行拖放操作，实现元素的自由拖拽。
1.9 Web Workers：
允许在后台运行 JavaScript 代码，不会阻塞主线程，适合执行大量运算和数据处理。
1.10 WebSocket：
实现了客户端与服务器之间的双向通信，比传统的 HTTP 请求更高效，适合即时通讯、实时数据同步等场景。