// pages/newAddress/newAddress.js
const app = getApp()
const common = require("../../utils/cityArray")
const arrays = common.getAreaInfo();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userValue:"",//收货人保存的点的值
    addressValue:"",//选择地址的值
    phoneValue:"",//联系电话的值
    textareaValue: "",//详细地址的值
    switchValue:0,//开关的值
    citysIndex:[0,0,0]//给一个初始索引
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
  //获取详细地址的值
  textareaValue:function(e){
    this.setData({
      textareaValue:e.detail.value
    })
  },
  //开关
  switchChange:function(e){
    var values = e.detail.value == true ? 1 : 0;
    this.setData({
      switchValue:values
    })
  },
  //保存地址
  saveAddress:function(){
    var that = this;
    var user = {
      userValue: that.data.userValue,
      phoneValue: that.data.phoneValue,
      textareaValue: that.data.textareaValue,
      switchValue: that.data.switchValue,
      addressValue: that.data.addressValue
    }
    console.log(user)
    //判断输入的值不能为空
    if(that.data.userValue != "" && that.data.phoneValue != "" && that.data.addressValue != "" && that.data.textareaValue != ""){
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
            console.log(dataId)
            var id = "";
            //获取默认地址的原始数据id
            var index = 0;
            for(var i = 0; i < dataId.length; i++){
              if(dataId[i].start == 1){
                id = dataId[i].id;
                index = i;
                break;
              }
            }
            //根据id修改默认地址
            wx.request({
              method: "POST",
              url: app.globalData.webJavaserver + 'wx/address/update',
              data:{
                id: id,
                openid: app.globalData.openid,
                address: dataId[index].address,
                isdefault: 0,
                phone: dataId[index].phone,
                title: dataId[index].title
              },
              header:{
                //"Content-Type": "application/x-www-form-urlencoded"
                "content-type": "application/json"
              },
              success(res){
                //修改默认地址后把新地址添加进去
                wx.request({
                  method: "POST",
                  url: app.globalData.webJavaserver + 'wx/address/add',
                  data:{
                    title: that.data.userValue,
                    phone: that.data.phoneValue,
                    address: that.data.addressValue + that.data.textareaValue,
                    isdefault: 1,
                    openid:app.globalData.openid
                  },
                  header: {
                    //"content-type": "application/x-www-form-urlencoded"
                    "content-type": "application/json"
                  },
                  success(res){
                    //添加成功后跳转到我的地址页面
                    wx.navigateTo({
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
          url: app.globalData.webJavaserver + 'wx/address/add',
          data: {
            title: that.data.userValue,
            phone: that.data.phoneValue,
            address: that.data.addressValue + that.data.textareaValue,
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
        item: "none",
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(wx.getStorageSync('global_cityData')){
      var cityArray = wx.getStorageSync('global_cityData')
    }else{
      var cityArray = [
        [],
        [],
        []
      ];
      for(let i = 0, len = arrays.length; i<len; i++){
        switch(arrays[i]['level']){
          case 1:
            cityArray[0].push(arrays[i]["name"]);
            break;
          case 2:
            if(arrays[i]["sheng"] == arrays[0]["sheng"]){
              cityArray[1].push(arrays[i]["name"]);
            }
            break;
          case 3:
            if(arrays[i]["sheng"] == arrays[0]["sheng"] && arrays[i]["di"] == arrays[1]["di"]){
              cityArray[2].push(arrays[i]["name"]);
            }
            break;
        }
      }
      wx.setStorageSync('global_cityData', cityArray)
    }
    that.setData({
      cityArray: cityArray
    })
  },

  //点击确定获取相应位置数据
  func_changeCitysChange:function(e){
    console.log(e)
    var that = this;
    var cityArray = that.data.cityArray;
    var address = "";
    if(that.data.ssq == undefined){
      var citysIndex = that.data.citysIndex;
      //var citysIndex = e.detail.value
      for(let i in citysIndex){
        address += cityArray[i][citysIndex[i]]
      }
    }else{
      address = that.data.ssq
    }
    that.setData({
      addressValue: address
    })
  },
  //选择地点并输出
  func_changeCitysChangeColumn:function(e){
    var that = this;
    var cityArray = that.data.cityArray;
    var list1 = [];//存放第二列数据（市）
    var list2 = [];//存放第三列数据（区）
    var citysIndex = [];
    //主要是注意地址文件中的字段关系，省市区关联的字段是sheng di level
    switch(e.detail.column){
      case 0:
        //滑动左列 第一列 即省列
        for(let i = 0, len = arrays.length; i < len; i++ ){
          if(arrays[i]["name"] == cityArray[0][e.detail.value]){
            var sheng = arrays[i]["sheng"]
          }
          if(arrays[i]["sheng"] == sheng && arrays[i]["level"] == 2){
            list1.push(arrays[i]["name"]);
          }
          if(arrays[i]["sheng"] == sheng && arrays[i]["level"] == 3 && arrays[i]["di"]){
            list2.push(arrays[i]["name"])
          }
        }
        citysIndex = [e.detail.value, 0, 0]
        //var ssq = cityArray[0][e.detail.value] + list1[0] + list2[0] + ""
        // console.logkkkkkkkkkkkc
        that.setData({
          global_sheng:sheng
        });
        break;
      case 1:
          //滑动第二列 即市
          var di;
          var sheng = that.data.global_sheng;
          list1 = cityArray[1];  
          for(let i = 0, len = arrays.length; i < len; i++){
            if(arrays[i]["name"] == cityArray[i][e.detail.value]){
              di = arrays[i]["di"];
            }
          }
          for(let i = 0, len = arrays.length; i < len; i++){
            if(arrays[i]["sheng"] == sheng && arrays[i]["level"] == 3 && arrays[i]["di"] == di){
              list2.push(arrays[i]["name"]);
            }
          }
          citysIndex = [that.data.citysIndex[0], e.detail.value, 0];
          var ssq = cityArray[0][that.data.citysIndex[0]] + list1[e.detail.value] + list2[0] + ""
          // console.log
          break;
          // that.setData({
          //   global_sheng:sheng
          // });
        case 2:
          //滑动第三列 即区列
          list1 = cityArray[1];
          list2 = cityArray[2];
          citysIndex = [that.data.citysIndex[0], that.data.citysIndex[1], e.detail.value];
          var ssq = cityArray[0][that.data.citysIndex[0]] + list1[that.data.citysIndex[1]] + list2[e.detail.value];
          break;
    }
    that.setData({
      "cityArray[1]": list1,//重新赋值市列数组
      "cityArray[2]": list2,//重新赋值区列
      citysIndex: citysIndex,//更新索引
      ssq: ssq,//获取选中的省市区
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