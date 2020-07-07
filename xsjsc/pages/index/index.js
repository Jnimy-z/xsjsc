//index.js
//获取应用实例
const app = getApp()


// {id: 1, imgs: "../../images/index/jingxuan1.jpg", name: "玉兰油", price: 123, person: 12},
// {id: 2, imgs: "../../images/index/jingxuan2.jpg", name: "玉兰油", price: 213, person: 45},
// {id: 3, imgs: "../../images/index/jingxuan3.jpg", name: "玉兰油", price: 122, person: 56},
// {id: 4, imgs: "../../images/index/jingxuan4.jpg", name: "玉兰油", price: 53, person: 78},
// {id: 5, imgs: "../../images/index/jingxuan5.jpg", name: "玉兰油", price: 67, person: 23}


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: ['/images/index/ban1.jpg', //轮播图图片
              '/images/index/ban2.jpg',
              '/images/index/ban3.jpg',
              '/images/index/ban4.jpg'],
    news: [//新闻动态数据
        {id: 1,
          data: "02-10",
          text: "2020春节放假通知"},
        {id: 2,
          data: "02-10",
          text: "2020春节放假通知"},
        {id: 3,
          data: "02-10",
          text: "2020春节放假通知"}
    ],
    
    //精选推荐数据
    boutique:[],
    //最新产品数据
    newsst:[],
    //商家推荐产品
    hostest: []
  },

  //跳转到所有商品页面
  goMoreGoods(){
    wx.navigateTo({
      url: '/pages/more_goods/more_goods',
    })
  },
  
  //到销量排行页面
  toSaleOrder(){
    wx.navigateTo({
      url: '/pages/sale_order/sale_order',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onready")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onshow")
  },
  //通过精选推荐到商品详情事件
  toBoutique: function(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.dataset.id,
    })
  },
  onLoad: function () {
    // 捕获this
    var that = this;
    //  console.log("onload")
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 获取精选推荐数据
    wx.request({
      url: app.globalData.webJavaserver + 'wx/index/recommend',
      header:{
        "content-type": "application/json"
      },
      success(res){
        console.log(res.data)
        // 设置数据
        that.setData({
          boutique:res.data
        })
      }
    })
    // 获取最新产品数据
    wx.request({
      url: app.globalData.webJavaserver + 'wx/index/oldest',
      header:{
        "content-type": "application/json"
      },
      success(res){
        console.log(res.data)
        // 设置数据
        that.setData({
          newsst:res.data
        })
      }
    })
    // 获取商家推荐数据
    wx.request({
      url: app.globalData.webJavaserver + 'wx/index/hot',
      header:{
        "content-type": "application/json"
      },
      success(res){
        console.log(res.data)
        // 设置数据
        that.setData({
          hotest:res.data
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
