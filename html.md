# 1. html5 新特性
## 1.1 语义化标签：
新增了一些语义化的标签 header、footer、article、section、nav 等。
## 1.2 多媒体标签：
<audio> 和 <video>：支持音频和视频的嵌入，提供控制属性（如播放、暂停、音量控制等），不需要依赖 Flash。
支持格式：如 MP4、WebM、Ogg 等。
## 1.3 表单增强：
新增了许多表单控件，比如 <date>, <email>, <url>, <range>, <color> 等。
支持客户端输入验证、占位符、自动完成等属性。
## 1.4 本地存储：
localStorage 和 sessionStorage：用于在客户端保存数据，localStorage 可永久保存数据，sessionStorage 在会话结束时清除。
替代了传统的 cookie，更加安全、高效。
## 1.5 Canvas：
<canvas> 元素用于绘制图形，如游戏、数据可视化、动画等，提供了 JavaScript API 支持 2D 绘图。
## 1.6 SVG：
HTML5 支持在 HTML 文档中嵌入 SVG（可缩放矢量图形），用于绘制矢量图形，适合在不同分辨率下保持清晰度。
## 1.7 地理位置（Geolocation）：
允许网页获取用户的地理位置数据，用户同意授权后可以使用 navigator.geolocation 访问位置数据，常用于地图服务和个性化推荐。
## 1.8 拖放（Drag and Drop）：
通过 draggable 属性和事件监听，允许用户在页面上进行拖放操作，实现元素的自由拖拽。
### 1. 监听拖拽事件
拖拽过程涉及多个事件，最常用的事件包括：  
dragenter：当拖拽物体进入目标区域时触发。  
dragover：当拖拽物体在目标区域内移动时触发。  
drop：当拖拽物体被释放到目标区域时触发。  
dragleave：当拖拽物体离开目标区域时触发。  
### 2. 阻止默认行为
浏览器在拖拽过程中默认会执行一些操作（比如打开文件）。为了让拖拽上传功能生效，必须使用 preventDefault() 方法来阻止这些默认行为，确保文件能够被拖拽到页面中的指定区域。  
### 3. 获取拖拽的文件  
当拖拽操作结束后（即触发 drop 事件时），可以通过事件对象的 dataTransfer 属性获取到拖拽到目标区域的文件。  
### 4. 上传文件  
获取到文件后，可以通过 AJAX 或 Fetch API 将文件上传到服务器。常见的做法是将文件通过 FormData 发送到后端。  
```js
<body>
  <div id="drop-zone">将文件拖拽到这里上传</div>
  <div id="file-info"></div>

  <script>
    const dropZone = document.getElementById('drop-zone');
    const fileInfo = document.getElementById('file-info');

    // 监听dragenter事件
    dropZone.addEventListener('dragenter', (e) => {
      e.preventDefault(); // 阻止默认行为
      dropZone.classList.add('over'); // 添加样式，标识进入拖拽区域
    });

    // 监听dragover事件
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault(); // 阻止默认行为
    });

    // 监听dragleave事件
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('over'); // 移除拖拽区域样式
    });

    // 监听drop事件
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault(); // 阻止默认行为
      dropZone.classList.remove('over'); // 移除拖拽区域样式

      // 获取拖拽的文件
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0]; // 这里只处理一个文件
        fileInfo.textContent = `文件名: ${file.name}, 文件大小: ${file.size} bytes`;

        // 可以在这里上传文件到服务器
        uploadFile(file);
      }
    });

    // 文件上传函数
    function uploadFile(file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch('/upload', { // 假设服务器的上传接口是 '/upload'
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log('文件上传成功', data);
      })
      .catch(error => {
        console.error('文件上传失败', error);
      });
    }
  </script>
</body>
```
## 1.9 Web Workers：
允许在后台运行 JavaScript 代码，不会阻塞主线程，适合执行大量运算和数据处理。
## 1.10 WebSocket：
实现了客户端与服务器之间的双向通信，比传统的 HTTP 请求更高效，适合即时通讯、实时数据同步等场景。
# 2. get post
2.1 url可见性
get，url中参数可见
post，url中参数不可见
2.2 数据传输
get，通过拼接url进行参数传输
post，通过body进行参数传输
2.3 缓存性
get，请求可以缓存
post，请求不可以缓存
2.4 后退页面请求
get，请求页面后退时，不产生影响
post，请求页面后退时，会重新提交请求
2.5 数据包
get， 产生一个tcp包，浏览器会把http header和data一并发送出去，服务器响应200返回数据；
post，产生两个tcp包，浏览器先发送header，服务器响应100 continue，浏览器响应 200 ok 返回数据
# 3. 浏览器的重排（Reflow）和重绘（Repaint）
-   **重排**：当 DOM 或样式发生变化时，浏览器需要重新计算元素的位置和大小。频繁的重排会导致性能下降，因为每次重排都会导致页面重新渲染。
-   **重绘**：当元素的外观发生变化时（如颜色、背景等），浏览器需要重新渲染页面。重绘相较于重排性能消耗较少，但大量的重绘也会影响渲染速度。
# 4. 缓存的流程
- 首次请求资源：  
浏览器向服务器发送请求，服务器响应并返回资源及相关缓存控制头部。  
- 缓存资源：  
浏览器根据响应头部（如 Cache-Control、Expires 等）判断资源是否需要缓存。  
Cache-Control：  
该头部用于指定资源的缓存策略。  
Cache-Control: no-cache：资源不缓存，每次请求时都需要重新验证。  
Cache-Control: no-store：浏览器不会缓存该资源，每次都重新请求。  
Cache-Control: max-age=3600：缓存该资源 3600 秒（1 小时）。  
ETag：  
服务器通过 ETag（实体标签）来标识资源的版本。浏览器请求资源时，会将 ETag 的值发送给服务器，服务器使用该值判断资源是否发生变化。  
如果资源未变化，服务器可以返回 304 Not Modified，指示浏览器使用缓存的内容。  
Last-Modified：  
服务器通过 Last-Modified 头部告诉浏览器资源的最后修改时间。  
浏览器会在后续请求中通过 If-Modified-Since 头部将这个时间发送给服务器，服务器判断资源是否更新。如果没有更新，返回 304 Not Modified。  
Expires：  
Expires 头部指定资源的过期时间（绝对时间）。如果资源的当前时间晚于该时间，浏览器会认为缓存已过期，需要重新请求。  
与 Cache-Control 的 max-age 类似，但 Expires 是绝对时间，而 max-age 是相对时间。  
如果缓存，资源将存储在本地缓存（如内存缓存或磁盘缓存）中。  
- 后续请求：  
当浏览器请求相同资源时，首先会检查缓存。  
如果缓存有效，浏览器会直接从缓存加载资源。  
如果缓存失效，浏览器会向服务器发送请求，带上条件请求头（如 If-None-Match 或 If-Modified-Since）来验证缓存是否仍然有效。  
如果服务器返回 304 Not Modified，浏览器使用缓存的资源。  
如果服务器返回新的资源，浏览器会更新缓存。  
