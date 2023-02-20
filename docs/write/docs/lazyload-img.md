---
date: '2022-10-08'
title: 图片懒加载
author: Younglina
categories:
 - html
tags:
 - 记录
---

## 如何控制图片的加载
```html
<img data-src="lazyload.jpg" />
```
首先设置一个临时 `Data` 属性 `data-src`，控制加载时使用 `src` 代替 `data-src`

## getBoundingClientRect + Scroll with Throttle + DataSet

`Element.getBoundingClientRect()`方法返回元素的大小及其相对于视口的位置。 
```
// 当前视口位置大于元素相对于视口高度，则替换img.src
img.getBoundingClientRect().top < document.documentElement.clientHeight;
img.src = img.datset.src
```
然后使用节流方法优化一下`window.scroll`

```javascript
const demo = document.querySelectorAll("img");
function lazy() {
  for (let elem of demo) {
    if (
      elem.getBoundingClientRect().top <
      document.documentElement.clientHeight
    ) {
      if (elem.dataset.src && elem.src == "") {
        elem.src = elem.dataset.src;
      }
    }
  }
}
function throttle(t, fn) {
  let time;
  return function () {
    if (!time) {
      time = setTimeout(() => {
        time = null;
        fn();
      }, t);
    }
  };
}
lazy();
window.addEventListener("scroll", throttle(500, lazy));
```

## IntersectionObserver + DataSet

`IntersectionObserver API`，一个能够监听元素是否到了当前视口的事件

```javascript
const images = document.querySelectorAll('img')
const observer = new IntersectionObserver((changes) => {
  changes.forEach(change => {
    if (change.isIntersecting) {
      const img = change.target
      if (img.dataset.src && img.src == "") {
        img.src = img.dataset.src
      }
      observer.unobserve(img)
    }
  })
})

images.forEach(img => observer.observe(img))
```