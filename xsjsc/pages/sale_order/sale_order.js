// pages/sale_order/sale_order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // items:[
    //   {id: 1, imgs: "../../images/index/jingxuan1.jpg", name: "玉兰油babababbababababbababbabababbababbabababababbababababa", price: 123, person: 12, stock: 2000, description: "<p>玉兰油护肤套装你值得拥有。</p>", typename: "防晒"},
    //   {id: 2, imgs: "../../images/index/jingxuan2.jpg", name: "玉兰油", price: 213, person: 45, stock: 2000, description: "<p>玉兰油护肤套装你值得拥有。</p>", typename: ""},
    //   {id: 3, imgs: "../../images/index/jingxuan3.jpg", name: "玉兰油", price: 122, person: 56, stock: 2000, description: "<p>玉兰油护肤套装你值得拥有。</p>", typename: null},
    //   {id: 4, imgs: "../../images/index/jingxuan4.jpg", name: "玉兰油", price: 53, person: 78, stock: 2000, description: "<p>玉兰油护肤套装你值得拥有。</p>", typename: "防晒"},
    //   {id: 5, imgs: "../../images/index/jingxuan5.jpg", name: "玉兰油", price: 67, person: 23, stock: 2000, description: "<p>玉兰油护肤套装你值得拥有。</p>", typename: "防晒"}
    // ]
    items:[]
  },

  //跳转到商品详情页面
  toDetail: function(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.dataset.id,
    })
  },


  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/xsjsc/wx/product/top10',
      header: {
        "content-type": "application/json"
      },
      success(res){
        console.log(res.data)
        that.setData({
          items: res.data
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