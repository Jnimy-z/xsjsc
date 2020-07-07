// pages/cart_shop/cart_shop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: {
      saveHidden: true,//显示隐藏
      allSelect: false,//全选
      noselect: true,//合计显示隐藏
      list: [],
      price: 0
    }
  },

  //增加功能
jiaBtnTap:function(e){
  var index = e.currentTarget.dataset.index;
  var list = this.data.goodsList.list;
  if(index !=="" && index !==null){
    if(list[parseInt(index)].shopNum < Number(list[parseInt(index)].stock)){
      this.setGoodsList(this.getSaveHide(),this.totalPrice(),this.allSelect(),this.noSelect(),list);
    }else{
      wx.showToast({
        title:'仓库存货不多了! 请稍等立即存货',
        icon: "none",
        duration:2000
      })
    }
  }
},
  //减少功能
jianBtnTap:function(e){
  var that = this;
  var index= e.currentTarget.dataset.index;
  var list =this.data.goodsList.list;
  if(index!="" && index !==null){
    if(list[parseInt(index)].shopNum>1){
      list[parseInt(index)].shopNum --;
      this.setGoodsList(this.getSaveHide(),this.totalPrice(),this.allSelect(), this.noSelect(),list);
    }else{
      wx.shotModel({
        title:"删除",
        content:"是否删除这个商品",
        success(res){
          if(res.confirm){
            console.log("用户删除成功")
            wx.request({
              url: 'url' + list[parseInt(index)].id,
              header: {
                "content-type": "application/json"
              },
              success(res){
                that.onLoad()
              }
            })
          }else if(res.cancel){
            console.log("用户取消了删除")
          }
        }
      })
    }
  }
},
  
// 删除购物车全部数据
deleteSelected:function(){
  var that=this;
  wx.request({
    url:app.globalData.webJavaserver+'',
    header:{
      "content-type":"epplication/json",
    },
    success(res){
      console.log(res.data)
      var list = that.data.goodsList.list;
      //filter 过滤
      list= list.filter(function(curgoods){
        return !curgoods.active
      })
      that.setGoodsList(that.getSaveHide(),that.totalPrice(),that.allSelect(),that.noSelect(),list)
    }
  })
},
// /激活清空按钮
editTap:function(){
  var list = this.data.goodsList.list;
  for(var i=0;i<list.length;i++){
    var curItem=list[i];
    curItem.active=false;
  }
  this.setGoodsList(!this.getsaveHide(),this.totalPrice(),this.allSelect(),this.noSelect(),list);
},

// /激活清空之后 再次激活完成按扭
saveTap:function(){
  var list = this.data.goodsList.list;
  for(var i=0;i<list.length;i++){
    var curItem = list[i];
    curItem.active = true;
  }
  this.setGoodsList(!this.getSaveHide(),this.totalPrice(),this.allSelect(),this.noSelect(),list);
},

//去结算
toPayOrder:function(){
  console.log(this.data-goodsList.list)
  wx.navigeteTo({
    url:'/pages/payment/payment?listData='+JSON.stringfy(this.data.goodsList.list), 
  })
},

//去逛逛
toIndexPage:function(){
  wx.switchTab({
    url: '/pages/index/index',
  })
},
  

  //设置数据列的区域
setGoodsList:function(savehidden,total,allselect,noselect,list){
  this.setData({
    goodsList:{
      saveHidden:saveHidden,
      allSelect:allSelect,
      noSelect:noSelect,
      list:list,
      price: total
    }
  })
  var shopCarInfo = {};
  var tempNumber = 0;
  shopCarInfo.shopList=list;
  for(var i =0;i<list.length;i++){
    tempNumber= tempNumber + list[i].number
  }
  shopCarInfo.shopNum= tempNumber;
  wx.setStorage({
    data: shopCarInfo,
    key:'shopCarInfo',
  })
},

// 显示隐藏函数
getSaveHide:function(){
  var saveHidden = this.data.goodsList.saveHidden;
  return saveHidden;
},
//计算价格
totalPrice:function(){
  //获取所有的数据
  var list= this.data.goodsList.list;
  var total= 0;
  for(var i=0;i<list.length;i++){
    var curItem= list[i]
    // console.log(curItem)
    if(curItem.active){
      total += parseFloat(curItem.price)* curItem.shopNum;
    }
  }
  total = parseFloat(total.toFixed(2))//js浮点数计算bug,取2位小数精度
  return total
},
//合选函数方法
allSelect:function(){
  var list= this.data.goodsList.list;
  var allSelect= false;
  for(var i =0;i<list.length;i++){
    var curItem =list[i];
    if(curItem.active){
      allSelect = true;
    }else{
      allSelect = false;
      break;//如果没有就不循环了
    }
  }
  return allSelect;
},
//合计显示隐藏
noSelect:function(){
  var list= this.data.goodsList.list;
  var noSelect= 0;
  for(var i=0;i<list.length;i++){
    var curItem =list[i];
    if(!curItem.active){
      noSelect++;
    }
  }
  if(noSelect == list.length){
    return true;
  }else{
    return false;
  }
},

//全选接扭事件
bindAllSelect:function(){
  var currentAllSelect = this.data.goodsList.allSelect;
  var list= this.data.goodsList.list;
  if(currentAl1Select){
    for(var i=0;i<list.length;i++){
      var curItem = list[i]
      curItem.active=false;
    }
  }else{
    for(var i=0;i<list.length;i++){
      var curItem = list[i]
      curItem.active= true;
    }
  }
  this.setGoodsList(this.getSaveHide(),this.totalPrice(),!currentAllSelect,this.noSelect(),list)
},
  
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取购物车数据
    wx.request({
      url: 'url',
      header: {
        "content-type": "application/json"
      },
      success(res){
        var list = "goodsList.list"
        that.setData({
          [list]: res.data
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