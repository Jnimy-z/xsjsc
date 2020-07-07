// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  logouttap:function(){
    wx.redirectTo({
      url: '/pages/start/start',
    })
  },

  /**
   * 跳转到订单界面
   * @param {*} options 
   */
  goToOrder:function(){
    wx.navigateTo({
      url: '/pages/orders/orders',
    })
  },
  /**
   * 跳转到地址界面
   * @param {*} options 
   */
  goToAddress:function(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  /**
   * 跳转到收藏界面
   * @param {*} options 
   */
  goToCollection:function(){
    wx.navigateTo({
      url: '/pages/collection/collection',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }else{
      wx.getUserInfo({
        success: res=>{
          app.globalData.userInfo=res.userInfo
          this.setData({
            userInfo: res.userInfo
          })
        },
      })
    }
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