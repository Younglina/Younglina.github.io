---
date: '2022-10-13'
title: LRU缓存
author: Younglina
categories:
 - 算法
tags:
 - 记录
 - LRU缓存
---

`LRU`是`Least Recently Used`的缩写，即最近最少使用，是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰。该算法赋予每个页面一个访问字段，用来记录一个页面自上次被访问以来所经历的时间 t，当须淘汰一个页面时，选择现有页面中其 `t` 值最大的，即最近最少使用的页面予以淘汰。

## 题目描述
[146. LRU 缓存](https://leetcode.cn/problems/lru-cache/)  
请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。  
实现 LRUCache 类：  
LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存  
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。  
void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。

### 示例：
```
输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
```

### 题解
使用`Map`进行缓存，因为`Map`的key是按照`set`的顺序排列的，用`Object`的话需要配合数组
```
class LRUCache {
  constructor(capacity){
    this.capacity = capacity
    this.cache = new Map()
  }

  get(key){
    let c = this.cache
    if(!c.has(key)) return -1
    let val = c.get(key)
    c.delete(key)
    c.set(key, val)
    return val
  }

  set(key, val){
    let c = this.cache
    if(c.has(key)) c.delete(key)
    c.set(key, val)
    if(c.size > this.capacity){
      c.delete(c.keys().next().value)
    }
  }
}
```