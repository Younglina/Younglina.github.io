import{_ as s,o as n,c as a,h as l}from"./app.f8544706.js";const F=JSON.parse('{"title":"27.移除元素","description":"","frontmatter":{"title":"27.移除元素","author":"Younglina","date":"2022-01-06","showAccessNumber":true,"categories":["算法"],"tags":["双指针","简单"]},"headers":[{"level":2,"title":"题目描述","slug":"题目描述","link":"#题目描述","children":[{"level":3,"title":"示例 1：","slug":"示例-1","link":"#示例-1","children":[]},{"level":3,"title":"示例 2：","slug":"示例-2","link":"#示例-2","children":[]}]},{"level":2,"title":"思路","slug":"思路","link":"#思路","children":[]},{"level":2,"title":"题解","slug":"题解","link":"#题解","children":[]}],"relativePath":"write/algorithms/leetCode27.md","lastUpdated":1662613821000}'),e={name:"write/algorithms/leetCode27.md"},p=l(`<h2 id="题目描述" tabindex="-1">题目描述 <a class="header-anchor" href="#题目描述" aria-hidden="true">#</a></h2><p><a href="https://leetcode-cn.com/problems/remove-element/" target="_blank" rel="noreferrer">27.移除元素</a><br> 给你一个数组<code>nums</code>和一个值<code>val</code>，你需要<code>「原地」</code>移除所有数值等于<code>val</code>的元素，并返回移除后数组的新长度。<br> 不要使用额外的数组空间，你必须仅使用<code>O(1)</code>额外空间并「原地」修改输入数组。<br> 元素的顺序可以改变。<br> 你不需要考虑数组中超出新长度后面的元素。</p><h3 id="示例-1" tabindex="-1">示例 1： <a class="header-anchor" href="#示例-1" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">输入：nums = [3,2,2,3], val = 3  </span></span>
<span class="line"><span style="color:#A6ACCD;">输出：2, nums = [2,2]  </span></span>
<span class="line"><span style="color:#A6ACCD;">解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。</span></span>
<span class="line"><span style="color:#A6ACCD;">你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，</span></span>
<span class="line"><span style="color:#A6ACCD;">而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="示例-2" tabindex="-1">示例 2： <a class="header-anchor" href="#示例-2" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">输入：nums = [0,1,2,2,3,0,4,2], val = 2  </span></span>
<span class="line"><span style="color:#A6ACCD;">输出：5, nums = [0,1,4,0,3]  </span></span>
<span class="line"><span style="color:#A6ACCD;">解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。</span></span>
<span class="line"><span style="color:#A6ACCD;">注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">提示</p><p>0 &lt;= nums.length &lt;= 100<br> 0 &lt;= nums[i] &lt;= 50<br> 0 &lt;= val &lt;= 100</p></div><h2 id="思路" tabindex="-1">思路 <a class="header-anchor" href="#思路" aria-hidden="true">#</a></h2><p>快慢指针，快指针循环数组，慢指针从0开始，快指针与慢指针对比，如果数据不相等，交换当前快、慢指针对应数据，且慢指针向后移动一位</p><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-hidden="true">#</a></h2><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> removeElement </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">n</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">v</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">j</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">n</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">j</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">n</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">!==</span><span style="color:#A6ACCD;">v</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">n</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">] </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">n</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">j</span><span style="color:#F07178;">]</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>`,11),o=[p];function r(t,c,i,y,d,C){return n(),a("div",null,o)}const u=s(e,[["render",r]]);export{F as __pageData,u as default};
