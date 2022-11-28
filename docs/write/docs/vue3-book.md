---
date: '2022-11-28'
title: vue.js设计与实现笔录
author: Younglina
categories:
 - 文档
tags:
 - 记录
 - vue
---

## 命令式与声明式
`声明式代码的性能不优于命令式代码的性能` . 
如果我们把直接修改的性能消耗定义为 A，把找出差异的性能消耗定义为 B，那么有：  
● 命令式代码的更新性能消耗 = A  
● 声明式代码的更新性能消耗 = B + A  
可以看到，声明式代码会比命令式代码多出找出差异的性能消耗  
既然在性能层面命令式代码是更好的选择，那么为什么 Vue.js 要选择声明式的设计方案呢？原因就在于`声明式代码的可维护性更强`。从上面例子的代码中我们也可以感受到，在采用命令式代码开发的时候，我们需要维护实现目标的整个过程，包括要手动完成 DOM 元素的创建、更新、删除等工作。而声明式代码展示的就是我们要的结果，看上去更加直观，至于做事儿的过程，并不需要我们关心，Vue.js 都为我们封装好了。

## 关闭options api特性
如果明确知道自己不会使用选项 API，用户就可以使用`__VUE_OPTIONS_API__ `开关来关闭该特性，这样在打包的时候 Vue.js 的这部分代码就不会包含在最终的资源中，从而减小资源体积。
```
new webpack.DefinePlugin({
    webpack.DefinePlugin: JSON.stringify(false)
})
```

## 注册统一的错误处理函数
```
import App from 'App.vue'
const app = createApp(App)
app.config.errorHandler = () => {
  // 错误处理程序
}
```

## 响应式数据的基本实现和工作原理
一个响应系统的工作流程如下：  
● 当读取操作发生时，将副作用函数收集到“桶”中；  
● 当设置操作发生时，从“桶”中取出副作用函数并执行。  
```
const bucket = new Set()
const data = {text: 'test'}
const obj = new Proxy(data, {
    get(target,key){
        bucket.add(effect)
        return target[key]    
    },
    set(target,key,newVal){
        target[key] = newVal
        bucket.forEach(fn=>fn())
        return true    
    }
})

function effect(){
    document.body.innerHTML = obj.text
}
effect() //触发收集
setTimeout(()=>obj.text="hello bucket", 2000)
```

### 存在缺陷：
- 硬编码了副函数名称  
- 不论获取哪个key值都会触发收集  

创建一个全局变量解决问题一  
```
const bucket = new Set()
// 用一个全局变量存储被注册的副作用函数
let activeEffect
const data = {text: 'test'}
const obj = new Proxy(data, {
    get(target,key){
        if(activeEffect){
            bucket.add(activeEffect)  
        }
        return target[key]    
    },
    set(target,key,newVal){
        target[key] = newVal
        bucket.forEach(fn=>fn())
        return true    
    }
})

function effect(fn){
    activeEffect = fn
    fn()
    activeEffect = null
}
effect(()=>{document.body.innerHTML = obj.text}) //触发收集
setTimeout(()=>obj.text="hello bucket", 2000)
```

### 出现问题二的原因：
没有在副作用函数与被操作的目标字段之间建立明确的联系。例如当读取属性时，无论读取的是哪一个属性，其实都一样，都会把副作用函数收集到“桶”里；当设置属性时，无论设置的是哪一个属性，也都会把“桶”里的副作用函数取出并执行。  
如果用 target 来表示一个代理对象所代理的原始对象，用 key 来表示被操作的字段名，用 effectFn 来表示被注册的副作用函数，那么可以为这三个角色建立如下关系：
```
target
    └── key
        └── effectFn
```
```
const bucket = new WeakMap()
let activeEffect
const data = {text: 'test'}
 const obj = new Proxy(data, {
   // 拦截读取操作
   get(target, key) {
     // 没有 activeEffect，直接 return
     if (!activeEffect) return target[key]
     // 根据 target 从“桶”中取得 depsMap，它也是一个 Map 类型：key --> effects
     let depsMap = bucket.get(target)
     // 如果不存在 depsMap，那么新建一个 Map 并与 target 关联
     if (!depsMap) {
       bucket.set(target, (depsMap = new Map()))
     }
     // 再根据 key 从 depsMap 中取得 deps，它是一个 Set 类型，
     // 里面存储着所有与当前 key 相关联的副作用函数：effects
     let deps = depsMap.get(key)
     // 如果 deps 不存在，同样新建一个 Set 并与 key 关联
     if (!deps) {
       depsMap.set(key, (deps = new Set()))
     }
     // 最后将当前激活的副作用函数添加到“桶”里
     deps.add(activeEffect)

     // 返回属性值
     return target[key]
   },
   // 拦截设置操作
   set(target, key, newVal) {
     // 设置属性值
     target[key] = newVal
     // 根据 target 从桶中取得 depsMap，它是 key --> effects
     const depsMap = bucket.get(target)
     if (!depsMap) return
     // 根据 key 取得所有副作用函数 effects
     const effects = depsMap.get(key)
     // 执行副作用函数
     effects && effects.forEach(fn => fn())
     return true
   }
 })

 function effect(fn){
    activeEffect = fn
    fn()
    activeEffect = null
}
effect(()=>{document.body.innerHTML = obj.text;console.log(123)}) //触发收集
setTimeout(()=>obj.notExit="hello bucket", 2000)
```

