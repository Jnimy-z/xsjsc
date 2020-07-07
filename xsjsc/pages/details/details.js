// pages/details/details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    imgUrls: [],//商品轮播图地址
    name: "",//商品名字
    price: "",//商品单价
    title: "",//商品标题
    stock: "",//剩余商品数量
    number: "",//累计购买
    shopId: "",//商品id
    carNum: 0,//购物车默认数量
    discountPrice: "0.00",//会员价格
    totalPrice: "0.00",//总价格
    active: false,//判断是否收藏
    indicatorDots: true,
    autoplay:true,
    interval: 5000,
    duration: 1000,
    circular: true,
    curIndex: 0,//默认tab初始切换下标
    hideShopPopup: true,//是否显示下面的购买框
    buyNumber: 0,//默认购买商品数量
    buyNumMin: 0,//默认最小购买商品数量
    shopImgUrl: "",//商品地址
    shopType: "addShopCar"
  },

  //组件购物车信息
bulidShopCarInfo:function(){
  //加入购物车信思
var shopCarMap ={};
shopCarMap.goodsId=this.data.shopId;
shopCarMap.pic= this.data.totalPrice;
shopCarMap.name = this.data.name;
shopCarMap.shopImgUrl = this.data.shopImgUrl;
shopCarMap.shopNum=this.data.buyNumber;
shopCarMap.stock = this.data.stock;
shopCarMap.num = this.data.number;
var shopCarInfo = {};
if(!shopCarInfo.shopList){
  shopCarInfo.shopList=[];
}
shopCarInfo.shopList.push(shopCarMap);
return shopCarInfo;
},
//隐藏框中的加入购物车
addShopCar:function(){
  var that = this;
  //判断购物车不能为0
  if(that.data.buyNumber < 1){
  wx.showModal({
    title:"提示",
    content:"购买数量不能为0!",
    showCancel:false
  })
}
  //获取购物车信息
  var shopCarInfo =that.bulidShopCarInfo();
  console.log(shopCarInfo.shopList)
  //把购物车数据添加到数据库
  wx.request({
    method:"POST",
    url:app.globalData.webJavaserver+'', 
    data:{
      name:shopCarInfo.shopList[0].name,
      stock:shopCarInfo.shopList[0].stock,
      price:shopCarInfo.shopList[0].pic,
      num:shopCarInfo.shoplist[0].num,
      imgs:shopCarInfo.shopList[0].shopImgUrl, 
      shopNum:shopCarInfo.shopList[0].shopNum
    },
    headers:{
      "content-type":"application/json"
    },
    success(res){
      console.log(res.data)
      that.setData({
        carNum:that.data.carNum+1
      })
    }
  })
  //写入本地缓存
  wx.setStorage({
    data: shopCarInfo,
    key: 'shopCarInfo',
  })
  that.closePopupTap();
  wx.showToast({
      title:'加入购物车成功',
      icon:"success",
      duration:2000
  })
},
//组件立即购买信息
bulidBuyNowInfo:function(){
  //立即购买信息
  var buyNowMap={};
  buyNowMap.id = this.data.shopId;
  buyNowMap.price = this.data.totalPrice;
  buyNowMap.name = this.data.name;
  buyNowMap.imgs = this.data.shopImgUrl;
  buyNowMap.shopNum = this.data.buyNumber;
  buyNowMap.stock = this.data.stock;
  buyNowMap.num =this.data.number;
  var buyNowInfo ={};
  if(!buyNowInfo.shopList){
    buyNowInfo.shopList=[];
  }
  buyNowInfo.shopList.push(buyNowMap);
  return buyNowInfo;
},
//隐藏框中的立即购买
buyNow:function(){
  var that = this;
  //判断购买数量不能为0
  if(that.data.buyNumber< 1){
  wx.showModal({
    title:"提示",
    content:"购买数量不能为0!",
    showCancel:false
  })
}
  //获取立即购买的信息
  var buyNowInfo= that.bulidBuyNowInfo();
  //写入本地缓存
  wx.setStorage({
    data:buyNowInfo,
    key:'buyNowInfo',
  })
  that.closePopupTap();
  //去到付款页面
  wx.navigateTo({
    url:'/pages/payment/payment?data='+JSON.stringify(buyNowInfo), 
  })
},
  

