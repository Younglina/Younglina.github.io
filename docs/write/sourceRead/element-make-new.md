---
author: Younglina
date: '2021-12-01'
categories:
 - 源码阅读
tags:
 - 学习
---

在阅读完源码后发现，其主要的工作原理就是通过make new命令提供的组件名，然后通过
file-save进行一系列的文件生成，注意力都被make命令怎么提供组件名吸引过去了
## Make命令
为什么能使用make new命令？
make是一个根据指定的Shell命令进行构建的工具，在这里它依赖于MakeFile文件进行构建。
​

## MakeFile文件
### 规则
Makefile文件由一系列规则（rules）构成。每条规则的形式如下:
 target : prerequisites  
 [tab]  commands 
上面第一行冒号前面的部分，叫做"目标"（target），冒号后面的部分叫做"前置条件"（prerequisites）；
第二行必须由一个tab键起首，后面跟着"命令"（commands）。
"目标"是必需的，不可省略；"前置条件"和"命令"都是可选的，但是两者之中必须至少存在一个。
### 实例
dist: install
npm run dist
所以在使用make dist时，dist作为target，前置条件是install，这时候就会执行
install:
npm install
在执行完npm install命令之后再回头执行npm run dist
### 伪目标(phony target)
第一行 .PHONY: dist test 这又是什么呢？
上面说的target通常是文件名， 指明这条规则需要构建的对象，目标可以是一个或者多个文件名， 之间用空格隔开。但是有时候也可以是具体的操作名称，这时候它就是个phony target。


在注释掉的情况下
![image.png](https://cdn.nlark.com/yuque/0/2021/png/191608/1638262083135-cc0a5d59-683d-42dd-a55b-264bfd947039.png#clientId=u58d5d4f9-bfb8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=21&id=u53a71bfa&margin=%5Bobject%20Object%5D&name=image.png&originHeight=21&originWidth=225&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5625&status=done&style=none&taskId=u04ac8e46-1b97-4e9a-8d7d-1822a6e1f82&title=&width=225)
在这里如果我们使用make test
![image.png](https://cdn.nlark.com/yuque/0/2021/png/191608/1638262116914-dce92289-3627-4651-a5e3-f9a660b1c874.png#clientId=u58d5d4f9-bfb8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=34&id=ud5e7800e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=34&originWidth=222&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7425&status=done&style=none&taskId=u76f05dd9-9edd-4719-91c7-c1211f7c5fb&title=&width=222)
因为项目中已经存在test文件夹，所以这个命令不会执行，直接跳过
![image.png](https://cdn.nlark.com/yuque/0/2021/png/191608/1638262224868-333e22c6-a041-415d-898a-e3a4ea29f611.png#clientId=u58d5d4f9-bfb8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=127&id=u914dab96&margin=%5Bobject%20Object%5D&name=image.png&originHeight=127&originWidth=275&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11037&status=done&style=none&taskId=u98c4d62e-d9e0-4e5e-8beb-0904406a347&title=&width=275)
所以在知道可能会存在命令与文件同名的情况下，将命令显示的声明未伪目标，这样每次执行的时候就不会去检查是否存在同名文件，而是直接执行命令
​

## make new
在使用make new zujian 组件时，具体是执行了下面的命令：
new:
node build/bin/new.js $(filter-out $@,$(MAKECMDGOALS))
这里一个个分析$@，$(MAKECMDGOALS)，$(filter-out)的作用
新建一个new-test.js
![image.png](https://cdn.nlark.com/yuque/0/2021/png/191608/1638263381407-10c5da2a-b36c-4022-b658-7ec7469d4857.png#clientId=u58d5d4f9-bfb8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=465&id=u70d6b996&margin=%5Bobject%20Object%5D&name=image.png&originHeight=465&originWidth=677&originalType=binary&ratio=1&rotation=0&showTitle=false&size=65839&status=done&style=none&taskId=u796840f9-692a-451c-877d-1a900611f90&title=&width=677)
### $@ 自动变量
在makefile文件中新增一行命令，然后执行make new-test zujian 组件
![image.png](https://cdn.nlark.com/yuque/0/2021/png/191608/1638263588379-ac24c203-eec9-4265-826a-b8513f3feffe.png#clientId=u58d5d4f9-bfb8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=211&id=u4e1f5714&margin=%5Bobject%20Object%5D&name=image.png&originHeight=211&originWidth=564&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34581&status=done&style=none&taskId=u83c878b9-64a1-4c88-b145-3b475e21180&title=&width=564)
可以发现$@就是对应所执行的目标new-test
### $(MAKECMDGOALS) 特殊变量
同上操作
![image.png](https://cdn.nlark.com/yuque/0/2021/png/191608/1638263741391-f20892bc-300a-488b-84bc-3d40de11fbbd.png#clientId=u58d5d4f9-bfb8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=237&id=ufa3f813b&margin=%5Bobject%20Object%5D&name=image.png&originHeight=237&originWidth=583&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40049&status=done&style=none&taskId=u29a0402e-42ca-41e2-a0fd-68e8cee6668&title=&width=583)
make 在执行时，会设置一个特殊的变量 MAKECMDGOALS，该变量记录了命令行参数指定的目标列表
通过$(MAKECMDGOALS)就能获取make后面的参数
### $(filter-out) 反过滤函数
使用时的格式$(filter-out PATTERN…,TEXT)，在js中应该都使用过filter去过滤数组，返回的是符合条件的数据，这里的filter-out意思就是过滤掉字串“TEXT”中所有符合模式“PATTERN”的，保留所有不符合此模式的。
返回值 ：空格分割的“TEXT”字串中所有不符合模式“PATTERN”的字串。
例如：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/191608/1638264363362-444b9b84-6cdb-47a3-9103-45ddd3c8db0f.png#clientId=u58d5d4f9-bfb8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=169&id=u3b73903e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=169&originWidth=439&originalType=binary&ratio=1&rotation=0&showTitle=false&size=28794&status=done&style=none&taskId=u27a493c6-e3de-4e89-85d7-308cf807912&title=&width=439)
## make new-test zujian 组件
所以在执行make new-test zujian 组件时
new:
node build/bin/new.js $(filter-out $@,$(MAKECMDGOALS))
在new.js中通过process.argv所获取到的参数就是从
$(MAKECMDGOALS)对应的new-test zujian 组件这三个目标列表中过滤掉
$@对应的new-test，就是我们需要的英文名和中文名
const componentname=process.argv[2];
const chineseName=process.argv[3] || componentname;
![image.png](https://cdn.nlark.com/yuque/0/2021/png/191608/1638264887133-0b58d012-fc9e-4acc-8a3c-3d0992074414.png#clientId=u58d5d4f9-bfb8-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=217&id=u0eb2e750&margin=%5Bobject%20Object%5D&name=image.png&originHeight=217&originWidth=584&originalType=binary&ratio=1&rotation=0&showTitle=false&size=40482&status=done&style=none&taskId=ufccfe0a8-7392-40ee-b67a-4f35758d635&title=&width=584)
