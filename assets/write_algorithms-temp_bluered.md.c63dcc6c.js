import{_ as s,o as n,c as a,h as e}from"./app.f8544706.js";const _=JSON.parse('{"title":"蓝红二分模板","description":"","frontmatter":{"title":"蓝红二分模板","author":"Younglina","date":"2022-03-26","showAccessNumber":true,"categories":["算法"],"tags":["算法模版"]},"headers":[],"relativePath":"write/algorithms-temp/bluered.md","lastUpdated":1662613821000}'),l={name:"write/algorithms-temp/bluered.md"},r=e(`<p><a href="https://www.bilibili.com/video/BV1d54y1q7k7" target="_blank" rel="noreferrer">B站视频</a><br> 思路是，把整个数组(arr)分为两部分，一部分标记为蓝色，一部分标记为红色，蓝红交界处即可取得想要的值<br> 为确保蓝(l)红(r)不相交，需定义<code>l=-1</code>,<code>r=arr.length</code><br> 循环条件为<code>l+1!=r</code>，因为<code>l+1=r</code>时说明此时已到达交界处</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">let l=-1,r=arr.length</span></span>
<span class="line"><span style="color:#A6ACCD;">while(l+1!=r){</span></span>
<span class="line"><span style="color:#A6ACCD;">  const mid = Math((l+r)/2)</span></span>
<span class="line"><span style="color:#A6ACCD;">  if(isBlue(mid)){</span></span>
<span class="line"><span style="color:#A6ACCD;">    l=mid</span></span>
<span class="line"><span style="color:#A6ACCD;">  }else{</span></span>
<span class="line"><span style="color:#A6ACCD;">    r=mid</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">return l or r</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><img src="https://raw.githubusercontent.com/Younglina/images/master/redblue.png" alt=""></p>`,3),p=[r];function t(c,o,i,d,b,m){return n(),a("div",null,p)}const A=s(l,[["render",t]]);export{_ as __pageData,A as default};