### 最后进行封装处理
```
const bucket = new WeakMap()
let activeEffect
let data = {text: 'asdf'}
const obj = new Proxy(data, {
  get(target, key){
    track(target, key)
    return target[key]
  },
  set(target, key, newVal){
    target[key] = newVal
    trigger(target, key)
    return true
  }
})

function track(target, key){
  if(!activeEffect) return
  let depsMap = bucket.get(target)
  if(!depsMap){
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if(!deps){
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
}

function trigger(target, key){
  let depsMap = bucket.get(target)
  if(!depsMap) return
  const effects = depsMap.get(key)
  effects && effects.forEach(fn=>fn())
}

 function effect(fn){
    activeEffect = fn
    fn()
    activeEffect = null
}
effect(()=>{document.body.innerHTML = obj.text;console.log(123)}) //触发收集
setTimeout(()=>{obj.notExit="hello bucket";console.log(obj)}, 2000)
```

## 分支切换
分支切换的定义，如下面的代码所示：
```
const data = { ok: true, text: 'hello world' }
const obj = new Proxy(data, { /* ... */ })
effect(function effectFn() {
 document.body.innerText = obj.ok ? obj.text : 'not'
})
```
在 effectFn 函数内部存在一个三元表达式，根据字段 obj.ok 值的不同会执行不同的代码分支。当字段 obj.ok 的值发生变化时，代码执行的分支会跟着变化，这就是所谓的分支切换。  
分支切换可能会产生遗留的副作用函数。拿上面这段代码来说，字段 obj.ok 的初始值为 true，这时会读取字段 obj.text 的值，所以当 effectFn 函数执行时会触发字段 obj.ok 和字段 obj.text 这两个属性的读取操作，此时副作用函数 effectFn 与响应式数据之间建立的联系如下：
```
data
    └── ok
        └── effectFn
    └── text
        └── effectFn
```
当修改了obj.ok的值以后，理论上修改obj.text的值，副作用函数不应该再重新执行。  
解决这个问题的思路很简单，每次副作用函数执行时，我们可以先把它从所有与之关联的依赖集合中删除
```
const bucket = new WeakMap()
let activeEffect
const data = {ok: true, text: 'hello'}
const obj = new Proxy(data,{
  get(target, key){
    track(target, key)
    return target[key]
  },
  set(target, key, newVal){
    target[key] = newVal
    trigger(target, key)
    return true
  }
})

function track(target, key){
  if(!activeEffect) return
  let depsMap = bucket.get(target)
  if(!depsMap) bucket.set(target, (depsMap = new Map()))
  let deps = depsMap.get(key)
  if(!deps) depsMap.set(key, (deps = new Set()))
  deps.add(activeEffect)
  // deps就是一个与当前副作用函数存在联系的依赖集合
  activeEffect.deps.push(deps)
}

function trigger(target, key){
  let depsMap = bucket.get(target)
  if(!depsMap) return
  const effects = depsMap.get(key)
  // effects && effects.forEach(fn=>fn())
  // 新建一个set防止死循环
  const effectsToRun = new Set(effects)
  effectsToRun.forEach(effectFn=>effectFn())
}

function cleanup(effectFn){
  for(let i=0;i<effectFn.deps.length;i++){
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}
function effect(fn){
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    fn()
    activeEffect = null
  }
  //用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = []
  effectFn()
}

effect(()=>{
  document.body.innerHTML = obj.ok?obj.text:'not';console.log(123)
}) //触发收集
setTimeout(()=>{
  obj.ok=false;
  obj.text = 'new set'
  console.log(obj)
}, 1000)
setTimeout(()=>{
  obj.text = 'new set2'
  console.log(obj)
}, 2000)
```