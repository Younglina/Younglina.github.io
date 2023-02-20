---
date: '2023-02-15'
title: 腾讯云-对象存储
author: Younglina
categories:
 - 文档
tags:
 - 记录
---

需要有腾讯云的对象存储服务，可存储图片，自定义的一些JSON数据。  
相关链接:  https://cloud.tencent.com/document/api/436/7751

### 下载依赖
```
npm i cos-js-sdk-v5
```
### 初始化一个COS对象
```
import COS from "cos-js-sdk-v5";
const myCos = new COS({
  SecretId: import.meta.env.VITE_SID,
  SecretKey: import.meta.env.VITE_SKEY,
})
```
### 获取对应存储桶中的数据 
```
// 数据在cosData.Contents中
const cosData = await myCos.getBucket({
    Bucket: "younglina-1256042946",
    Region: "ap-nanjing",
});
```
### 批量上传
```
const formatFiles = files.map(item=>{
  return {  
    SecretId: import.meta.env.VITE_SID,
    SecretKey: import.meta.env.VITE_SKEY,
    Key: `${type}_${timekey}_${item.file.name}`,
    StorageClass: "STANDARD",
    Body: item.file, // 上传文件对象
  }
})
myCos.uploadFiles({
      files: formatFiles,
      SliceSize: 1024 * 1024 * 10,    /* 设置大于10MB采用分块上传 */
      onProgress: function (info) {
          var percent = parseInt(info.percent * 10000) / 100;
          var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
          console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
      },
      onFileFinish: function (err, data, options) {
          console.log(options.Key + '上传' + (err ? '失败' : '完成'));
      },
  }, function (err, data) {
      console.log(err || data);
  });
```
### 获取单个对象
```
// 根据key值（文件名）获取
const data = await myCos.getObject({
  Bucket: "younglina-1256042946",
  Region: "ap-nanjing",
  Key: `test.json`,
})
console.log(data.Body)
```
### 上传单个对象
```
// key为文件名，body为数据
myCos.putObject({  
    Bucket: "younglina-1256042946",
    Region: "ap-nanjing",
    Key: `test.json`,
    Body: JSON.parse([{a:1}]),
})
```