关键字段

Last-Modified：资源最后一次修改的时间。
ETag：资源的实体标签，用于唯一标识资源的版本。
If-Modified-Since：条件请求头，用于发送Last-Modified值。
If-None-Match：条件请求头，用于发送ETag值。

# Cache-Control
public: 响应可以被任何中间缓存存储。
private: 响应是为单个用户准备的，不能被共享缓存存储。
no-cache: 强制缓存在向客户端提供响应之前，必须先向源服务器验证缓存的响应。
no-store: 完全禁止缓存存储响应的任何部分。
max-age: 指定资源能够被缓存多久，单位是秒。
s-maxage: 指定共享缓存能够存储资源多久，单位是秒。这个指令会覆盖 max-age。
must-revalidate: 缓存必须在过期后重新验证资源。
proxy-revalidate: 与 must-revalidate 类似，但仅适用于共享缓存。
immutable: 响应体不会变化，可以被安全地缓存并重用。
stale-while-revalidate: 允许缓存在等待从源服务器验证时继续使用已缓存的响应，同时在后台进行验证。
stale-if-error: 允许在错误发生时使用已缓存的响应，而不是返回错误。
这些指令可以组合使用，以满足不同的缓存需求。例如，Cache-Control: no-cache, no-store, must-revalidate 表示响应不应该被缓存，并且每次请求都必须重新验证。