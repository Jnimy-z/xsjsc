// pages/address/address.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: []
  },
  //修改地址数据
  updateAddress: function(e){
    wx.navigateTo({
      url: '/pages/updateAddress/updateAddress?dataall='+JSON.stringify(e.currentTarget.dataset.dataall),
    })
  },

  //删除地址数据
  deleteAddress:function(e){
    console.log(e)
    var that = this
    wx.showModal({
      title: '删除',
      content: "确认删除？",
      success(res){
        if(res.confirm){
          wx.request({
            url: app.globalData.webJavaserver+'/',
            header:{
              "content-type": "application/json"
            },
            success(res){
              this.onLoad()
            }
          })
        }else if(res.cancel){
          console.log("取消删除")
        }
      }
    })
  },

  toAddAddress:function(){
    wx.navigateTo({
      url: '/pages/newAddress/newAddress',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取所有地址的数据
    wx.request({
      url: app.globalData.webJavaserver + 'wx/getaddr/' + app.globalData.openid,
      header:{
        "content-type": "application/json"
      },
      success(res){
        console.log(res.data)
        // 设置数据
        that.setData({
          address:res.data
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