import{_ as s,o as n,c as a,h as e}from"./app.f8544706.js";const y=JSON.parse('{"title":"vue.js设计与实现笔录","description":"","frontmatter":{"date":"2022-11-28","title":"vue.js设计与实现笔录","author":"Younglina","categories":["文档"],"tags":["记录","vue"]},"headers":[{"level":2,"title":"命令式与声明式","slug":"命令式与声明式","link":"#命令式与声明式","children":[]},{"level":2,"title":"关闭options api特性","slug":"关闭options-api特性","link":"#关闭options-api特性","children":[]},{"level":2,"title":"注册统一的错误处理函数","slug":"注册统一的错误处理函数","link":"#注册统一的错误处理函数","children":[]},{"level":2,"title":"响应式数据的基本实现和工作原理","slug":"响应式数据的基本实现和工作原理","link":"#响应式数据的基本实现和工作原理","children":[{"level":3,"title":"存在缺陷：","slug":"存在缺陷","link":"#存在缺陷","children":[]},{"level":3,"title":"出现问题二的原因：","slug":"出现问题二的原因","link":"#出现问题二的原因","children":[]},{"level":3,"title":"最后进行封装处理","slug":"最后进行封装处理","link":"#最后进行封装处理","children":[]}]},{"level":2,"title":"分支切换","slug":"分支切换","link":"#分支切换","children":[]}],"relativePath":"write/docs/vue3-book.md","lastUpdated":1669621014000}'),l={name:"write/docs/vue3-book.md"},p=e(`<h2 id="命令式与声明式" tabindex="-1">命令式与声明式 <a class="header-anchor" href="#命令式与声明式" aria-hidden="true">#</a></h2><p><code>声明式代码的性能不优于命令式代码的性能</code> . 如果我们把直接修改的性能消耗定义为 A，把找出差异的性能消耗定义为 B，那么有：<br> ● 命令式代码的更新性能消耗 = A<br> ● 声明式代码的更新性能消耗 = B + A<br> 可以看到，声明式代码会比命令式代码多出找出差异的性能消耗<br> 既然在性能层面命令式代码是更好的选择，那么为什么 Vue.js 要选择声明式的设计方案呢？原因就在于<code>声明式代码的可维护性更强</code>。从上面例子的代码中我们也可以感受到，在采用命令式代码开发的时候，我们需要维护实现目标的整个过程，包括要手动完成 DOM 元素的创建、更新、删除等工作。而声明式代码展示的就是我们要的结果，看上去更加直观，至于做事儿的过程，并不需要我们关心，Vue.js 都为我们封装好了。</p><h2 id="关闭options-api特性" tabindex="-1">关闭options api特性 <a class="header-anchor" href="#关闭options-api特性" aria-hidden="true">#</a></h2><p>如果明确知道自己不会使用选项 API，用户就可以使用<code>_<wbr>_VUE_OPTIONS_API__ </code>开关来关闭该特性，这样在打包的时候 Vue.js 的这部分代码就不会包含在最终的资源中，从而减小资源体积。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">new webpack.DefinePlugin({</span></span>
<span class="line"><span style="color:#A6ACCD;">    webpack.DefinePlugin: JSON.stringify(false)</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="注册统一的错误处理函数" tabindex="-1">注册统一的错误处理函数 <a class="header-anchor" href="#注册统一的错误处理函数" aria-hidden="true">#</a></h2><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">import App from &#39;App.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">const app = createApp(App)</span></span>
<span class="line"><span style="color:#A6ACCD;">app.config.errorHandler = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 错误处理程序</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="响应式数据的基本实现和工作原理" tabindex="-1">响应式数据的基本实现和工作原理 <a class="header-anchor" href="#响应式数据的基本实现和工作原理" aria-hidden="true">#</a></h2><p>一个响应系统的工作流程如下：<br> ● 当读取操作发生时，将副作用函数收集到“桶”中；<br> ● 当设置操作发生时，从“桶”中取出副作用函数并执行。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">const bucket = new Set()</span></span>
<span class="line"><span style="color:#A6ACCD;">const data = {text: &#39;test&#39;}</span></span>
<span class="line"><span style="color:#A6ACCD;">const obj = new Proxy(data, {</span></span>
<span class="line"><span style="color:#A6ACCD;">    get(target,key){</span></span>
<span class="line"><span style="color:#A6ACCD;">        bucket.add(effect)</span></span>
<span class="line"><span style="color:#A6ACCD;">        return target[key]    </span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    set(target,key,newVal){</span></span>
<span class="line"><span style="color:#A6ACCD;">        target[key] = newVal</span></span>
<span class="line"><span style="color:#A6ACCD;">        bucket.forEach(fn=&gt;fn())</span></span>
<span class="line"><span style="color:#A6ACCD;">        return true    </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function effect(){</span></span>
<span class="line"><span style="color:#A6ACCD;">    document.body.innerHTML = obj.text</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">effect() //触发收集</span></span>
<span class="line"><span style="color:#A6ACCD;">setTimeout(()=&gt;obj.text=&quot;hello bucket&quot;, 2000)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="存在缺陷" tabindex="-1">存在缺陷： <a class="header-anchor" href="#存在缺陷" aria-hidden="true">#</a></h3><ul><li>硬编码了副函数名称</li><li>不论获取哪个key值都会触发收集</li></ul><p>创建一个全局变量解决问题一</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">const bucket = new Set()</span></span>
<span class="line"><span style="color:#A6ACCD;">// 用一个全局变量存储被注册的副作用函数</span></span>
<span class="line"><span style="color:#A6ACCD;">let activeEffect</span></span>
<span class="line"><span style="color:#A6ACCD;">const data = {text: &#39;test&#39;}</span></span>
<span class="line"><span style="color:#A6ACCD;">const obj = new Proxy(data, {</span></span>
<span class="line"><span style="color:#A6ACCD;">    get(target,key){</span></span>
<span class="line"><span style="color:#A6ACCD;">        if(activeEffect){</span></span>
<span class="line"><span style="color:#A6ACCD;">            bucket.add(activeEffect)  </span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">        return target[key]    </span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    set(target,key,newVal){</span></span>
<span class="line"><span style="color:#A6ACCD;">        target[key] = newVal</span></span>
<span class="line"><span style="color:#A6ACCD;">        bucket.forEach(fn=&gt;fn())</span></span>
<span class="line"><span style="color:#A6ACCD;">        return true    </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function effect(fn){</span></span>
<span class="line"><span style="color:#A6ACCD;">    activeEffect = fn</span></span>
<span class="line"><span style="color:#A6ACCD;">    fn()</span></span>
<span class="line"><span style="color:#A6ACCD;">    activeEffect = null</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">effect(()=&gt;{document.body.innerHTML = obj.text}) //触发收集</span></span>
<span class="line"><span style="color:#A6ACCD;">setTimeout(()=&gt;obj.text=&quot;hello bucket&quot;, 2000)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="出现问题二的原因" tabindex="-1">出现问题二的原因： <a class="header-anchor" href="#出现问题二的原因" aria-hidden="true">#</a></h3><p>没有在副作用函数与被操作的目标字段之间建立明确的联系。例如当读取属性时，无论读取的是哪一个属性，其实都一样，都会把副作用函数收集到“桶”里；当设置属性时，无论设置的是哪一个属性，也都会把“桶”里的副作用函数取出并执行。<br> 如果用 target 来表示一个代理对象所代理的原始对象，用 key 来表示被操作的字段名，用 effectFn 来表示被注册的副作用函数，那么可以为这三个角色建立如下关系：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">target</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── key</span></span>
<span class="line"><span style="color:#A6ACCD;">        └── effectFn</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">const bucket = new WeakMap()</span></span>
<span class="line"><span style="color:#A6ACCD;">let activeEffect</span></span>
<span class="line"><span style="color:#A6ACCD;">const data = {text: &#39;test&#39;}</span></span>
<span class="line"><span style="color:#A6ACCD;"> const obj = new Proxy(data, {</span></span>
<span class="line"><span style="color:#A6ACCD;">   // 拦截读取操作</span></span>
<span class="line"><span style="color:#A6ACCD;">   get(target, key) {</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 没有 activeEffect，直接 return</span></span>
<span class="line"><span style="color:#A6ACCD;">     if (!activeEffect) return target[key]</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 根据 target 从“桶”中取得 depsMap，它也是一个 Map 类型：key --&gt; effects</span></span>
<span class="line"><span style="color:#A6ACCD;">     let depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 如果不存在 depsMap，那么新建一个 Map 并与 target 关联</span></span>
<span class="line"><span style="color:#A6ACCD;">     if (!depsMap) {</span></span>
<span class="line"><span style="color:#A6ACCD;">       bucket.set(target, (depsMap = new Map()))</span></span>
<span class="line"><span style="color:#A6ACCD;">     }</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 再根据 key 从 depsMap 中取得 deps，它是一个 Set 类型，</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 里面存储着所有与当前 key 相关联的副作用函数：effects</span></span>
<span class="line"><span style="color:#A6ACCD;">     let deps = depsMap.get(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 如果 deps 不存在，同样新建一个 Set 并与 key 关联</span></span>
<span class="line"><span style="color:#A6ACCD;">     if (!deps) {</span></span>
<span class="line"><span style="color:#A6ACCD;">       depsMap.set(key, (deps = new Set()))</span></span>
<span class="line"><span style="color:#A6ACCD;">     }</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 最后将当前激活的副作用函数添加到“桶”里</span></span>
<span class="line"><span style="color:#A6ACCD;">     deps.add(activeEffect)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">     // 返回属性值</span></span>
<span class="line"><span style="color:#A6ACCD;">     return target[key]</span></span>
<span class="line"><span style="color:#A6ACCD;">   },</span></span>
<span class="line"><span style="color:#A6ACCD;">   // 拦截设置操作</span></span>
<span class="line"><span style="color:#A6ACCD;">   set(target, key, newVal) {</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 设置属性值</span></span>
<span class="line"><span style="color:#A6ACCD;">     target[key] = newVal</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 根据 target 从桶中取得 depsMap，它是 key --&gt; effects</span></span>
<span class="line"><span style="color:#A6ACCD;">     const depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#A6ACCD;">     if (!depsMap) return</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 根据 key 取得所有副作用函数 effects</span></span>
<span class="line"><span style="color:#A6ACCD;">     const effects = depsMap.get(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 执行副作用函数</span></span>
<span class="line"><span style="color:#A6ACCD;">     effects &amp;&amp; effects.forEach(fn =&gt; fn())</span></span>
<span class="line"><span style="color:#A6ACCD;">     return true</span></span>
<span class="line"><span style="color:#A6ACCD;">   }</span></span>
<span class="line"><span style="color:#A6ACCD;"> })</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> function effect(fn){</span></span>
<span class="line"><span style="color:#A6ACCD;">    activeEffect = fn</span></span>
<span class="line"><span style="color:#A6ACCD;">    fn()</span></span>
<span class="line"><span style="color:#A6ACCD;">    activeEffect = null</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">effect(()=&gt;{document.body.innerHTML = obj.text;console.log(123)}) //触发收集</span></span>
<span class="line"><span style="color:#A6ACCD;">setTimeout(()=&gt;obj.notExit=&quot;hello bucket&quot;, 2000)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><h3 id="最后进行封装处理" tabindex="-1">最后进行封装处理 <a class="header-anchor" href="#最后进行封装处理" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">const bucket = new WeakMap()</span></span>
<span class="line"><span style="color:#A6ACCD;">let activeEffect</span></span>
<span class="line"><span style="color:#A6ACCD;">let data = {text: &#39;asdf&#39;}</span></span>
<span class="line"><span style="color:#A6ACCD;">const obj = new Proxy(data, {</span></span>
<span class="line"><span style="color:#A6ACCD;">  get(target, key){</span></span>
<span class="line"><span style="color:#A6ACCD;">    track(target, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">    return target[key]</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  set(target, key, newVal){</span></span>
<span class="line"><span style="color:#A6ACCD;">    target[key] = newVal</span></span>
<span class="line"><span style="color:#A6ACCD;">    trigger(target, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">    return true</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function track(target, key){</span></span>
<span class="line"><span style="color:#A6ACCD;">  if(!activeEffect) return</span></span>
<span class="line"><span style="color:#A6ACCD;">  let depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#A6ACCD;">  if(!depsMap){</span></span>
<span class="line"><span style="color:#A6ACCD;">    bucket.set(target, (depsMap = new Map()))</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  let deps = depsMap.get(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">  if(!deps){</span></span>
<span class="line"><span style="color:#A6ACCD;">    depsMap.set(key, (deps = new Set()))</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  deps.add(activeEffect)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function trigger(target, key){</span></span>
<span class="line"><span style="color:#A6ACCD;">  let depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#A6ACCD;">  if(!depsMap) return</span></span>
<span class="line"><span style="color:#A6ACCD;">  const effects = depsMap.get(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">  effects &amp;&amp; effects.forEach(fn=&gt;fn())</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> function effect(fn){</span></span>
<span class="line"><span style="color:#A6ACCD;">    activeEffect = fn</span></span>
<span class="line"><span style="color:#A6ACCD;">    fn()</span></span>
<span class="line"><span style="color:#A6ACCD;">    activeEffect = null</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">effect(()=&gt;{document.body.innerHTML = obj.text;console.log(123)}) //触发收集</span></span>
<span class="line"><span style="color:#A6ACCD;">setTimeout(()=&gt;{obj.notExit=&quot;hello bucket&quot;;console.log(obj)}, 2000)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><h2 id="分支切换" tabindex="-1">分支切换 <a class="header-anchor" href="#分支切换" aria-hidden="true">#</a></h2><p>分支切换的定义，如下面的代码所示：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">const data = { ok: true, text: &#39;hello world&#39; }</span></span>
<span class="line"><span style="color:#A6ACCD;">const obj = new Proxy(data, { /* ... */ })</span></span>
<span class="line"><span style="color:#A6ACCD;">effect(function effectFn() {</span></span>
<span class="line"><span style="color:#A6ACCD;"> document.body.innerText = obj.ok ? obj.text : &#39;not&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在 effectFn 函数内部存在一个三元表达式，根据字段 obj.ok 值的不同会执行不同的代码分支。当字段 obj.ok 的值发生变化时，代码执行的分支会跟着变化，这就是所谓的分支切换。<br> 分支切换可能会产生遗留的副作用函数。拿上面这段代码来说，字段 obj.ok 的初始值为 true，这时会读取字段 obj.text 的值，所以当 effectFn 函数执行时会触发字段 obj.ok 和字段 obj.text 这两个属性的读取操作，此时副作用函数 effectFn 与响应式数据之间建立的联系如下：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">data</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── ok</span></span>
<span class="line"><span style="color:#A6ACCD;">        └── effectFn</span></span>
<span class="line"><span style="color:#A6ACCD;">    └── text</span></span>
<span class="line"><span style="color:#A6ACCD;">        └── effectFn</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>当修改了obj.ok的值以后，理论上修改obj.text的值，副作用函数不应该再重新执行。<br> 解决这个问题的思路很简单，每次副作用函数执行时，我们可以先把它从所有与之关联的依赖集合中删除</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">const bucket = new WeakMap()</span></span>
<span class="line"><span style="color:#A6ACCD;">let activeEffect</span></span>
<span class="line"><span style="color:#A6ACCD;">const data = {ok: true, text: &#39;hello&#39;}</span></span>
<span class="line"><span style="color:#A6ACCD;">const obj = new Proxy(data,{</span></span>
<span class="line"><span style="color:#A6ACCD;">  get(target, key){</span></span>
<span class="line"><span style="color:#A6ACCD;">    track(target, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">    return target[key]</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  set(target, key, newVal){</span></span>
<span class="line"><span style="color:#A6ACCD;">    target[key] = newVal</span></span>
<span class="line"><span style="color:#A6ACCD;">    trigger(target, key)</span></span>
<span class="line"><span style="color:#A6ACCD;">    return true</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function track(target, key){</span></span>
<span class="line"><span style="color:#A6ACCD;">  if(!activeEffect) return</span></span>
<span class="line"><span style="color:#A6ACCD;">  let depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#A6ACCD;">  if(!depsMap) bucket.set(target, (depsMap = new Map()))</span></span>
<span class="line"><span style="color:#A6ACCD;">  let deps = depsMap.get(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">  if(!deps) depsMap.set(key, (deps = new Set()))</span></span>
<span class="line"><span style="color:#A6ACCD;">  deps.add(activeEffect)</span></span>
<span class="line"><span style="color:#A6ACCD;">  // deps就是一个与当前副作用函数存在联系的依赖集合</span></span>
<span class="line"><span style="color:#A6ACCD;">  activeEffect.deps.push(deps)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function trigger(target, key){</span></span>
<span class="line"><span style="color:#A6ACCD;">  let depsMap = bucket.get(target)</span></span>
<span class="line"><span style="color:#A6ACCD;">  if(!depsMap) return</span></span>
<span class="line"><span style="color:#A6ACCD;">  const effects = depsMap.get(key)</span></span>
<span class="line"><span style="color:#A6ACCD;">  // effects &amp;&amp; effects.forEach(fn=&gt;fn())</span></span>
<span class="line"><span style="color:#A6ACCD;">  // 新建一个set防止死循环</span></span>
<span class="line"><span style="color:#A6ACCD;">  const effectsToRun = new Set(effects)</span></span>
<span class="line"><span style="color:#A6ACCD;">  effectsToRun.forEach(effectFn=&gt;effectFn())</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">function cleanup(effectFn){</span></span>
<span class="line"><span style="color:#A6ACCD;">  for(let i=0;i&lt;effectFn.deps.length;i++){</span></span>
<span class="line"><span style="color:#A6ACCD;">    const deps = effectFn.deps[i]</span></span>
<span class="line"><span style="color:#A6ACCD;">    deps.delete(effectFn)</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  effectFn.deps.length = 0</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">function effect(fn){</span></span>
<span class="line"><span style="color:#A6ACCD;">  const effectFn = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    cleanup(effectFn)</span></span>
<span class="line"><span style="color:#A6ACCD;">    activeEffect = effectFn</span></span>
<span class="line"><span style="color:#A6ACCD;">    fn()</span></span>
<span class="line"><span style="color:#A6ACCD;">    activeEffect = null</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  //用来存储所有与该副作用函数相关联的依赖集合</span></span>
<span class="line"><span style="color:#A6ACCD;">  effectFn.deps = []</span></span>
<span class="line"><span style="color:#A6ACCD;">  effectFn()</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">effect(()=&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">  document.body.innerHTML = obj.ok?obj.text:&#39;not&#39;;console.log(123)</span></span>
<span class="line"><span style="color:#A6ACCD;">}) //触发收集</span></span>
<span class="line"><span style="color:#A6ACCD;">setTimeout(()=&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">  obj.ok=false;</span></span>
<span class="line"><span style="color:#A6ACCD;">  obj.text = &#39;new set&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(obj)</span></span>
<span class="line"><span style="color:#A6ACCD;">}, 1000)</span></span>
<span class="line"><span style="color:#A6ACCD;">setTimeout(()=&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">  obj.text = &#39;new set2&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(obj)</span></span>
<span class="line"><span style="color:#A6ACCD;">}, 2000)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br></div></div>`,27),c=[p];function r(t,i,o,b,C,A){return n(),a("div",null,c)}const m=s(l,[["render",r]]);export{y as __pageData,m as default};
