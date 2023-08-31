import{_ as s,o as n,c as a,h as e}from"./app.f8544706.js";const A=JSON.parse('{"title":"自定义一个vitepress的blog","description":"","frontmatter":{"date":"2022-08-22","title":"自定义一个vitepress的blog","author":"Younglina","categories":["文档"],"tags":["记录","vitepress"]},"headers":[{"level":2,"title":"前言","slug":"前言","link":"#前言","children":[]},{"level":2,"title":"已完成","slug":"已完成","link":"#已完成","children":[]},{"level":2,"title":"待完善","slug":"待完善","link":"#待完善","children":[]},{"level":2,"title":"1. 搭建vitepress","slug":"_1-搭建vitepress","link":"#_1-搭建vitepress","children":[]},{"level":2,"title":"2.配置","slug":"_2-配置","link":"#_2-配置","children":[]},{"level":2,"title":"3. 自定义首页","slug":"_3-自定义首页","link":"#_3-自定义首页","children":[{"level":3,"title":"1. 新建一个组件","slug":"_1-新建一个组件","link":"#_1-新建一个组件","children":[]},{"level":3,"title":"2. 将index.md修改为","slug":"_2-将index-md修改为","link":"#_2-将index-md修改为","children":[]},{"level":3,"title":"3.重写首页","slug":"_3-重写首页","link":"#_3-重写首页","children":[]}]},{"level":2,"title":"4. 自定义文档页面","slug":"_4-自定义文档页面","link":"#_4-自定义文档页面","children":[{"level":3,"title":"1. 修改配置文件","slug":"_1-修改配置文件","link":"#_1-修改配置文件","children":[]},{"level":3,"title":"2. 新建Layout","slug":"_2-新建layout","link":"#_2-新建layout","children":[]},{"level":3,"title":"3. 插槽","slug":"_3-插槽","link":"#_3-插槽","children":[]}]},{"level":2,"title":"交流","slug":"交流","link":"#交流","children":[]}],"relativePath":"write/docs/vitepress.md","lastUpdated":1663594514000}'),l={name:"write/docs/vitepress.md"},p=e(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-hidden="true">#</a></h2><p>之前跟着<a href="https://juejin.cn/user/712139234359182" target="_blank" rel="noreferrer">冴羽老师</a>的<a href="https://juejin.cn/post/7041134607869149215" target="_blank" rel="noreferrer">vuepress系列</a>搭建了一版<a href="https://younglina.top/" target="_blank" rel="noreferrer">博客</a>，可以说现在vuepress的环境已经非常完善，有很多与之配套的主题、插件等。但是对于前端来说，不仅要功能多，还要快，所以在有了vuepress的经验之后，最近开始着手使用<a href="https://vitepress.vuejs.org/" target="_blank" rel="noreferrer">vitepress</a>来迁移，<a href="https://github.com/Younglina/littlear/tree/master" target="_blank" rel="noreferrer">源码</a>和<a href="https://younglina.top/littlear" target="_blank" rel="noreferrer">网页</a>可直接看。</p><h2 id="已完成" tabindex="-1">已完成 <a class="header-anchor" href="#已完成" aria-hidden="true">#</a></h2><ul><li>自定义首页</li><li>leetcode本年打卡记录</li><li>获取所有文档列表</li><li>点击列表调整文档</li><li>获取所有文档分类</li><li>获取所有文档标签</li><li>点击分类跳转</li><li>点击标签跳转</li></ul><h2 id="待完善" tabindex="-1">待完善 <a class="header-anchor" href="#待完善" aria-hidden="true">#</a></h2><ul><li>评论</li><li>看伴娘(本地可以用，打包的时候不行，有无大佬做过：)</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/219aade8abe443ad94bc3d9968a6f1cc~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="_1-搭建vitepress" tabindex="-1">1. 搭建vitepress <a class="header-anchor" href="#_1-搭建vitepress" aria-hidden="true">#</a></h2><p>页面结构和样式方面也是参考了vuepress的一个非常好的主题，<a href="https://vuepress-theme-reco.recoluan.com/" target="_blank" rel="noreferrer">vuepress-theme-reco</a>，有用vuepress的同学，也是非常推荐去使用。<br> 搭建项目的步骤同<a href="https://vitepress.vuejs.org/guide/getting-started" target="_blank" rel="noreferrer">vitepress官网</a></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">//1.创建一个空项目</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir vitepress-blog &amp;&amp; cd vitepress-blog</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//2.初始化，可以使用你自己喜欢的包管理器</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn init</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//3.添加vitepress和vue依赖</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn add --dev vitepress vue</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//4.创建一个文档</span></span>
<span class="line"><span style="color:#A6ACCD;">mkdir docs &amp;&amp; echo &#39;# Hello VitePress&#39; &gt; docs/index.md</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//5.在package.json中添加脚本</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  ...</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;dev&quot;: &quot;vitepress dev docs&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;build&quot;: &quot;vitepress build docs&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;serve&quot;: &quot;vitepress serve docs&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  ...</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//6.运行</span></span>
<span class="line"><span style="color:#A6ACCD;">yarn dev</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h2 id="_2-配置" tabindex="-1">2.配置 <a class="header-anchor" href="#_2-配置" aria-hidden="true">#</a></h2><p>在没有任何配置的情况下，这只是个非常简单的页面。<br> 在之前创建的<code>docs</code>目录下新建<code>.vitepress</code>目录，并新建一个<code>.config.js</code>，<code>.config.js</code>就是我们后面配置整个项目的地方，目录结构大致如下</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">├─ docs</span></span>
<span class="line"><span style="color:#A6ACCD;">│  ├─ .vitepress</span></span>
<span class="line"><span style="color:#A6ACCD;">│  │  └─ config.js</span></span>
<span class="line"><span style="color:#A6ACCD;">│  └─ index.md</span></span>
<span class="line"><span style="color:#A6ACCD;">└─ package.json</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>我的一些配置</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">//因为导航栏和侧边栏的代码较多，所以抽离出来</span></span>
<span class="line"><span style="color:#A6ACCD;">const wyNav = require(&#39;./nav.js&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">const wySidebar = require(&#39;./sidebar.js&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">module.exports = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  title: &quot;littlear&quot;, //网站标题</span></span>
<span class="line"><span style="color:#A6ACCD;">  description: &quot;vitepress blog&quot;, //网站描述,会生成&lt;meta&gt;便签</span></span>
<span class="line"><span style="color:#A6ACCD;">  author: &quot;Younglina&quot;, //作者</span></span>
<span class="line"><span style="color:#A6ACCD;">  base: &#39;/&#39;, //根目录 如果您计划将站点部署到https://foo.github.io/bar/，那么您应该将base设置为“/bar/”</span></span>
<span class="line"><span style="color:#A6ACCD;">  markdown: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    lineNumbers: true, //显示代码行数</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  lastUpdated: true, //以git提交的时间为更新时间</span></span>
<span class="line"><span style="color:#A6ACCD;">  themeConfig: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    nav: wyNav, //导航栏配置</span></span>
<span class="line"><span style="color:#A6ACCD;">    sidebar: wySidebar, //侧边栏配置</span></span>
<span class="line"><span style="color:#A6ACCD;">    author: &#39;Younglina&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    lastUpdatedText: &#39;上次更新时间&#39;, //最后更新时间文本</span></span>
<span class="line"><span style="color:#A6ACCD;">    logo: &quot;/avatar.jpeg&quot;, //导航栏左侧头像</span></span>
<span class="line"><span style="color:#A6ACCD;">    docFooter: { //上下篇文本</span></span>
<span class="line"><span style="color:#A6ACCD;">      prev: &#39;上一篇&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      next: &#39;下一篇&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    // footer: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //   copyright: &#39;Copyright © 2021-present Younglina&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    // },</span></span>
<span class="line"><span style="color:#A6ACCD;">    // socialLinks: [     // 信息栏展示社交信息</span></span>
<span class="line"><span style="color:#A6ACCD;">    //   { icon: &#39;github&#39;, link: &quot;https://github.com/Younglina&quot; },</span></span>
<span class="line"><span style="color:#A6ACCD;">    // ]</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h2 id="_3-自定义首页" tabindex="-1">3. 自定义首页 <a class="header-anchor" href="#_3-自定义首页" aria-hidden="true">#</a></h2><p>vitepress有一套自己的<a href="https://vitepress.vuejs.org/guide/theme-home-page#home-page" target="_blank" rel="noreferrer">首页</a>配置，将之前的<code>docs/index.md</code>的<code>frontmatter</code>修改为</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">---</span></span>
<span class="line"><span style="color:#A6ACCD;">layout: home</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">hero:</span></span>
<span class="line"><span style="color:#A6ACCD;">  name: VitePress</span></span>
<span class="line"><span style="color:#A6ACCD;">  text: Vite &amp; Vue powered static site generator.</span></span>
<span class="line"><span style="color:#A6ACCD;">  tagline: Lorem ipsum...</span></span>
<span class="line"><span style="color:#A6ACCD;">  image:</span></span>
<span class="line"><span style="color:#A6ACCD;">    src: /logo.png</span></span>
<span class="line"><span style="color:#A6ACCD;">    alt: VitePress</span></span>
<span class="line"><span style="color:#A6ACCD;">  actions:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - theme: brand</span></span>
<span class="line"><span style="color:#A6ACCD;">      text: Get Started</span></span>
<span class="line"><span style="color:#A6ACCD;">      link: /guide/what-is-vitepress</span></span>
<span class="line"><span style="color:#A6ACCD;">    - theme: alt</span></span>
<span class="line"><span style="color:#A6ACCD;">      text: View on GitHub</span></span>
<span class="line"><span style="color:#A6ACCD;">      link: https://github.com/vuejs/vitepress</span></span>
<span class="line"><span style="color:#A6ACCD;">features: </span></span>
<span class="line"><span style="color:#A6ACCD;">  - icon: ⚡️ </span></span>
<span class="line"><span style="color:#A6ACCD;">    title: Vite, The DX that can&#39;t be beat </span></span>
<span class="line"><span style="color:#A6ACCD;">    details: Lorem ipsum... </span></span>
<span class="line"><span style="color:#A6ACCD;">  - icon: 🖖 </span></span>
<span class="line"><span style="color:#A6ACCD;">    title: Power of Vue meets Markdown </span></span>
<span class="line"><span style="color:#A6ACCD;">    details: Lorem ipsum... </span></span>
<span class="line"><span style="color:#A6ACCD;">  - icon: 🛠️ </span></span>
<span class="line"><span style="color:#A6ACCD;">    title: Simple and minimal, always </span></span>
<span class="line"><span style="color:#A6ACCD;">    details: Lorem ipsum...</span></span>
<span class="line"><span style="color:#A6ACCD;">---</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>效果就是</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5be5527818224988ae10b42c46d7d03f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>vitepress也是支持直接在md中写vue的，所以可以通过vue组件的形式，完全自己自定义一套样式。</p><h3 id="_1-新建一个组件" tabindex="-1">1. 新建一个组件 <a class="header-anchor" href="#_1-新建一个组件" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">// .vitepress/components/home.vue</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">const list = [1, 2, 3, 4, 5, 6, 7, 8, 9]</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;div class=&quot;home-wrapper&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div v-for=&quot;item in list&quot; :key=&quot;item&quot; class=&quot;home-item&quot;&gt;{{item}}&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">.home-wrapper {</span></span>
<span class="line"><span style="color:#A6ACCD;">  text-align: center;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">.home-item {</span></span>
<span class="line"><span style="color:#A6ACCD;">  vertical-align: middle;</span></span>
<span class="line"><span style="color:#A6ACCD;">  margin: 4px 4px 10px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  padding: 4px 8px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  font-weight: bolder;</span></span>
<span class="line"><span style="color:#A6ACCD;">  display: inline-block;</span></span>
<span class="line"><span style="color:#A6ACCD;">  cursor: pointer;</span></span>
<span class="line"><span style="color:#A6ACCD;">  border-radius: 2px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  line-height: 13px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  font-size: 13px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);</span></span>
<span class="line"><span style="color:#A6ACCD;">  transition: all 0.5s;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="_2-将index-md修改为" tabindex="-1">2. 将<code>index.md</code>修改为 <a class="header-anchor" href="#_2-将index-md修改为" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import home from &#39;./.vitepress/components/home.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;home /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8899e6868366442985f135d1d5c4a8f9~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> 可以看到组件和md文件的frontmatter是不冲突的，如果不想整个首页重写，只写一些简单的组件，完全可以用这种方式。</p><h3 id="_3-重写首页" tabindex="-1">3.重写首页 <a class="header-anchor" href="#_3-重写首页" aria-hidden="true">#</a></h3><p>如果想完全重写首页，那么<code>index.md</code>只要如下即可</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">---</span></span>
<span class="line"><span style="color:#A6ACCD;">layout: home</span></span>
<span class="line"><span style="color:#A6ACCD;">---</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import home from &#39;./.vitepress/components/home.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;home /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>组件中可能会有用到本地资源的时候，资源文件都放在<code>docs/public</code>下面，引用时直接<code>/资源</code>即可</p><h2 id="_4-自定义文档页面" tabindex="-1">4. 自定义文档页面 <a class="header-anchor" href="#_4-自定义文档页面" aria-hidden="true">#</a></h2><p>正常的文档页面是这样的 <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/970f2cec9a144bfba3b7da597e95ea26~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"> vitepress也提供我们<a href="https://vitepress.vuejs.org/guide/theme-introduction#using-a-custom-theme" target="_blank" rel="noreferrer">自定义页面</a>的方法</p><h3 id="_1-修改配置文件" tabindex="-1">1. 修改配置文件 <a class="header-anchor" href="#_1-修改配置文件" aria-hidden="true">#</a></h3><p>新建<code>./vitepress/theme/</code>目录，并创建<code>MyLayout.vue</code>和<code>index.js</code>文件。 <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4b23d397e1a4a228b8e8d74ec42b34d~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">// .vitepress/theme/index.js</span></span>
<span class="line"><span style="color:#A6ACCD;">import MyLayout from &#39;./MyLayout.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import DefaultTheme from &#39;vitepress/theme&#39; //viteperss的主题</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default {</span></span>
<span class="line"><span style="color:#A6ACCD;">  ...DefaultTheme,</span></span>
<span class="line"><span style="color:#A6ACCD;">  Layout: MyLayout,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">  enhanceApp({ app, router, siteData }) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // app is the Vue 3 app instance from \`createApp()\`.</span></span>
<span class="line"><span style="color:#A6ACCD;">    // router is VitePress&#39; custom router. \`siteData\` is</span></span>
<span class="line"><span style="color:#A6ACCD;">    // a \`ref\` of current site-level metadata.</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  setup() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    // this function will be executed inside VitePressApp&#39;s</span></span>
<span class="line"><span style="color:#A6ACCD;">    // setup hook. all composition APIs are available here.</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="_2-新建layout" tabindex="-1">2. 新建Layout <a class="header-anchor" href="#_2-新建layout" aria-hidden="true">#</a></h3><p>VitePress提供了一些<a href="https://vitepress.vuejs.org/guide/api#api-reference" target="_blank" rel="noreferrer">API</a>给我们去获取应用的数据。<br> 如<code>useData</code>，返回的就是页面的数据，它的数据格式</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">interface VitePressData {</span></span>
<span class="line"><span style="color:#A6ACCD;">  site: Ref&lt;SiteData&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  page: Ref&lt;PageData&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  theme: Ref&lt;any&gt; // themeConfig from .vitepress/config.js</span></span>
<span class="line"><span style="color:#A6ACCD;">  frontmatter: Ref&lt;PageData[&#39;frontmatter&#39;]&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  lang: Ref&lt;string&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  title: Ref&lt;string&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  description: Ref&lt;string&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  localePath: Ref&lt;string&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>我们可以获取其中的<code>frontmatter</code>来设置如下效果，这里会使用到<code>vitepress</code>提供的插槽</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f421d69e5072494e84e334f04787996b~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">&lt;!--.vitepress/theme/MyLayout.vue--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import DefaultTheme from &#39;vitepress/theme&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { useData } from &#39;vitepress&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const { Layout } = DefaultTheme</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const { frontmatter } = useData() //这里的frontmatter就是各个md文件中自己写在最上面的东西</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;Layout&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;template #doc-before&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;span class=&quot;page-info&quot;&gt;✍️{{ frontmatter.author }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;span class=&quot;page-info&quot;&gt;🕐{{ frontmatter.date }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;span&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        🔗</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;span class=&quot;page-info&quot; v-for=&quot;item in frontmatter.tags&quot; :key=&quot;item&quot;&gt;{{ item }}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &lt;/span&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/Layout&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  .page-info{</span></span>
<span class="line"><span style="color:#A6ACCD;">    font-size: 13px;</span></span>
<span class="line"><span style="color:#A6ACCD;">    color: #7f7f7f;</span></span>
<span class="line"><span style="color:#A6ACCD;">    margin-right: 10px;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/style&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h3 id="_3-插槽" tabindex="-1">3. 插槽 <a class="header-anchor" href="#_3-插槽" aria-hidden="true">#</a></h3><p>vitepress提供了很多页面上的<a href="https://vitepress.vuejs.org/guide/theme-introduction#layout-slots" target="_blank" rel="noreferrer">插槽</a>，能够很方便的去自定义，就如上面用到的<code>#doc-before</code>对应的就是文档的开头位置，一些插槽对应的位置和效果，可以自己配置自己想要的</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03781d67469c48dca5fa23be54828e57~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="交流" tabindex="-1">交流 <a class="header-anchor" href="#交流" aria-hidden="true">#</a></h2><p>文章细节方面讲的不多，是一个大概的流程，blog也会慢慢完善，有想进一步交流、指正的同学，欢迎评论沟通。</p>`,46),r=[p];function t(i,c,o,b,u,m){return n(),a("div",null,r)}const d=s(l,[["render",t]]);export{A as __pageData,d as default};
