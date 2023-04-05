---
title: NodeJS
author: Younglina
date: '2023-04-03'
categories:
 - 学习
 - nodejs
tags:
 - fs
---

## fs模块
### fs.readFile
`fs.readFile()`异步，用于读取文件内容。  
语法： **fs.readFile(path[, options], callback)**  
其中：
- path：要读取的文件的路径，可以是相对路径或绝对路径。
- options：一个可选参数，是一个对象，用于指定文件编码、文件打开模式等。常用的选项有：
  - encoding：指定文件编码，默认为 null，即返回原始的 buffer 对象。
  - flag：指定文件打开模式，默认为 'r'，表示以读取模式打开文件。
- callback：一个回调函数，用于处理读取文件后的结果。回调函数有两个参数：
  - err：如果读取文件出错，该参数为一个 Error 对象，否则为 null。
  - data：读取文件的内容，如果设置了 encoding 选项，则为字符串类型，否则为 Buffer 类型。

``` javascript
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```
可以使用 `fs.readFileSync()` 方法同步读取文件。  

### fs.**writeFile**
`fs.writeFile()`异步，用于将数据写入文件。  
语法：**fs.writeFile(file, data[, options], callback)**  
其中：
- file：要写入的文件的路径，可以是相对路径或绝对路径。
- data：要写入的数据，可以是字符串、Buffer 或 Uint8Array 类型。
- options：一个可选参数，是一个对象，用于指定文件编码、文件打开模式等。常用的选项有：
  - encoding：指定文件编码，默认为 'utf8'。
  - mode：指定文件的权限，默认为 0o666。
  - flag：指定文件打开模式，默认为 'w'，表示以写入模式打开文件。
- callback：一个回调函数，用于处理写入文件后的结果。回调函数有一个参数：
  - err：如果写入文件出错，该参数为一个 Error 对象，否则为 null。

```javascript
const fs = require('fs');

fs.writeFile('file.txt', 'Hello, world!', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
```
可以使用 `fs.writeFileSync()` 方法同步写入文件。

## path模块
### path.join
`__dirname`是`Node.js`中的一个全局变量，它表示当前模块的目录名。  
具体来说，它包含当前模块文件所在的目录的绝对路径，而不包括当前模块文件本身的名称。  
通常配合`path.join`使用

```javascript
const path = require('path')
path.join(__dirname, '***.json')
```

## Http模块
### http.createServe

`http.createServer()`，创建一个HTTP服务器对象。  
方法接受一个回调函数作为参数，该回调函数会在每个HTTP请求到达时被调用，用于处理客户端请求和生成服务端响应。  
语法：  

```javascript
const http = require('http');
const server = http.createServer((req, res) => {
  
});
```
回调函数中的`request`对象有以下常用属性和方法：  
- req.method：请求方法，例如GET、POST等。  
- req.url：请求URL，例如"/index.html"。  
- req.headers：请求头对象，包含了HTTP请求的所有头部信息。  
- req.httpVersion：HTTP协议版本，例如"1.1"。  
- req.socket：客户端套接字对象，可以用来获取客户端的IP地址和端口号等信息。  
- req.on('data', callback)：监听请求数据的事件，当有请求数据时会触发该事件，并将数据块作为回调函数的参数传递。   
- req.on('end', callback)：监听请求数据结束的事件，当请求数据接收完毕时会触发该事件。  

`response`对象有以下常用方法：  

- res.writeHead(statusCode, headers)：设置响应头，其中statusCode是HTTP响应状态码，headers是一个对象，包含了HTTP响应头信息。
- res.setHeader(name, value)：设置响应头，其中，name是响应头的名称，value是响应头的值。例如：res.setHeader('Content-Type', 'text/html');
- res.write(data, encoding)：写入响应数据，其中data是一个字符串或Buffer对象，encoding是可选的编码格式，默认为"utf-8"。
- res.end(data, encoding)：结束响应并发送响应数据，其中data是一个字符串或Buffer对象，encoding是可选的编码格式，默认为"utf-8"。

#### server.listen()
该方法用于启动HTTP服务器并监听指定的端口和主机。例如：
```javascript
server.listen(8080, 'localhost', () => {
  console.log('Server started!');
});
```
#### server.on()
该方法用于注册HTTP服务器的事件处理函数。例如：

```javascript
server.on('request', (req, res) => {
  console.log('Request received!');
});
```

#### 获取请求相关信息
需配合`url模块`，`qs模块`
```javascript
const http = require('http');
const url = require('url')
const qs = require('querystring')

const server = http.createServer()

server.on('request', (req, res)=>{
  const { method } = req
  const { pathname, query } = url.parse(req.url)
  // 获取get请求的参数 使用querystring模块
  if(pathname==='/login'){
    const { username } = qs.parse(query)
    console.log(username) // 1
    res.setHeader('content-type', 'text/html;charset=utf-8')
    // http://localhost:8080/login?username=1
    res.end(`请求方式:${method} 请求地址:${pathname} 请求参数:${query}`)
    // 请求方式:GET 请求地址:/login 请求参数:username=1
  }
  // 获取post请求的参数
  if(pathname==='/regist'){
    req.on('data', (data) => {
      const { username, password } = JSON.parse(data)
      console.log(username, password )
    })
    res.end(`regist`)
  }
})


server.listen(8080, 'localhost', () => {
  console.log('Server started!');
});
```