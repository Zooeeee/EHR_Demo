// pages/test/test.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: "0",
    longitude: "0",
    distance:0,
    endLatitude:"39.984060",
    endLongitude: "116.307520",
    location:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'FO6BZ-FFHKF-5M7JN-J6D5H-5JG7Q-WWBH4'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 调用接口
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

  },

  //获取当前经纬度
  GPSsubmit:function(e){
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: (res)=> {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        this.setData({ latitude: latitude, longitude: longitude})
       /*  wx.showModal({
          title: '当前位置',
          content: '经度' + res.longitude+ '纬度'+res.latitude,
        }) */
        qqmapsdk.reverseGeocoder({
          location: { 
            latitude: that.data.latitude,
            longitude: that.data.longitude
            },
          success:function(res){
           // console.log(res.result.address);
            that.setData({location:res.result.address});
          }
        })
      }
    })
    //地址逆解析
   
  },
  
  //获取当前经纬度与北京的距离
  calculateDistance:function(e){
    let that = this;
     qqmapsdk.calculateDistance({
       "mode":'straight',
       "to":[{
        location:{
          lat:that.data.endLatitude,
          lng:that.data.endLongitude
        }
      }],
      success:function(res,data) {//成功后的回调
        console.log(res);
        console.log(data)
        console.log("距离目的地有："+data.distanceResult[0]+"米");
        that.setData({distance:data.distanceResult[0]})
      },//success-------end




     })//calculateDistance----end
  }//function---------end


  //获取纬度
  ,getLatitude:function(e){
    this.setData({endLatitude:e.detail.value})
},
  //获取经度
  getLongitude:function(e){
    this.setData({endLongitude:e.detail.value})
},

})