//隐藏框出现
bindGuiGeTap:function(){
  this.setData({
  hideShopPopup:false
  })
},
//购买数量减
numJianTap:function(){
  if(this.data.buyNumber > this.data.buyNumMin){
    var currentNum = this.data.buyNumber;
    currentNum--;
    this.setData({
      buyNumber:CurrentNum,
      totalPrice:(this.data.discountPrice * currentNum).tofixed(2)
    })
  }else{
    wx.showToast({
      title:'已经没有了!不能再减少了',
      icon:"none",
      duration:2000
    })
  }
},
//购买数量加
numJiaTap:function(){
  if(this.data.buyNumber < this.data.stock){
    var currentNum = this.data.buyNumber;
    currentNum++;
    this.setData({
      buyNumber:CurrentNum,
      totalPrice:(this.data.discountPrice * currentNum).tofixed(2)
    })
  }else{
    wx.showToast({
      title:'仓库已经没有了!不能再加了',
      icon:"none",
      duration:2000
    })
  }
},
  //隐藏框关闭
closePopupTap:function(){
  this.setData({
    hideShopPopup:true
  })
},
//加入购物车
toAddShopCar:function(){
  this.setData({
    shopType:"addsShopCar"
  })
  this.bindGuiGeTap();
},
  //点击购物车图标去到购物车界面
  goShopCar:function(){
  wx.reLaunch({
    url:'/pages/cart_shop/cart_shop',
  })
},
// 立即购买
tobuy:function(){
  this.setData({
    shopType:"tobuy"  
  })
  this.bindGuiGeTap();
},
//点击收藏按钮收藏
goColection:function(){
  var that =this;
  var collectionInfo ={};
  collectionInfo.goodsId = this.data.shopId;
  collectionInfo.pic = this.data.price;
  collectionInfo.name = this.data.name;
  collectionInfo.shopImgUrl = this.data.shopImgUrl;
  collectionInfo.stock = this.data.stock;
  collectionInfo.number = this.data.number;
  //console.log(collectionInfo)
  //根据active的值进行判断是否是收藏,
  if(!this.data.active){
    wx.showToast({
      title: "收藏成功",
      icon:"success",
      duration:2000
    })
    //获取现在点击的时间
    function formatTen(num){
      return num>9?(num+""):("0"+num);
    }
    function formatTen(){
      var date = new Data();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      return year + "-" + formatTen(month) + "-" + formatTen(day) + " " + formatTen(hour) + ":" + formatTen(minute) + ":" + formatTen(second)
    }
    //添加收藏
    wx.request({
      method: "POST",
      url: 'url',
      header: {
        "content-type": "application/json"
      },
      data: {
        goodsId: that.data.shopId,
        name: that.data.name,
        stock: that.data.stock,
        price: that.data.price,
        num: that.data.num,
        imgs: that.data.shopImgUrl,
        collectionDate: formatDate()
      },
      success(res){
        console.log(res)
      }
    })
  that.SetData({
    active:true
  })
}else{
  wx.showToast({
    title:'取消收藏',
    icon:"success",
    duration:2000
  })
  wx.request({
    url: 'url'+that.data.shopId,
    header: {
      'content-type': 'application/json'
    },
    success(res){
      console.log(res)
    }
  })
  that.setData({
    active:false
  })
}
},


  //tab切换
  bindTap(e){
    const index= parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    var that = this;
    //根据id获取对应的商品数据
    wx.request({
      url: app.globalData.webJavaserver + 'wx/detail/'+e.id,
      header: {
        'content-type': 'aplication/json'
      },
      success(res){
        console.log(res.data)
        //var listData = res.data;
        // for(var i = 0; i < listData.length; i++){
        //   if(listData[i].id == e.id){
        //     that.setData({
        //       name: listData[i].name,
        //       price: listData[i].price,
        //       discountPrice: (listData[i].price * 0.98).toFixed(2),
        //       title: listData[i].title,
        //       stock: listData[i].stock,
        //       number: listData[i].number,
        //       shopId: listData[i].id,
        //       shopImgUrl: listData[i].imgs,
        //     })
        //   }
        // }
        that.setData({
          //与后台字段相对应的数据
        })
      }
    })
    //根据id获得对应的图片轮播地址
    wx.request({
      url: 'url',
      header: {
        "content-type": "appliation/json"
      },
      success(res){
        var imgData = res.data;
        var imgurl = [];
        for(var i = 0; i < imgData.length; i++){
          if(imgData[i].allShopID == e.id){
            imgurl.push({
              imgUrl: imgData[i].allShopImgs
            })
          }
        }
        that.setData({
          imgUrls: imgurl
        })
      }
    })

    //获取收藏的数据判断数据是否存在
    wx.request({
      url: 'url',
      header: {
        'content-type': 'application/json'
      },
      success(res){
        for(var i = 0; i < res.data.length; i++){
          if(res.data[i].goodsId == that.data.shopId){
            that.setData({
              active: true
            })
          }
        }
      }
    })

    //获取购物车数据并设置购物车数量
    wx.request({
      url:app.globalData.webJavaserver+'', 
      header:{
        'content-type':'application/json'
      },
      success(res){
        that.setData({
          carNum:res.data.length
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