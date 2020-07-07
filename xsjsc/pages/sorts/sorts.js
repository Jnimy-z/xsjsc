// pages/sorts/sorts.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortsList:[
            {id:1,listId:"sorts1",title:"基础护理",shopList:[
              {shopId:15,shopImg:"../../images/index/jingxuan15.jpg",shopTitle:"喜马拉雅",price:"80"},
              {shopId:14,shopImg:"../../images/index/jingxuan14.jpg",shopTitle:"佰草集",price:"35"},
              {shopId:13,shopImg:"../../images/index/jingxuan13.jpg",shopTitle:"韩东",price:"25"},
              {shopId:12,shopImg:"../../images/index/jingxuan12.jpg",shopTitle:"御泥坊",price:"15"},
              {shopId:11,shopImg:"../../images/index/jingxuan11.jpg",shopTitle:"小迷糊",price:"20"},
              {shopId:6,shopImg:"../../images/index/jingxuan6.jpg",shopTitle:"韩东",price:"20"},
              {shopId:5,shopImg:"../../images/index/jingxuan5.jpg",shopTitle:"百雀羚",price:"30"}
            ]},
            {id:2,listId:"sorts2",title:"防晒",shopList:[
              {shopId:15,shopImg:"../../images/index/jingxuan15.jpg",shopTitle:"喜马拉雅",price:"80"},
              {shopId:14,shopImg:"../../images/index/jingxuan14.jpg",shopTitle:"佰草集",price:"35"},
              {shopId:13,shopImg:"../../images/index/jingxuan13.jpg",shopTitle:"韩东",price:"25"},
              {shopId:12,shopImg:"../../images/index/jingxuan12.jpg",shopTitle:"御泥坊",price:"15"},
              {shopId:11,shopImg:"../../images/index/jingxuan11.jpg",shopTitle:"小迷糊",price:"20"},
              {shopId:6,shopImg:"../../images/index/jingxuan6.jpg",shopTitle:"韩东",price:"20"},
              {shopId:5,shopImg:"../../images/index/jingxuan5.jpg",shopTitle:"百雀羚",price:"30"}
            ]},
            {id:3,listId:"sorts3",title:"洁面",shopList:[
              {shopId:15,shopImg:"../../images/index/jingxuan15.jpg",shopTitle:"喜马拉雅",price:"80"},
              {shopId:14,shopImg:"../../images/index/jingxuan14.jpg",shopTitle:"佰草集",price:"35"},
              {shopId:13,shopImg:"../../images/index/jingxuan13.jpg",shopTitle:"韩东",price:"25"},
              {shopId:12,shopImg:"../../images/index/jingxuan12.jpg",shopTitle:"御泥坊",price:"15"},
              {shopId:11,shopImg:"../../images/index/jingxuan11.jpg",shopTitle:"小迷糊",price:"20"},
              {shopId:6,shopImg:"../../images/index/jingxuan6.jpg",shopTitle:"韩东",price:"20"},
              {shopId:5,shopImg:"../../images/index/jingxuan5.jpg",shopTitle:"百雀羚",price:"30"}
            ]},
            {id:4,listId:"sorts4",title:"男士",shopList:[
              {shopId:18,shopImg:"../../images/index/jingxuan18.jpg",shopTitle:"御泥坊",price:"25"},
              {shopId:17,shopImg:"../../images/index/jingxuan17.jpg",shopTitle:"悦宝莱",price:"2"},
              {shopId:16,shopImg:"../../images/index/jingxuan16.jpg",shopTitle:"自然堂",price:"70"},
              {shopId:18,shopImg:"../../images/index/jingxuan18.jpg",shopTitle:"御泥坊",price:"25"},
              {shopId:17,shopImg:"../../images/index/jingxuan17.jpg",shopTitle:"悦宝莱",price:"2"}
            ]},
            {id:5,listId:"sorts5",title:"面部底妆",shopList:[
              {shopId:15,shopImg:"../../images/index/jingxuan15.jpg",shopTitle:"喜马拉雅",price:"80"},
              {shopId:14,shopImg:"../../images/index/jingxuan14.jpg",shopTitle:"佰草集",price:"35"},
              {shopId:13,shopImg:"../../images/index/jingxuan13.jpg",shopTitle:"韩东",price:"25"},
              {shopId:12,shopImg:"../../images/index/jingxuan12.jpg",shopTitle:"御泥坊",price:"15"},
              {shopId:11,shopImg:"../../images/index/jingxuan11.jpg",shopTitle:"小迷糊",price:"20"},
              {shopId:6,shopImg:"../../images/index/jingxuan6.jpg",shopTitle:"韩东",price:"20"},
              {shopId:5,shopImg:"../../images/index/jingxuan5.jpg",shopTitle:"百雀羚",price:"30"}
            ]},
            {id:6,listId:"sorts6",title:"眼部彩妆",shopList:[
              {shopId:15,shopImg:"../../images/index/jingxuan15.jpg",shopTitle:"喜马拉雅",price:"80"},
              {shopId:14,shopImg:"../../images/index/jingxuan14.jpg",shopTitle:"佰草集",price:"35"},
              {shopId:13,shopImg:"../../images/index/jingxuan13.jpg",shopTitle:"韩东",price:"25"},
              {shopId:12,shopImg:"../../images/index/jingxuan12.jpg",shopTitle:"御泥坊",price:"15"},
              {shopId:11,shopImg:"../../images/index/jingxuan11.jpg",shopTitle:"小迷糊",price:"20"},
              {shopId:6,shopImg:"../../images/index/jingxuan6.jpg",shopTitle:"韩东",price:"20"},
              {shopId:5,shopImg:"../../images/index/jingxuan5.jpg",shopTitle:"百雀羚",price:"30"}
            ]},
            {id:7,listId:"sorts7",title:"其他彩妆",shopList:[
              {shopId:15,shopImg:"../../images/index/jingxuan15.jpg",shopTitle:"喜马拉雅",price:"80"},
              {shopId:14,shopImg:"../../images/index/jingxuan14.jpg",shopTitle:"佰草集",price:"35"},
              {shopId:13,shopImg:"../../images/index/jingxuan13.jpg",shopTitle:"韩东",price:"25"},
              {shopId:12,shopImg:"../../images/index/jingxuan12.jpg",shopTitle:"御泥坊",price:"15"},
              {shopId:11,shopImg:"../../images/index/jingxuan11.jpg",shopTitle:"小迷糊",price:"20"},
              {shopId:6,shopImg:"../../images/index/jingxuan6.jpg",shopTitle:"韩东",price:"20"},
              {shopId:5,shopImg:"../../images/index/jingxuan5.jpg",shopTitle:"百雀羚",price:"30"}
            ]}
          ],
    curIndex:0,
    isScroll: false
  },
  toShopDetails:function(e){
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  switchTab(e){
    const that = this;
    that.setData({
      isScroll: true
    })
    setTimeout(function(){
      that.setData({
        toView: e.currentTarget.dataset.id,
        curIndex: e.currentTarget.dataset.index
      })
    },0)
    setTimeout(function(){
      that.setData({
        isScroll: false
      })
    },1)
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取分类数据
    wx.request({
      url: 'app.globalData.webJavaserver' + '/',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})