
module.exports = {
    "/write/docs/": [
        {
            title: "文档",
            collapsable: false,
            items: [
                {
                    text: "Vue3配置",
                    title: "Vue3配置",
                    link: "/write/docs/Vue3Config",
                },
                {
                    text: "搭建vuepress",
                    title: "搭建vuepress",
                    link: "/write/docs/VuepressConfig",
                },
                {
                    text: "代码规范格式化配置",
                    title: "代码规范格式化配置",
                    link: "/write/docs/codeFormat",
                },
                {
                    text: "vuepress本地复制代码插件",
                    title: "vuepress本地复制代码插件",
                    link: "/write/docs/vuepressPlugin",
                },
                {
                    text: "vuepress配置github pages域名访问",
                    title: "vuepress配置github pages域名访问",
                    link: "/write/docs/githubPages",
                },
                {
                    text: "动态规划：为什么是dp[n-2]+dp[n-1]",
                    title: "动态规划：为什么是dp[n-2]+dp[n-1]",
                    link: "/write/docs/dp-step",
                },
                {
                    text: "学习vue3-nuxt",
                    title: "学习vue3-nuxt",
                    link: "/write/docs/vue3-nuxt",
                },
                {
                    text: "自定义一个vitepress的blog",
                    title: "自定义一个vitepress的blog",
                    link: "/write/docs/vitepress",
                },
                {
                    text: "通过gitbash配置快捷指令",
                    title: "通过gitbash配置快捷指令",
                    link: "/write/docs/alias",
                },
                {   text: "获取vitepress所有文章数据", 
                    title: "获取vitepress所有文章数据",
                    link: "/write/docs/vitepress-data", 
                },
                {   text: "vitepress配置评论", 
                    title: "vitepress配置评论",
                    link: "/write/docs/vitepress-gitalk", 
                },
                { text: "图片懒加载", title: "图片懒加载", link: "/write/docs/lazyload-img", },
                { text: "LRU缓存", title: "LRU缓存", link: "/write/docs/LRUCache", },
            ],
        },
    ],
    "/write/sourceRead/": [
        {
            title: "源码阅读",
            link: "/",
            collapsable: false,
            items: [
                {
                    text: "ElemetUI make new",
                    title: "ElemetUI make new",
                    link: "/write/sourceRead/element-make-new",
                },
                {
                    text: "包管理器only-allow",
                    title: "包管理器only-allow",
                    link: "/write/sourceRead/only-allow",
                },
            ],
        },
    ],
    "/write/project/": [
        {
            title: "项目",
            link: "/",
            collapsable: false,
            items: [
                {
                    text: "electron仿网易云音乐桌面版",
                    title: "electron仿网易云音乐桌面版",
                    link: "/write/project/electron-cloud-music",
                },
                {
                    text: "trao开发微信小程序",
                    title: "trao开发微信小程序",
                    link: "/write/project/my-trao",
                },
                {
                    text: "mpvue仿网易云音乐",
                    title: "mpvue仿网易云音乐",
                    link: "/write/project/wx-cloud-music",
                },
                {
                    text: "看看吃啥",
                    title: "看看吃啥",
                    link: "/write/project/eat",
                },
            ],
        },
    ],
    'write/algorithms-temp/': [{
        text: "算法模版",
        title: "算法模版",
        link: "/",
        collapsable: false,
        items: [
            {
                text: "数据有序，相同元素保留 `k` 位模版",
                title: "数据有序，相同元素保留 `k` 位模版",
                link: "write/algorithms-temp/remove-duplicates",
            },
            {
                text: "滑动窗口模板",
                title: "滑动窗口模板",
                link: "write/algorithms-temp/sliding-window",
            },
            {
                text: "从一个字符串中找另一个字符串模版",
                title: "从一个字符串中找另一个字符串模版",
                link: "write/algorithms-temp/find-str-in-other",
            },
            {
                text: "树的前中后序遍历",
                title: "树的前中后序遍历",
                link: "write/algorithms-temp/traverse-tree",
            },
            {
                text: "蓝红二分模板",
                title: "蓝红二分模板",
                link: "write/algorithms-temp/bluered",
            },
        ]
    },
    ],
    'write/algorithms/': [{
        title: "算法学习",
        link: "/",
        collapsable: false,
        items: [
            {
                text: "03.无重复字符的最长子串",
                title: "03.无重复字符的最长子串",
                link: "/write/algorithms/leetCode03",
            },
            {
                text: "11.盛水最多的容器",
                title: "11.盛水最多的容器",
                link: "/write/algorithms/leetCode11",
            },
            {
                text: "15.三数之和",
                title: "15.三数之和",
                link: "/write/algorithms/leetCode15",
            },
            {
                text: "19.删除链表的倒数第 N 个结点",
                title: "19.删除链表的倒数第 N 个结点",
                link: "/write/algorithms/leetCode19",
            },
            {
                text: "26.删除有序数组中的重复项",
                title: "26.删除有序数组中的重复项",
                link: "/write/algorithms/leetCode26",
            },
            {
                text: "27.移除元素",
                title: "27.移除元素",
                link: "/write/algorithms/leetCode27",
            },
            {
                text: "88.合并两个有序数组",
                title: "88.合并两个有序数组",
                link: "/write/algorithms/leetCode88",
            },
            {
                text: "345.反转字符串中的元音字母",
                title: "345.反转字符串中的元音字母",
                link: "/write/algorithms/leetCode345",
            },
            {
                text: "413.等差数列划分",
                title: "413.等差数列划分",
                link: "/write/algorithms/leetCode413",
            },
            {
                text: "424.替换后的最长重复字符",
                title: "424.替换后的最长重复字符",
                link: "/write/algorithms/leetCode424",
            },
            {
                text: "438.找到字符串中所有字母异位词",
                title: "438.找到字符串中所有字母异位词",
                link: "/write/algorithms/leetCode438",
            },
            {
                text: "443.压缩字符串",
                title: "443.压缩字符串",
                link: "/write/algorithms/leetCode443",
            },
            {
                text: "485.最大连续 1 的个数",
                title: "485.最大连续 1 的个数",
                link: "/write/algorithms/leetCode485",
            },
            {
                text: "524.通过删除字母匹配到字典里最长单词",
                title: "524.通过删除字母匹配到字典里最长单词",
                link: "/write/algorithms/leetCode524",
            },
            {
                text: "581.最短无序连续子数组",
                title: "581.最短无序连续子数组",
                link: "/write/algorithms/leetCode581",
            },
            {
                text: "594.最长和谐子序列",
                title: "594.最长和谐子序列",
                link: "/write/algorithms/leetCode594",
            },
            {
                text: "611.有效三角形的个数",
                title: "611.有效三角形的个数",
                link: "/write/algorithms/leetCode611",
            },
            {
                text: "633.平方数之和",
                title: "633.平方数之和",
                link: "/write/algorithms/leetCode633",
            },
            {
                text: "825.适龄的朋友",
                title: "825.适龄的朋友",
                link: "/write/algorithms/leetCode825",
            },
            {
                text: "881.救生艇",
                title: "881.救生艇",
                link: "/write/algorithms/leetCode881",
            },
            {
                text: "930.和相同的二元字数组",
                title: "930.和相同的二元字数组",
                link: "/write/algorithms/leetCode930",
            },
            {
                text: "992.K个不同整数的子数组",
                title: "992.K个不同整数的子数组",
                link: "/write/algorithms/leetCode992",
            },
            {
                text: "1004.最大连续1的个数 III",
                title: "1004.最大连续1的个数 III",
                link: "/write/algorithms/leetCode1004",
            },
            {
                text: "1221.分割平衡字符串",
                title: "1221.分割平衡字符串",
                link: "/write/algorithms/leetCode1221",
            },
            {
                text: "242.有效的字母异位词",
                title: "242.有效的字母异位词",
                link: "/write/algorithms/leetCode242",
            },
            {
                text: "20.有效的括号",
                title: "20.有效的括号",
                link: "/write/algorithms/leetCode20",
            },
            {
                text: "1446.连续字符",
                title: "1446.连续字符",
                link: "/write/algorithms/leetCode1446",
            },
            {
                text: "30.串联所有单词的子串",
                title: "30.串联所有单词的子串",
                link: "/write/algorithms/leetCode30",
            },
            {
                text: "219.存在重复元素 II",
                title: "219.存在重复元素 II",
                link: "/write/algorithms/leetCode219",
            },
            {
                text: "187.重复的DNA序列",
                title: "187.重复的DNA序列",
                link: "/write/algorithms/leetCode187",
            },
            {
                text: "567.字符串的排列",
                title: "567.字符串的排列",
                link: "/write/algorithms/leetCode567",
            },
            {
                text: "1208.尽可能使字符串相等",
                title: "1208.尽可能使字符串相等",
                link: "/write/algorithms/leetCode1208",
            },
            {
                text: "101.对称二叉树",
                title: "101.对称二叉树",
                link: "/write/algorithms/leetCode101",
            },
            {
                text: "112.路径总和",
                title: "112.路径总和",
                link: "/write/algorithms/leetCode112",
            },
            {
                text: "90.子集 II",
                title: "90.子集 II",
                link: "/write/algorithms/leetCode90",
            },
            {
                text: "704.二分查找",
                title: "704.二分查找",
                link: "/write/algorithms/leetCode704",
            },
            {
                text: "33.搜索旋转排序数组",
                title: "33.搜索旋转排序数组",
                link: "/write/algorithms/leetCode33",
            },
            {
                text: "278.第一个错误的版本",
                title: "278.第一个错误的版本",
                link: "/write/algorithms/leetCode278",
            },
            {
                text: "剑指 Offer 53 - II.0～n-1中缺失的数字",
                title: "剑指 Offer 53 - II.0～n-1中缺失的数字",
                link: "/write/algorithms/leetCode_o53",
            },
            {
                text: "62.不同路径",
                title: "62.不同路径",
                link: "/write/algorithms/leetCode62",
            },
            {
                text: "63.不同路径II",
                title: "63.不同路径II",
                link: "/write/algorithms/leetCode63",
            },
            {
                text: "64.最小路径和",
                title: "64.最小路径和",
                link: "/write/algorithms/leetCode64",
            },
            {
                text: "343.整数拆分",
                title: "343.整数拆分",
                link: "/write/algorithms/leetCode343",
            },
            {
                text: "96.不同的二叉搜索树",
                title: "96.不同的二叉搜索树",
                link: "/write/algorithms/leetCode96",
            },
            {
                text: "396.旋转函数",
                title: "396.旋转函数",
                link: "/write/algorithms/leetCode396",
            },
            {
                text: "494.目标和",
                title: "494.目标和",
                link: "/write/algorithms/leetCode494",
            },
            {
                text: "377.组合总和Ⅳ",
                title: "377.组合总和Ⅳ",
                link: "/write/algorithms/leetCode377",
            },
            {
                text: "1663.具有给定数值的最小字符串",
                title: "1663.具有给定数值的最小字符串",
                link: "/write/algorithms/leetCode1663",
            },
            {
                text: "875.爱吃香蕉的珂珂",
                title: "875.爱吃香蕉的珂珂",
                link: "/write/algorithms/leetCode875",
            },
            {
                text: "697.数组的度",
                title: "697.数组的度",
                link: "/write/algorithms/leetCode697",
            },
            {
                text: "41.缺失的第一个正数",
                title: "41.缺失的第一个正数",
                link: "/write/algorithms/leetCode41",
            },
            {
                text: "54.螺旋矩阵",
                title: "54.螺旋矩阵",
                link: "/write/algorithms/leetCode54",
            },
            {
                text: "926.将字符串翻转到单调递增",
                title: "926.将字符串翻转到单调递增",
                link: "/write/algorithms/leetCode926",
            },
            {
                text: "890.查找和替换模式",
                title: "890.查找和替换模式",
                link: "/write/algorithms/leetCode890",
            },
            {
                text: "696.计数二进制子串",
                title: "696.计数二进制子串",
                link: "/write/algorithms/leetCode696",
            },
            {
                text: "538.计数二进制子串",
                title: "538.计数二进制子串",
                link: "/write/algorithms/leetCod538",
            },
            {
                text: "739.每日温度",
                title: "739.每日温度",
                link: "/write/algorithms/leetCode739",
            },
            {
                text: "222.完全二叉树的节点个数",
                title: "222.完全二叉树的节点个数",
                link: "/write/algorithms/leetCode222",
            },
            {
                text: "687.最长同值路径",
                title: "687.最长同值路径",
                link: "/write/algorithms/leetCode687",
            },
            {
                text: "662.二叉树最大宽度",
                title: "662.二叉树最大宽度",
                link: "/write/algorithms/leetCode662",
            },
            {
                text: "623.在二叉树中增加一行",
                title: "623.在二叉树中增加一行",
                link: "/write/algorithms/leetCode623",
            },
            {
                text: "655.输出二叉树",
                title: "655.输出二叉树",
                link: "/write/algorithms/leetCode655",
            },
            {
                text: "589.N叉树的前序遍历",
                title: "589.N叉树的前序遍历",
                link: "/write/algorithms/leetCode589",
            },
            {
                text: "449.序列化和反序列化二叉搜索树",
                title: "449.序列化和反序列化二叉搜索树",
                link: "/write/algorithms/leetCode449",
            },
            {
                text: "530.二叉搜索树的最小绝对差",
                title: "530.二叉搜索树的最小绝对差",
                link: "/write/algorithms/leetCode530",
            },
            {
                text: "230.二叉搜索树中第K小的元素",
                title: "230.二叉搜索树中第K小的元素",
                link: "/write/algorithms/leetCode230",
            },
            {
                text: "108.将有序数组转换为二叉搜索树",
                title: "108.将有序数组转换为二叉搜索树",
                link: "/write/algorithms/leetCode108",
            },
            {
                text: "42.接雨水",
                title: "42.接雨水",
                link: "/write/algorithms/leetCode42",
            },
            {
                text: "143.重排链表",
                title: "143.重排链表",
                link: "/write/algorithms/leetCode143",
            },
            {
                text: "128.最长连续序列",
                title: "128.最长连续序列",
                link: "/write/algorithms/leetCode128",
            },
            {
                text: "148.排序链表",
                title: "148.排序链表",
                link: "/write/algorithms/leetCode148",
            },
            {
                text: "377.组合总和Ⅳ",
                title: "377.组合总和Ⅳ",
                link: "/write/algorithms/leetCode377",
            },
            {
                text: "875.爱吃香蕉的珂珂",
                title: "875.爱吃香蕉的珂珂",
                link: "/write/algorithms/leetCode875",
            },
            {
                text: "697.数组的度",
                title: "697.数组的度",
                link: "/write/algorithms/leetCode697",
            },
            {
                text: "200.岛屿数量",
                title: "200.岛屿数量",
                link: "/write/algorithms/leetCode200",
            },
            {
                text: "394.字符串解码",
                title: "394.字符串解码",
                link: "/write/algorithms/leetCode394",
            },
            {
                text: "347.前 K 个高频元素",
                title: "347.前 K 个高频元素",
                link: "/write/algorithms/leetCode347",
            },
            {
                text: "873.最长的斐波那契子序列的长度",
                title: "873.最长的斐波那契子序列的长度",
                link: "/write/algorithms/leetCode873",
            },
            {
                text: "剑指Offer26.树的子结构",
                title: "剑指Offer26.树的子结构",
                link: "/write/algorithms/leetCode_o26.md",
            },
            {
                text: "239.滑动窗口最大值",
                title: "239.滑动窗口最大值",
                link: "/write/algorithms/leetCode239.md",
            },
            {
                text: "155.最小栈",
                title: "155.最小栈",
                link: "/write/algorithms/leetCode155.md",
            },
            {
                text: "36.有效的数独",
                title: "36.有效的数独",
                link: "/write/algorithms/leetCode36.md",
            },
            {
                text: "40.组合总和II",
                title: "40.组合总和II",
                link: "/write/algorithms/leetCode40.md",
            },
            {
                text: "304.二维区域和检索 - 矩阵不可变",
                title: "304.二维区域和检索 - 矩阵不可变",
                link: "/write/algorithms/leetCode304.md",
            },
            {
                text: "378.有序矩阵中第 K 小的元素",
                title: "378.有序矩阵中第 K 小的元素",
                link: "/write/algorithms/leetCode378.md",
            },
            {
                text: "95.不同的二叉搜索树 II",
                title: "95.不同的二叉搜索树 II",
                link: "/write/algorithms/leetCode95.md",
            },
            {
                text: "76.最小覆盖子串",
                title: "76.最小覆盖子串",
                link: "/write/algorithms/leetCode76.md",
            },
        ],
    }
    ],
}
