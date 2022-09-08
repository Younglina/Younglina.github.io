---
title: 蓝红二分模板
author: Younglina
date: '2022-03-26'
showAccessNumber: true
categories:
 - 算法
tags:
 - 算法模版
---
[B站视频](https://www.bilibili.com/video/BV1d54y1q7k7)  
思路是，把整个数组(arr)分为两部分，一部分标记为蓝色，一部分标记为红色，蓝红交界处即可取得想要的值  
为确保蓝(l)红(r)不相交，需定义`l=-1`,`r=arr.length`  
循环条件为`l+1!=r`，因为`l+1=r`时说明此时已到达交界处  
```
let l=-1,r=arr.length
while(l+1!=r){
  const mid = Math((l+r)/2)
  if(isBlue(mid)){
    l=mid
  }else{
    r=mid
  }
}
return l or r
```
![](https://raw.githubusercontent.com/Younglina/images/master/redblue.png)