const wyNav = require('./nav.js')
const wySidebar = require('./sidebar.js')

module.exports = {
  title: "littlear", //网站标题
  description: "vitepress blog", //网站描述,会生成<meta>便签
  author: "Younglina", //作者
  base: '/', //根目录 如果您计划将站点部署到https://foo.github.io/bar/，那么您应该将base设置为“/bar/”
  markdown: {
    lineNumbers: true, //显示代码行数
  },
  lastUpdated: true, //以git提交的时间为更新时间
  themeConfig: {
    outline: [1,6],
    nav: wyNav, //导航栏配置
    sidebar: wySidebar, //侧边栏配置
    author: 'Younglina',
    lastUpdatedText: '上次更新时间', //最后更新时间文本
    logo: "/avatar.jpeg", //导航栏左侧头像
    docFooter: { //上下篇文本
      prev: '上一篇',
      next: '下一篇'
    },
    // footer: {
    //   copyright: 'Copyright © 2021-present Younglina'
    // },
    // socialLinks: [     // 信息栏展示社交信息
    //   { icon: 'github', link: "https://github.com/Younglina" },
    // ]
  },
};