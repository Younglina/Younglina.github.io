import{_ as s,o as n,c as a,h as e}from"./app.f8544706.js";const A=JSON.parse('{"title":"腾讯云-对象存储","description":"","frontmatter":{"date":"2023-02-24","title":"腾讯云-对象存储","author":"Younglina","categories":["文档"],"tags":["记录"]},"headers":[{"level":2,"title":"fastmock","slug":"fastmock","link":"#fastmock","children":[]},{"level":2,"title":"firestore","slug":"firestore","link":"#firestore","children":[]},{"level":2,"title":"腾讯云-对象存储","slug":"腾讯云-对象存储","link":"#腾讯云-对象存储","children":[{"level":3,"title":"创建存储桶","slug":"创建存储桶","link":"#创建存储桶","children":[]},{"level":3,"title":"安装SDK","slug":"安装sdk","link":"#安装sdk","children":[]},{"level":3,"title":"初始化一个COS对象","slug":"初始化一个cos对象","link":"#初始化一个cos对象","children":[]},{"level":3,"title":"获取存储桶下所有文件","slug":"获取存储桶下所有文件","link":"#获取存储桶下所有文件","children":[]},{"level":3,"title":"获取评论数据","slug":"获取评论数据","link":"#获取评论数据","children":[]},{"level":3,"title":"提交评论","slug":"提交评论","link":"#提交评论","children":[]},{"level":3,"title":"批量上传图片","slug":"批量上传图片","link":"#批量上传图片","children":[]}]}],"relativePath":"write/docs/tengxuncos.md","lastUpdated":1677219249000}'),l={name:"write/docs/tengxuncos.md"},p=e(`<p>起因是最近在用vue3开发一个h5的小项目时，有一个评论的功能，当时第一想法是用gitalk实现，但是想想可能会面对一些没有git的用户， 又不想使用后台服务，所以想另辟蹊径。<br><img src="https://raw.githubusercontent.com/Younglina/images/master/tx_cos1.png" alt=""></p><h2 id="fastmock" tabindex="-1">fastmock <a class="header-anchor" href="#fastmock" aria-hidden="true">#</a></h2><p>在初期，没有评论的时候，用了<a href="https://www.fastmock.site/#/login" target="_blank" rel="noreferrer">fastmock</a>模拟假数据，但是它是定死的数据，而且只能获取，没有API去新增数据 <img src="https://raw.githubusercontent.com/Younglina/images/master/tx_cos10.png" alt=""></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;data|3-10&quot;: [ // 返回3到10条数据</span></span>
<span class="line"><span style="color:#A6ACCD;">    {</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;nickname&quot;: &quot;@cword(3)&quot;, // 随机三个字</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;datetime&quot;: &quot;@datetime&quot;, // 时间</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;content&quot;: &quot;@cparagraph(1, 3)&quot; //1到3句话</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  ],</span></span>
<span class="line"><span style="color:#A6ACCD;">  code: 200</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>返回的数据如下</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;data&quot;: [{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;nickname&quot;: &quot;总类北&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;datetime&quot;: &quot;2016-11-15 13:10:44&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;content&quot;: &quot;同相将满界西油易民第与几看。想别飞热候九叫那好支还心。&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }, {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;nickname&quot;: &quot;备效习&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;datetime&quot;: &quot;1971-02-20 20:40:19&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;content&quot;: &quot;都或是三太率导记进离色报划十业决名林。究深办史类京持具响验研级交。&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }, {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;nickname&quot;: &quot;府术目&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;datetime&quot;: &quot;2014-09-26 19:17:31&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;content&quot;: &quot;技亲是状王系或装手什且等。&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }],</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;code&quot;: 200</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="firestore" tabindex="-1">firestore <a class="header-anchor" href="#firestore" aria-hidden="true">#</a></h2><p>然后使用了firebase的<a href="https://firebase.google.com/docs/firestore/quickstart?hl=zh-cn&amp;authuser=0" target="_blank" rel="noreferrer">firestore</a>，在本地开发时，一切正常， 创建、新增都没啥问题。等发布以后，使用手机流量查看时发现，会偶尔出现网络错误，毕竟是google的服务，所以又要寻找其他方案。 <img src="https://raw.githubusercontent.com/Younglina/images/master/tx_cos3.png" alt=""><img src="https://raw.githubusercontent.com/Younglina/images/master/L1VzZXJzL1lvdW5nbGluYS9MaWJyYXJ5L0FwcGxpY2F0aW9uIFN1cHBvcnQvRGluZ1RhbGtNYWMvNTY1MDM4NTJfdjIvSW1hZ2VGaWxlcy8xNjExODg0LzE2NzcyMDU1ODQyODRfMTRFMjc5QzMtNzg2MC00NzQ0LUJBM0EtODVFNEVCNUM5MEZDLmdpZg%3D%3D.gif" alt=""></p><h2 id="腾讯云-对象存储" tabindex="-1">腾讯云-对象存储 <a class="header-anchor" href="#腾讯云-对象存储" aria-hidden="true">#</a></h2><p>使用腾讯云是因为之前有用过相关图片存储，后来发现它可以直接存储JSON数据，以下是我的一些使用步骤。</p><p>使用前提是有腾讯云的账号，可以直接使用微信扫码<a href="https://cloud.tencent.com/login?s_url=https%3A%2F%2Fcloud.tencent.com%2F" target="_blank" rel="noreferrer">注册登录</a>。</p><h3 id="创建存储桶" tabindex="-1">创建存储桶 <a class="header-anchor" href="#创建存储桶" aria-hidden="true">#</a></h3><p>登录腾讯云账号之后，进入<a href="https://console.cloud.tencent.com/cos" target="_blank" rel="noreferrer">对象存储控制台</a>创建存储桶。<br> 它免费的基础资源包基本够用了。<br> 有50G的存储容量，10G/月的下载流量，200万次/月的读写请求<br> 可根据自己的需求选择配置 <img src="https://raw.githubusercontent.com/Younglina/images/master/tx_cos4.png" alt=""><img src="https://raw.githubusercontent.com/Younglina/images/master/tx_cos5.png" alt=""><img src="https://raw.githubusercontent.com/Younglina/images/master/tx_cos6.png" alt=""></p><h3 id="安装sdk" tabindex="-1">安装SDK <a class="header-anchor" href="#安装sdk" aria-hidden="true">#</a></h3><p>腾讯云存储有专门的JS-SDK，如果使用其他平台，也有<a href="https://console.cloud.tencent.com/cos/sdk" target="_blank" rel="noreferrer">对应的SDK</a></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">npm i cos-js-sdk-v5</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="初始化一个cos对象" tabindex="-1">初始化一个COS对象 <a class="header-anchor" href="#初始化一个cos对象" aria-hidden="true">#</a></h3><p>这里需要去<a href="https://console.cloud.tencent.com/cam/capi" target="_blank" rel="noreferrer">创建密钥</a>，创建完成后，获取对应的SecretId和SecretKey以便初始化</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">import COS from &quot;cos-js-sdk-v5&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">const myCos = new COS({</span></span>
<span class="line"><span style="color:#A6ACCD;">  SecretId: &#39;&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  SecretKey: &#39;&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>接下来就可以访问你之前创建的存储桶中的任意文件了。</p><h3 id="获取存储桶下所有文件" tabindex="-1">获取存储桶下所有文件 <a class="header-anchor" href="#获取存储桶下所有文件" aria-hidden="true">#</a></h3><p>查看创建的存储桶列表的基本信息，获取存储桶名称和地区 <img src="https://raw.githubusercontent.com/Younglina/images/master/tx_cos7.png" alt=""></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">const cosData = await myCos.getBucket({</span></span>
<span class="line"><span style="color:#A6ACCD;">    Bucket: &quot;存储桶名称&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    Region: &quot;存储桶地区,下图的英文名&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    Key: \`test.json\`,</span></span>
<span class="line"><span style="color:#A6ACCD;">});</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>数据在cosData.Contents中，数据格式如下</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">{ Contents: </span></span>
<span class="line"><span style="color:#A6ACCD;">  [</span></span>
<span class="line"><span style="color:#A6ACCD;">    { </span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;Key&quot;: &quot;bg.jpg&quot;, </span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;LastModified&quot;: &quot;&quot;, </span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;ETag&quot;: &quot;&quot;, </span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;Size&quot;: &quot;765034&quot;, </span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;Owner&quot;: { </span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;ID&quot;: &quot;&quot;, </span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;DisplayName&quot;: &quot;&quot; </span></span>
<span class="line"><span style="color:#A6ACCD;">        }, </span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;StorageClass&quot;: &quot;&quot; </span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  ]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="获取评论数据" tabindex="-1">获取评论数据 <a class="header-anchor" href="#获取评论数据" aria-hidden="true">#</a></h3><p>方法就是在上面的基础上，加上对应文件名即可获取单个文件的数据。返回的数据就是自己定义好的数据。<br> 我把评论按类别存储在对应的JSON文件中，读取时，只要获取对应的JSON文件即可。<br> 不用担心获取不到对应文件，api在获取不到文件时自动创建一个空的文件</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">export const getCommnet = async (type) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const myCos = new COS({</span></span>
<span class="line"><span style="color:#A6ACCD;">    SecretId: &#39;&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    SecretKey: &#39;&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">  let commnetData = []</span></span>
<span class="line"><span style="color:#A6ACCD;">  try {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const data = await myCos.getObject({</span></span>
<span class="line"><span style="color:#A6ACCD;">      Bucket: &quot;存储桶名称&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      Region: &quot;存储桶地区,下图的英文名&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      Key: \`\${type}.json\`,</span></span>
<span class="line"><span style="color:#A6ACCD;">    })</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 因为存储的时候需要把数据转成JSON格式</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 所以获取到的 data.Body 转换成 JSON 对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    commnetData = JSON.parse(data.Body.toString());</span></span>
<span class="line"><span style="color:#A6ACCD;">  } catch (err) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    if(err.code === &#39;NoSuchKey&#39;){</span></span>
<span class="line"><span style="color:#A6ACCD;">      console.log(&#39;没有对应的评论文件，创建一个&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }else{</span></span>
<span class="line"><span style="color:#A6ACCD;">      console.log(err);</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">  return commnetData</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p><img src="https://raw.githubusercontent.com/Younglina/images/master/tx_cos9.png" alt=""></p><p>我的评论数据格式：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;nickname&quot;: &quot;用户昵称&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;content&quot;: &quot;评论内容&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;datetime&quot;: &quot;提交时间&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;images&quot;: &quot;逗号分隔的上传图片字符串&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="提交评论" tabindex="-1">提交评论 <a class="header-anchor" href="#提交评论" aria-hidden="true">#</a></h3><p>因为提交文件是把之前的文件进行覆盖，所以在提交时先获取对应的评论文件数据，再在数据上进行操作。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">export const uploadComment = async (type, data) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  const myCos = new COS({</span></span>
<span class="line"><span style="color:#A6ACCD;">    SecretId: &#39;&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    SecretKey: &#39;&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">  const commentData = await getCommnet(type)</span></span>
<span class="line"><span style="color:#A6ACCD;">  commentData.unshift(data)</span></span>
<span class="line"><span style="color:#A6ACCD;">  await myCos.putObject({</span></span>
<span class="line"><span style="color:#A6ACCD;">    Bucket: &quot;存储桶名称&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    Region: &quot;存储桶地区,下图的英文名&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    Key: \`\${type}.json\`,</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 将评论数据数组格式化成JSON</span></span>
<span class="line"><span style="color:#A6ACCD;">    // 下面第三个参数指定缩进用的空白字符串，用于美化输出</span></span>
<span class="line"><span style="color:#A6ACCD;">    Body: JSON.stringify(commentData, null, &quot; &quot;),</span></span>
<span class="line"><span style="color:#A6ACCD;">  })</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="批量上传图片" tabindex="-1">批量上传图片 <a class="header-anchor" href="#批量上传图片" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">// files为需要上传的文件对象列表</span></span>
<span class="line"><span style="color:#A6ACCD;">const formatFiles = files.map(item=&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">  return {  </span></span>
<span class="line"><span style="color:#A6ACCD;">    SecretId: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    SecretKey: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    Key: \`带后缀的文件名\`,</span></span>
<span class="line"><span style="color:#A6ACCD;">    StorageClass: &quot;STANDARD&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    Body: item.file, // 上传文件对象</span></span>
<span class="line"><span style="color:#A6ACCD;">    // prefix: &quot;***&quot; // 可以提供前缀，代表上传到存储桶中创建的文件夹下</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;">myCos.uploadFiles({</span></span>
<span class="line"><span style="color:#A6ACCD;">      files: formatFiles,</span></span>
<span class="line"><span style="color:#A6ACCD;">      SliceSize: 1024 * 1024 * 10,    /* 设置大于10MB采用分块上传 */</span></span>
<span class="line"><span style="color:#A6ACCD;">      onProgress: function (info) {</span></span>
<span class="line"><span style="color:#A6ACCD;">          var percent = parseInt(info.percent * 10000) / 100;</span></span>
<span class="line"><span style="color:#A6ACCD;">          var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;</span></span>
<span class="line"><span style="color:#A6ACCD;">          console.log(&#39;进度：&#39; + percent + &#39;%; 速度：&#39; + speed + &#39;Mb/s;&#39;);</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">      onFileFinish: function (err, data, options) {</span></span>
<span class="line"><span style="color:#A6ACCD;">          console.log(options.Key + &#39;上传&#39; + (err ? &#39;失败&#39; : &#39;完成&#39;));</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">  }, function (err, data) {</span></span>
<span class="line"><span style="color:#A6ACCD;">      console.log(err || data);</span></span>
<span class="line"><span style="color:#A6ACCD;">  });</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div>`,36),r=[p];function t(o,c,i,u,b,C){return n(),a("div",null,r)}const d=s(l,[["render",t]]);export{A as __pageData,d as default};
