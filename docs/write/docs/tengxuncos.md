---
date: '2023-02-24'
title: 腾讯云-对象存储
author: Younglina
categories:
 - 文档
tags:
 - 记录
---

起因是最近在用vue3开发一个h5的小项目时，有一个评论的功能，当时第一想法是用gitalk实现，但是想想可能会面对一些没有git的用户，
又不想使用后台服务，所以想另辟蹊径。  
![](https://raw.githubusercontent.com/Younglina/images/master/tx_cos1.png)

## fastmock
在初期，没有评论的时候，用了[fastmock](https://www.fastmock.site/#/login)模拟假数据，但是它是定死的数据，而且只能获取，没有API去新增数据
![](https://raw.githubusercontent.com/Younglina/images/master/tx_cos10.png)
```
{
  "data|3-10": [ // 返回3到10条数据
    {
      "nickname": "@cword(3)", // 随机三个字
      "datetime": "@datetime", // 时间
      "content": "@cparagraph(1, 3)" //1到3句话
    }
  ],
  code: 200
}
```
返回的数据如下
```
{
  "data": [{
    "nickname": "总类北",
    "datetime": "2016-11-15 13:10:44",
    "content": "同相将满界西油易民第与几看。想别飞热候九叫那好支还心。"
  }, {
    "nickname": "备效习",
    "datetime": "1971-02-20 20:40:19",
    "content": "都或是三太率导记进离色报划十业决名林。究深办史类京持具响验研级交。"
  }, {
    "nickname": "府术目",
    "datetime": "2014-09-26 19:17:31",
    "content": "技亲是状王系或装手什且等。"
  }],
  "code": 200
}
```

## firestore
然后使用了firebase的[firestore](https://firebase.google.com/docs/firestore/quickstart?hl=zh-cn&authuser=0)，在本地开发时，一切正常，
创建、新增都没啥问题。等发布以后，使用手机流量查看时发现，会偶尔出现网络错误，毕竟是google的服务，所以又要寻找其他方案。
![](https://raw.githubusercontent.com/Younglina/images/master/tx_cos3.png)
![](https://raw.githubusercontent.com/Younglina/images/master/L1VzZXJzL1lvdW5nbGluYS9MaWJyYXJ5L0FwcGxpY2F0aW9uIFN1cHBvcnQvRGluZ1RhbGtNYWMvNTY1MDM4NTJfdjIvSW1hZ2VGaWxlcy8xNjExODg0LzE2NzcyMDU1ODQyODRfMTRFMjc5QzMtNzg2MC00NzQ0LUJBM0EtODVFNEVCNUM5MEZDLmdpZg%3D%3D.gif)

## 腾讯云-对象存储
使用腾讯云是因为之前有用过相关图片存储，后来发现它可以直接存储JSON数据，以下是我的一些使用步骤。

使用前提是有腾讯云的账号，可以直接使用微信扫码[注册登录](https://cloud.tencent.com/login?s_url=https%3A%2F%2Fcloud.tencent.com%2F)。  
### 创建存储桶
登录腾讯云账号之后，进入[对象存储控制台](https://console.cloud.tencent.com/cos)创建存储桶。  
它免费的基础资源包基本够用了。  
有50G的存储容量，10G/月的下载流量，200万次/月的读写请求  
可根据自己的需求选择配置
![](https://raw.githubusercontent.com/Younglina/images/master/tx_cos4.png)
![](https://raw.githubusercontent.com/Younglina/images/master/tx_cos5.png)
![](https://raw.githubusercontent.com/Younglina/images/master/tx_cos6.png)

### 安装SDK
腾讯云存储有专门的JS-SDK，如果使用其他平台，也有[对应的SDK](https://console.cloud.tencent.com/cos/sdk)
```
npm i cos-js-sdk-v5
```
### 初始化一个COS对象
这里需要去[创建密钥](https://console.cloud.tencent.com/cam/capi)，创建完成后，获取对应的SecretId和SecretKey以便初始化
```
import COS from "cos-js-sdk-v5";
const myCos = new COS({
  SecretId: '',
  SecretKey: '',
})
```
接下来就可以访问你之前创建的存储桶中的任意文件了。
### 获取存储桶下所有文件
查看创建的存储桶列表的基本信息，获取存储桶名称和地区
![](https://raw.githubusercontent.com/Younglina/images/master/tx_cos7.png)
```
const cosData = await myCos.getBucket({
    Bucket: "存储桶名称",
    Region: "存储桶地区,下图的英文名",
    Key: `test.json`,
});
```
数据在cosData.Contents中，数据格式如下
```
{ Contents: 
  [
    { 
      "Key": "bg.jpg", 
      "LastModified": "", 
      "ETag": "", 
      "Size": "765034", 
      "Owner": { 
        "ID": "", 
        "DisplayName": "" 
        }, 
      "StorageClass": "" 
    }
  ]
}
```

### 获取评论数据
方法就是在上面的基础上，加上对应文件名即可获取单个文件的数据。返回的数据就是自己定义好的数据。  
我把评论按类别存储在对应的JSON文件中，读取时，只要获取对应的JSON文件即可。  
不用担心获取不到对应文件，api在获取不到文件时自动创建一个空的文件  
```
export const getCommnet = async (type) => {
  const myCos = new COS({
    SecretId: '',
    SecretKey: '',
  })
  let commnetData = []
  try {
    const data = await myCos.getObject({
      Bucket: "存储桶名称",
      Region: "存储桶地区,下图的英文名",
      Key: `${type}.json`,
    })
    // 因为存储的时候需要把数据转成JSON格式
    // 所以获取到的 data.Body 转换成 JSON 对象
    commnetData = JSON.parse(data.Body.toString());
  } catch (err) {
    if(err.code === 'NoSuchKey'){
      console.log('没有对应的评论文件，创建一个')
    }else{
      console.log(err);
    }
  }
  return commnetData
}
```
![](https://raw.githubusercontent.com/Younglina/images/master/tx_cos9.png)

我的评论数据格式：
```
{
  "nickname": "用户昵称",
  "content": "评论内容",
  "datetime": "提交时间",
  "images": "逗号分隔的上传图片字符串"
}
```

### 提交评论
因为提交文件是把之前的文件进行覆盖，所以在提交时先获取对应的评论文件数据，再在数据上进行操作。

```
export const uploadComment = async (type, data) => {
  const myCos = new COS({
    SecretId: '',
    SecretKey: '',
  })
  const commentData = await getCommnet(type)
  commentData.unshift(data)
  await myCos.putObject({
    Bucket: "存储桶名称",
    Region: "存储桶地区,下图的英文名",
    Key: `${type}.json`,
    // 将评论数据数组格式化成JSON
    // 下面第三个参数指定缩进用的空白字符串，用于美化输出
    Body: JSON.stringify(commentData, null, " "),
  })
}
```

### 批量上传图片
```
// files为需要上传的文件对象列表
const formatFiles = files.map(item=>{
  return {  
    SecretId: "",
    SecretKey: "",
    Key: `带后缀的文件名`,
    StorageClass: "STANDARD",
    Body: item.file, // 上传文件对象
    // prefix: "***" // 可以提供前缀，代表上传到存储桶中创建的文件夹下
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
