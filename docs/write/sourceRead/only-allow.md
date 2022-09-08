---
title: only-allow
author: Younglina
date: '2021-12-09'
categories:
 - 源码阅读
tags:
 - 学习
---

## 原理
使用npm生命周期钩子preinstall，在用户进行包下载时，执行package.json中对应的命令`"preinstall": "npx only-allow pnpm"`，通过process.argv.slice(2)获取启动 Node.js 进程时传入的命令行参数限制的包管理器与process.env.npm_config_user_agent进行对比匹配，不匹配直接输出信息并退出程序
​

## process.argv
返回数组，其中包含启动 Node.js 进程时传入的命令行参数。
```javascript
//以如下方式启动 Node.js 进程：
node process-args.js one two=three four
//将生成输出：
0: /usr/local/bin/node 
1: /Users/mjr/work/node/process-args.js 
2: one 
3: two=three 
4: four
```


所以 npx only-allow pnpm 对应的 process.argv.slice(2) 就是 pnpm
​

## npm_config_user_agent
通过源码可以发现在获取了规定的包管理器以后会与process.env.npm_config_user_agent这个字段进行匹配，
在nodejs源码中搜索发现它的定义如下
```javascript
define('user-agent', {
  default: 'npm/{npm-version} ' +
           'node/{node-version} ' +
           '{platform} ' +
           '{arch} ' +
           'workspaces/{workspaces} ' +
           '{ci}',
  type: String,
  description: `
    Sets the User-Agent request header.  The following fields are replaced
    with their actual counterparts:
    * \`{npm-version}\` - The npm version in use
    * \`{node-version}\` - The Node.js version in use
    * \`{platform}\` - The value of \`process.platform\`
    * \`{arch}\` - The value of \`process.arch\`
    * \`{workspaces}\` - Set to \`true\` if the \`workspaces\` or \`workspace\`
      options are set.
    * \`{ci}\` - The value of the \`ci-name\` config, if set, prefixed with
      \`ci/\`, or an empty string if \`ci-name\` is empty.
  `,
  flatten (key, obj, flatOptions) {
    const value = obj[key]
    const ciName = obj['ci-name']
    let inWorkspaces = false
    if (obj.workspaces || obj.workspace && obj.workspace.length) {
      inWorkspaces = true
    }
    flatOptions.userAgent =
      value.replace(/\{node-version\}/gi, obj['node-version'])
        .replace(/\{npm-version\}/gi, obj['npm-version'])
        .replace(/\{platform\}/gi, process.platform)
        .replace(/\{arch\}/gi, process.arch)
        .replace(/\{workspaces\}/gi, inWorkspaces)
        .replace(/\{ci\}/gi, ciName ? `ci/${ciName}` : '')
        .trim()

    // We can't clobber the original or else subsequent flattening will fail
    // (i.e. when we change the underlying config values)
    // obj[key] = flatOptions.userAgent

    // user-agent is a unique kind of config item that gets set from a template
    // and ends up translated.  Because of this, the normal "should we set this
    // to process.env also doesn't work
    process.env.npm_config_user_agent = flatOptions.userAgent
  },
})
```
### npm
所以在以npm运行时
process.env.npm_config_user_agent对应的就是
npm/6.14.11 node/v14.16.0 darwin x64
npm/npmVersion node/process.version process.platform process.arch
### yarn
yarn对应的会通过this.registries.yarn.getOption('user-agent')从yarn-registry.js中获取
![image.png](https://cdn.nlark.com/yuque/0/2021/png/191608/1639031500187-d4b3036a-ca19-462c-971e-3d72a553ecb2.png#clientId=u17123bbe-6e8b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=219&id=u3a4658fa&margin=%5Bobject%20Object%5D&name=image.png&originHeight=219&originWidth=245&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18144&status=done&style=none&taskId=uc1f6eb37-05b2-43b3-b16f-ede5b2955af&title=&width=245)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/191608/1639031629814-d750e611-cdd9-4bf7-b213-bf8d78e7125c.png#clientId=u17123bbe-6e8b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=381&id=u46b9401f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=381&originWidth=862&originalType=binary&ratio=1&rotation=0&showTitle=false&size=60574&status=done&style=none&taskId=u06d694ec-4c81-4de4-bf2f-b8dc1a3737c&title=&width=862)
### pnpm
pnpm也是类似的会把user-agent重新赋值
![image.png](https://cdn.nlark.com/yuque/0/2021/png/191608/1639031827501-08e59738-eaba-42c6-9a2d-11e305e18aaf.png#clientId=u17123bbe-6e8b-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=32&id=uc799a39e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=32&originWidth=965&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16560&status=done&style=none&taskId=ue54e6005-ba9b-4ba9-bcc1-db4120d41cb&title=&width=965)
## which-pm-runs
这个插件功能就是把获取到的npm_config_user_agent格式化，最终与package.json中用户规定的包管理器对比，达到规范的统一
```javascript
module.exports = function () {
  if (!process.env.npm_config_user_agent) {
    return undefined
  }
  return pmFromUserAgent(process.env.npm_config_user_agent)
}

function pmFromUserAgent (userAgent) {
  const pmSpec = userAgent.split(' ')[0]
  const separatorPos = pmSpec.lastIndexOf('/')
  return {
    name: pmSpec.slice(0, separatorPos),
    version: pmSpec.slice(separatorPos + 1)
  }
}

```
