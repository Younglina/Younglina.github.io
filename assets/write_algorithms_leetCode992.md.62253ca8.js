import{_ as s,o as n,c as a,h as l}from"./app.f8544706.js";const A=JSON.parse('{"title":"992.K个不同整数的子数组","description":"","frontmatter":{"title":"992.K个不同整数的子数组","author":"Younglina","date":"2022-02-17","showAccessNumber":true,"categories":["算法"],"tags":["滑动窗口","困难"]},"headers":[{"level":2,"title":"题目描述","slug":"题目描述","link":"#题目描述","children":[{"level":3,"title":"示例 1：","slug":"示例-1","link":"#示例-1","children":[]},{"level":3,"title":"示例 2：","slug":"示例-2","link":"#示例-2","children":[]}]},{"level":2,"title":"思路","slug":"思路","link":"#思路","children":[]},{"level":2,"title":"题解","slug":"题解","link":"#题解","children":[]}],"relativePath":"write/algorithms/leetCode992.md","lastUpdated":1662613821000}'),p={name:"write/algorithms/leetCode992.md"},e=l(`<h2 id="题目描述" tabindex="-1">题目描述 <a class="header-anchor" href="#题目描述" aria-hidden="true">#</a></h2><p><a href="https://leetcode-cn.com/problems/subarrays-with-k-different-integers/" target="_blank" rel="noreferrer">992.K个不同整数的子数组</a><br> 给定一个正整数数组 <code>nums</code> 和一个整数 \b<code>k</code> ，返回 <code>num</code> 中 「好子数组」 的数目。</p><p>如果 <code>nums</code> 的某个子数组中不同整数的个数恰好为 <code>k</code>，则称 <code>nums</code> 的这个连续、不一定不同的子数组为 「好子数组 」。</p><p>例如，<code>[1,2,3,1,2]</code> 中有 <code>3</code> 个不同的整数：<code>1，2，</code>以及 <code>3</code>。 <code>子数组</code> 是数组的 <code>连续</code> 部分。</p><h3 id="示例-1" tabindex="-1">示例 1： <a class="header-anchor" href="#示例-1" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">输入：nums = [1,2,1,2,3], k = 2  </span></span>
<span class="line"><span style="color:#A6ACCD;">输出：7  </span></span>
<span class="line"><span style="color:#A6ACCD;">解释：恰好由 2 个不同整数组成的子数组：[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2].  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="示例-2" tabindex="-1">示例 2： <a class="header-anchor" href="#示例-2" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">输入：nums = [1,2,1,3,4], k = 3  </span></span>
<span class="line"><span style="color:#A6ACCD;">输出：3  </span></span>
<span class="line"><span style="color:#A6ACCD;">解释：恰好由 3 个不同整数组成的子数组：[1,2,1,3], [2,1,3], [1,3,4].  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">提示</p><p>1 &lt;= nums.length &lt;= 2 * 104<br> 1 &lt;= nums[i], k &lt;= nums.length</p></div><h2 id="思路" tabindex="-1">思路 <a class="header-anchor" href="#思路" aria-hidden="true">#</a></h2><p>滑动窗口，套用滑动窗口模板，使用小于等于<code>k</code>的减去小于等于<code>k-1</code>的</p><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-hidden="true">#</a></h2><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> subarraysWithKDistinct </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">A</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">K</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">func</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">A</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;font-style:italic;">K</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">len</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">A</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;">c</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">ca</span><span style="color:#89DDFF;">=new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Array</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">A</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">length</span><span style="color:#89DDFF;">+</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">fill</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 因为nums[i]&lt;=nums.length</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">res</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;">len</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">ca</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">A</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">r</span><span style="color:#F07178;">]]</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">//下面的简便写法</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#A6ACCD;">c</span><span style="color:#89DDFF;">++</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">// if(ca[A[r]] === 0){</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">//     ca[A[r]]++</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">//     c++</span></span>
<span class="line"><span style="color:#89DDFF;">            </span><span style="color:#676E95;font-style:italic;">// }</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">c</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">K</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">                </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">ca</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">A</span><span style="color:#F07178;">[</span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;">]]</span><span style="color:#89DDFF;">===</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">) </span><span style="color:#A6ACCD;">c</span><span style="color:#89DDFF;">--</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">//下面的简便写法</span></span>
<span class="line"><span style="color:#89DDFF;">                </span><span style="color:#676E95;font-style:italic;">// --ca[A[l]]</span></span>
<span class="line"><span style="color:#89DDFF;">                </span><span style="color:#676E95;font-style:italic;">// if(ca[A[l]]===0){</span></span>
<span class="line"><span style="color:#89DDFF;">                </span><span style="color:#676E95;font-style:italic;">//     l++</span></span>
<span class="line"><span style="color:#89DDFF;">                </span><span style="color:#676E95;font-style:italic;">// }</span></span>
<span class="line"><span style="color:#89DDFF;">                </span><span style="color:#676E95;font-style:italic;">// c--</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">res</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">l</span><span style="color:#89DDFF;">+</span><span style="color:#F78C6C;">1</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">r</span><span style="color:#89DDFF;">++</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">res</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">func</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">A</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">K</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">-</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">func</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">A</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">K</span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div>`,13),o=[e];function c(t,r,i,y,F,D){return n(),a("div",null,o)}const d=s(p,[["render",c]]);export{A as __pageData,d as default};