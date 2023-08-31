import{_ as s,o as n,c as a,h as l}from"./app.f8544706.js";const C=JSON.parse('{"title":"通过gitbash配置快捷指令","description":"","frontmatter":{"title":"通过gitbash配置快捷指令","author":"Younglina","date":"2022-09-07","categories":["文档"],"tags":["小技巧"]},"headers":[],"relativePath":"write/docs/alias.md","lastUpdated":1676907389000}'),e={name:"write/docs/alias.md"},p=l(`<p>windows配置vscode gitbash<br> 在设置中添加</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">&quot;terminal.integrated.profiles.windows&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;PowerShell&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;source&quot;: &quot;PowerShell&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;icon&quot;: &quot;terminal-powershell&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;Command Prompt&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;path&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;\${env:windir}\\\\Sysnative\\\\cmd.exe&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;\${env:windir}\\\\System32\\\\cmd.exe&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        ],</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;args&quot;: [],</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;icon&quot;: &quot;terminal-cmd&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;gitbash&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;path&quot;: &quot;D:\\\\Git\\\\bin\\\\bash.exe&quot;, //git的安装路径</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;terminal.integrated.defaultProfile.windows&quot;: &quot;gitbash&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>配置<code>gitbash</code>快捷键，别名</p><ol><li>打开git的安装目录下面的<code>Git\\etc\\profile.d\\aliases.sh</code>新增</li></ol><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">alias gaa=&#39;git add .&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">alias gcm=&#39;git commit -m&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">alias gl=&#39;git pull&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">alias gp=&#39;git push&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">alias d=&#39;npm run dev&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">alias b=&#39;npm run build&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>如果上面没起作用，就用下面这种方式<br> 2. 在<code>D:\\Git\\etc\\profile.d\\bash_profile.sh</code>增加</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">alias ls=&#39;ls -F --color=auto --show-control-chars&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">alias ll=&#39;ls -l&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">alias gaa=&#39;git add .&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">alias gcm=&#39;git commit -m&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">alias gl=&#39;git pull&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">alias gp=&#39;git push&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">alias d=&#39;npm run dev&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">alias b=&#39;npm run build&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">alias dp=&#39;npm run deploy&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>在<code>D:\\Git\\etc\\bash.bashrc</code>增加</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">source /etc/profile.d/bash_profile.sh</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,9),i=[p];function o(r,t,c,u,b,d){return n(),a("div",null,i)}const A=s(e,[["render",o]]);export{C as __pageData,A as default};
