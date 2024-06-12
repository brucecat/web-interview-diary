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
