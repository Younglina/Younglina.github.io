---
title: NodeJS-fs模块
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
fs.readFile() 是 Node.js 中 fs 模块提供的一个异步方法，用于读取文件内容。
fs.readFile(path[, options], callback)
其中：
- path：要读取的文件的路径，可以是相对路径或绝对路径。
- options：一个可选参数，是一个对象，用于指定文件编码、文件打开模式等。常用的选项有：
  - encoding：指定文件编码，默认为 null，即返回原始的 buffer 对象。
  - flag：指定文件打开模式，默认为 'r'，表示以读取模式打开文件。
- callback：一个回调函数，用于处理读取文件后的结果。回调函数有两个参数：
  - err：如果读取文件出错，该参数为一个 Error 对象，否则为 null。
  - data：读取文件的内容，如果设置了 encoding 选项，则为字符串类型，否则为 Buffer 类型。

使用 fs.readFile() 方法时，可以通过回调函数获取读取的文件内容。例如：
``` javascript
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

上面的例子中，fs.readFile() 方法读取了当前目录下的 file.txt 文件，并将其内容打印到控制台上。  
由于设置了 encoding 选项为 'utf8'，因此返回的 data 参数为字符串类型。  
如果未设置 encoding 选项，则返回的 data 参数为 Buffer 类型。  
fs.readFile() 方法是异步的，因此需要在回调函数中处理读取文件后的结果。
可以使用 fs.readFileSync() 方法同步读取文件。  

### fs.writeFile
fs.writeFile() 是 Node.js 中 fs 模块提供的一个异步方法，用于将数据写入文件。它的语法如下：
fs.writeFile(file, data[, options], callback)
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
上面的例子中，fs.writeFile() 方法将字符串 'Hello, world!' 写入当前目录下的 file.txt 文件。  
如果写入成功，控制台将输出 'The file has been saved!'。
fs.writeFile() 方法是异步的，因此需要在回调函数中处理写入文件后的结果。
可以使用 fs.writeFileSync() 方法同步写入文件。