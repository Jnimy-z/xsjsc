// pages/orders/orders.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 0,
    orders_noList:[{id: 1,address: "龙泉驿某某地",name: "玉兰油", imgs: "jingxuan1.jpg", stock: 123, price: 245, shopNum: 1},
    {id: 2,name: "欧莱雅",address: "龙泉驿某某地", imgs: "jingxuan2.jpg", stock: 123, price: 245, shopNum: 1} ],
    orders_yesList:[],
    orders_overList: [],
  },

  bindTap:function(e){
    console.log(e.currentTarget.dataset.index)
    const index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      curIndex:index
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    if(e.curIndex){
      that.setData({
        curIndex: Number(e.curIndex)
      })
    }
  },
  delBtn:function(e){
    var that = this
    console.log(e.currentTarget.dataset.id)
    wx.showModal({
      title: '删除',
      content: "确认删除这个订单",
      success(res){
        if(res.confirm){
          console.log("删除成功")
          //根据商品id删除订单
          wx.request({
            url: 'url',
            header:{
              "content-type": "application/json"
            },
            success(res){
              that.onShow()
            }
          })
        }else if(res.cancel){
          console.log("取消删除")
        }
      }
    })
  },
  goPayment:function(e){
    var that = this
    console.log(e.currentTarget.dataset.id)
    //根据id获取点击的是哪一个订单（获取相对应的数据）
    var orderList;
    for(var i = 0; i < that.data.orders_noList.length; i++){
      if(that.data.orders_noList[i].id == e.currentTarget.dataset.id){
        orderList = that.data.orders_noList[i]
      }
    }
    //付款成功与失败
    wx.showModal({
      title: '付款',
      content: "请付款",
      success(res){
        if(res.confirm){
          wx.request({
            url: 'url',
            header:{

            },
            success(res){
              //添加到待发货
              wx.request({
                url: 'url',
                method: "post",
                data:{
                  phone: orderList.phone,
                  address: orderList.address,
                  name: orderList.name,
                  price: orderList.price,
                  shopNum: orderList.shopNum,
                  //imgs:..
                  //...
                },
                header: {
                  "content-type": "applcation/json",
                },
                success(res){
                  that.onShow();
                  that.setData({
                    curIndex: 1
                  })
                }
              })
            }
          })
        }else if(res.cancel){

        }
      }
    })

  },
  goReceipt:function(e){
    console.log(e.currentTarget.dataset.id)
    var that = this
    wx.showModal({
      title: '收货',
      content: "确认收到收货",
      success(res){
        if(res.confirm){
          //可以添加历史购买记录归档
          wx.request({
            url: 'url',
            header: {
              "content-type": "application/json"
            },
            success(res){
              wx.showToast({
                title: '收获成功',
                icon: "success",
                duration: 2000
              })
              console.log("确认收到货物")
              that.onShow()
            }
          })
        }else if(res.cancel){

        }
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
    var that = this
    //获取待付款的数据
    wx.request({
      url: app.globalData.webJavaserver+'url',
      header:{
        "content-type": "application/json"
      },
      success(res){
        console.log(res.data)
        that.setData({
          orders_noList:res.data
        })
      }
    })
    wx.request({
      url: app.globalData.webJavaserver+'url',
      header:{
        "content-type": "application/json"
      },
      success(res){
        console.log(res.data)
        that.setData({
          orders_yesList:res.data
        })
      }
    })
    wx.request({
      url: app.globalData.webJavaserver+'url',
      header:{
        "content-type": "application/json"
      },
      success(res){
        console.log(res.data)
        that.setData({
          orders_overList:res.data
        })
      }
    })
  },
  toindex:function(e){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  tomine:function(e){
    wx.switchTab({
      url: '/pages/mine/mine',
    })
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