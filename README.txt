2020-6-27
微信小程序简单介绍
项目功能简单介绍
项目搭建初步
项目文件介绍

.Js文件：三个文件都是数据和函数
app.js里面的数据都是用’App({‘包围，里面是全局函数
index.js里面需要获取应用实例 const app = new App();即定义全局变量
logs.js里面需要require(‘../../utils/util.js’)
Index.js和log.js除了全局变量以外都把数据和函数包裹在Page({里面
.Json文件：存放配置信息，配置顶部以及底部标签栏
app.json存放全局配置，文件路径，异常信息等
pages字段：用于描述当前小程序的所有页面路径（一个文件夹就是一个页面，用于指定页面由哪些文件组成）
window字段：用于设置小程序的状态栏，导航条，标题，窗口颜色（不控制中间部分）
backgroundTextStyle:下拉样式
navigationBarBackgroundColor:导航栏背景颜色，仅支持背景颜色
navigationBarTitleText:导航栏标题文字内容
navigationBarTextStyle:导航栏标题文字颜色（只支持黑白两色black/white）
backgroundColror:下拉窗口背景颜色（和enablePullDownRefresh配合使用）
backgroundtextStyle:下拉样式（和enablePullDownRefresh配合使用）
enablePullDownRefresh:是否可以下拉刷新
tabBar字段
color:工具栏上面文字默认颜色
selectedColor:激活状态字体颜色
position:tabbar的位置（top/bottom）（如果设置成top，就会显示在顶部，图标不再显示）
list:表示tab列表
pagePath:要导航到的页面路径
text:按钮文字
iconPath:默认图标路径
selectedIconPath:激活状态的图标路径（40kb，建议81px*81px）
borderStyle:工具栏上方线条颜色（黑色与白色）
backgroundColor:tabBar的背景颜色
index.json和logs.json存放局部配置以及某些样式的值
.wxml文件：类似html用标签包裹的界面，写的是页面中间部分
.wxss文件：类似css文件
app.wxss存放全局样式信息
index.wxss存放index页面的样式信息
log.wxss存放logs页面的样式信息

批量生成四个文件：
第一种：新建文件夹-->新建page
第二种：直接在全局配置pages里面创建路径
pages页面里的最上面的路径就是刚进入时程序显示的页面，可通过alt+方向键移动

工具配置：project.config.json（个性化配置）
单页面配置：page.json
页面配置项等同于全局配置里面的window配置项

框架接口：
1、app 注册小程序，必须在app.js中调用，且只能调用一次
onLaunch():监听小程序初始化
2、getApp()获取小程序全局唯一的实例
3、page{
(1)data:页面的初始数据
(2)onload()监听页面加载（一个页面只会调用一次）
(3)onShow()页面显示
(4)onReady()监听页面初次渲染完成（一个页面只会调用一次）
4、模块化：require/exports
5、基础功能
console.log()向调试面板输出信息或者日志
console.debug()
console.info()
console.warn()
console.error()等
6、定时器
(1)setTimeout/clearTimeout(延迟多少时间运行
(2)setInterval/clearIntervar(间隔多少时间运行