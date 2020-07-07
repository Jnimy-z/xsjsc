// pages/payment/payment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: "",
    items: [
      {
        id: 1,
        start: 1,
        phone: "13232",
        address: "address****"
      }
    ],
    shopList: [],
    itemStart: false,//初始化默认选择
    addressId: "",//选择地址的ID
    orderStart: false,//订单初始化状态
    cart_shopStart: false,//判断是否是购物车来的数据
  },
  radioChange:function(e){
    this.setData({
      addressId: e.currentTarget.dataset.id
    })
  },
  //去支付
goPrice:function(){
  var that= this;
  //收货地址初始化
  var addressInfo;
  for(var i=0;i<that.data.items.length;i++){
    if(that.data.items[i].id == that.data.addressId){
      addressInfo = that.data.items[i]
    }
  }
  wx.showModal({
    title:"支付",
    content:"请支付",
    success:function(e){
      if(e.confirm){
        //支付成功后转到待发货界面
        for(var i=0;i<that.data.shopList.length;i++){
          wx.request({
            method: "POST",
            url: 'url',
            data:{
              phone:addressInfo.phone,
              address:addressInfo.address,
              name:that.data.shopList[i].name,
              price:that.data.shopList[i].price,
              shopNum:that.data.shopList[i].shopNum,
              stock:that.data.shopList[i].stock,
              num:that.data.shopList[i].num,
              imgs:that.data.shopList[i].imgs
            },
            header:{
              "content-type":"application/json"
            },
            success(res){
              that.setData({
                orderStart:true
              })
            }
          })
        }
        setTimeout(function(){
          if(that.data.orderStart){
            wx.navigateTo({
              url:"/pages/orders/orders?curIndex="+1
            })
          }
        },1000)
      }else if(e.cancel){
          //支付失败后跳转到待发货界面
          for(var i=0;i<that.data.shopList.length;i++){
            wx.request({
              method:"POST",
              url:app.globalData.webJavaserver+'url', 
              data:{
                phone:addressInfo.phone,
                address:addressInfo.address,
                name:that.data.shopList[i].name,
                price:that.data.shopList[i].price,
                shopNum:that.data.shopList[i].shopNum,
                stock:that.data.shopList[i].stock,
                num:that.data.shopList[i].num,
                imgs:that.data.shopList[i].imgs
              },
          header:{
            "content-type":"application/json"
          },
          success(res){
            that.setData({
              orderStart:true
            })
          }
        })
      } 
        setTimeout(function(){
          if(that.data.orderStart){
            wx.navigateTo({
              url:"/pages/orders/orders?curIndexe"+0
            })
          }
        },1000)
      }
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(e){
    var that = this;
    //获取设置的所有地址数据
    wx.request({
      url:app.globalData.webJavaserver+'',
      header: {
        'content-type':'application/json'
      },
      success(res){
        console.log(res.data)
        for(var i=e;i<res.data.length;i++){
          if(res.data[i].start == 1){
            that.setData({
              addressId:res.data[i].id
            })
          }
        }
          that.setData({
            items:res.data
          })
        }
      })

      //获取立即购买来的数据
      //var data=JSON.parse(e.date).shopList
// wx.getStorage({
//   key:'buyNowInfo',
//   success(res){
//     console.log(res.data.shopList)
//     var data = res.data.shopList;
//     var price = 0;//总价
//     price = data[0].shopNum*data[0].price
//     that.setData({
//       shopList:data,
//       price:price.toFixed(2)
//     })
//   }
// })
      //判断是否是购物车来的结算订单
      if(e.listData){
        //购物车来的结算订单
        var listData =JSON.parse(e.listData)
        var price = 0;
        for(var i=0;i<listData.length;i++){
          price += listData[i].shopNum*listData[i].price
        }
        this.setDatal({
          shopList:listData,
          price:price.toFixed(2),
          cart_shopStart:true
        })
      }else{
        //立即购买来的结算订单
        var data =JSON.parse(e.date).shopList
        var price = 0;//总价格
        price = data[0].shopNum*data[0].price
        that.setData({
          shopList:data,
          price:price.toFixed(2)
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