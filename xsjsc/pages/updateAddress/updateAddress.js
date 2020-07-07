// pages/updateAddress/updateAddress.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userValue:"",//收货人保存的点的值
    addressValue:"",//选择地址的值
    phoneValue:"",//联系电话的值
    switchValue:0,//开关的值
  },
  //获取保存的点的值
  userValue:function(e){
    this.setData({
      userValue:e.detail.value
    })
  },
  //获取联系电话的值
  phoneValue:function(e){
    this.setData({
      phoneValue:e.detail.value
    })
  },
  //获取收货地址的值
  addressValue:function(e){
    this.setData({
      addressValue:e.detail.value
    })
  },

  //开关
  switchChange:function(e){
    var values = e.detail.value == true ? 1 : 0;
    this.setData({
      switchValue:values
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    var that = this;
    //获取携带的数据
    //因为携带的数据是一个json字符串所以使用的时候需要把它转化为普通对象
    var data = JSON.parse(e.dataall)
    console.log(data)
    //把获取的数据赋值给表单
    var start = data.start == 1? true: false;
    that.setData({
      userValue: data.title,
      phoneValue: data.phone,
      switchValue: start,
      addressValue: data.address
    })
  },

  //立即修改
  sendBtn:function(){
    var that = this;
    //判断输入的值不能为空
    if(that.data.userValue != "" && that.data.phoneValue != "" && that.data.addressValue != ""){
      //判断地址是否默认
      //如果是默认的就要修改原有地址的默认状态
      if(that.data.switchValue == 1){
        //请求数据库数据
        wx.request({
          url: app.globalData.webJavaserver + 'wx/getaddr/' + app.globalData.openid,
          header: {
            "content-type": "application/json"
          },
          success(res){
            var dataId = res.data;
            var newid = "";
            //获取默认地址的原始数据id
            var index = 0;
            for(var i = 0; i < dataId.length; i++){
              if(dataId[i].start == 1){
                newid = dataId[i].id;
                index = i;
                break;
              }
            }
            //根据id修改默认地址
            wx.request({
              method: "POST",
              url: app.globalData.webJavaserver + 'wx/address/update',
              data:{
                id: newid,
                openid: app.globalData.openid,
                address: dataId[index].address,
                isdefault: 0,
                phone: dataId[index].phone,
                title: dataId[index].title
              },
              header:{
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success(res){
                //修改默认地址后把新地址添加进去
                wx.request({
                  method: "POST",
                  url: app.globalData.webJavaserver + 'wx/address/update',
                  data:{
                    id: that.data.id,
                    title: that.data.userValue,
                    phone: that.data.phoneValue,
                    address: that.data.addressValue,
                   // start: 1
                    isdefault: 1,
                    openid:app.globalData.openid
                  },
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  success(res){
                    //添加成功后跳转到我的地址页面
                    wx.b=navigateTo({
                      url: '/pages/address/address'
                    })
                  }
                })
              }
            })
          }
        })
      }else{
        wx.request({
          method: "POST",
          url: app.globalData.webJavaserver + 'wx/address/update',
          data: {
            id: that.data.id,
            title: that.data.userValue,
            phone: that.data.phoneValue,
            address: that.data.addressValue,
            //start: 0
            isdefault: 0,
            openid:app.globalData.openid
          },
          header: {
            "content-type": "application/json"
          },
          success(res){
            wx.navigateTo({
              url: '/pages/address/address',
            })
          }
        })
      }
    }else{
      wx.showToast({
        title: '输入的值不能为空',
        icon: "none",
        duration: 2000
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