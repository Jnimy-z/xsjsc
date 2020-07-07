// pages/collection/collection.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList: {},
  },
/**
 * 删除收藏
 * @param {*} e 
 */
  deleteCollection:function(e){
    var that = this;
    console.log(e.currentTarget.dataset.goodsId)
      wx.showModal({
        title: '删除',
        content: "确认删除",
        success(res){
          if(res.confirm){
            console.log("删除成功")
            wx.request({
              url: app.globalData.webJavaserver+'/',
              header: {
                "content-type": "application/json"
              },
              success(res){
                that.onload()
              }
            })
          }else if(res.cancel){
            console.log("取消删除")
          }
        }
      })
  },

  /*返回到个人中心*/
  toMine: function(){
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取收藏数据
    wx.request({
      url: app.globalData.webJavaserver+'/',
      header: {
        "centent-type": "application/json"
      },
      success(res){
        console.log(res.data)
        that.setData({
          collectionList: res.data
        })
      }
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