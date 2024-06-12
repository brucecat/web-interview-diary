
```js
// 假设这是服务工作线程的脚本文件
self.addEventListener('fetch', (event) => {
  // 检查请求的URL是否与服务工作线程的域相同
  const originalURL = new URL(event.request.url);
  if (originalURL.origin === self.location.origin) {
    // 如果是同域请求，直接使用event.request
    event.respondWith(fetch(event.request).then((response) => {
      if (!response.ok) {
        throw new Error('Resource not found or server error');
      }
      return response;
    }).catch((error) => {
      console.error('Fetch error:', error);
      // 可以在这里添加回退逻辑，例如从缓存中获取资源
      return caches.match('/path/to/fallback/resource');
    }));
  } else {
    // 如果是跨域请求，使用mode: 'cors'来创建新的Request对象
    const crossOriginRequest = new Request(originalURL, { mode: 'cors' });
    event.respondWith(fetch(crossOriginRequest).then((response) => {
      if (!response.ok) {
        throw new Error('Resource not found or server error');
      }
      return response;
    }).catch((error) => {
      console.error('Fetch error for cross-origin request:', error);
      // 可以在这里添加回退逻辑，例如从缓存中获取资源
      return caches.match('/path/to/fallback/resource');
    }));
  }
});


```

监听 fetch 事件：服务工作线程通过监听 fetch 事件来拦截所有网络请求。

检查请求的域：通过创建一个 URL 对象并比较 origin 属性来检查请求是否来自相同的域。

处理同域请求：如果是同域请求，直接使用 event.request 来调用 fetch。

处理跨域请求：如果是跨域请求，创建一个新的 Request 对象，并设置 mode: 'cors' 来发起跨域请求。

响应处理：使用 then 方法来处理 fetch 的响应，如果响应状态码不是 ok（即 response.ok 为 false），则抛出错误。

错误处理：使用 catch 方法来捕获 fetch 过程中发生的任何错误，并提供回退逻辑，例如从缓存中获取资源。

响应回退：在 catch 块中，如果发生错误，可以定义一个回退资源，例如返回一个预定义的404页面或错误信息。