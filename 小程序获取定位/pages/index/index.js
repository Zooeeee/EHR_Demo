var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    radius: 3000,
    can: true,
    empId: "1",
    key: "FO6BZ-FFHKF-5M7JN-J6D5H-5JG7Q-WWBH4",
    time: "09:01",
    date: "2019-06-30",
    Height: 0,
    scale: 13,
    latitude: "",
    longitude: "",
    endLatitude: "30.3268",
    endLongitude: "107.33515",
    distance: "",
    markers: [],
    controls: [{
      id: 1,
      iconPath: '../../img/jian.png',
      position: {
        left: 320,
        top: 100 - 50,
        width: 20,
        height: 20
      },
      clickable: true
    },
    {
      id: 2,
      iconPath: '../../img/jia.png',
      position: {
        left: 340,
        top: 100 - 50,
        width: 20,
        height: 20
      },
      clickable: true
    }
    ],
    circles: []

  },

  onLoad: function () {
    let that = this;
    //初始化qqmapsdk
    qqmapsdk = new QQMapWX({
      key: that.data.key
    });

    var _this = this;
    let mydate = new Date();
    this.setData({ time: mydate.getHours() + ":" + mydate.getMinutes() })


    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight / 2
          }

        })



      }
    })

    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {

        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: "1",
            latitude: res.latitude,
            longitude: res.longitude,
            width: 50,
            height: 50,
            /*   iconPath: "../../img/my.png", */
            title: "哪里"

          }],
          circles: [{
            latitude: _this.data.endLatitude,
            longitude: _this.data.endLongitude,
            color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            iconPath: "../../img/my.png",
            radius: that.data.radius,
            strokeWidth: 1
          }]

        })
        _this.reverseGeocoder();
        _this.calculateDistance();
      }

    })


  },

  regionchange(e) {
    console.log("regionchange===" + e.type)
  },

  //点击merkers
  markertap(e) {
    console.log(e.markerId)

    wx.showActionSheet({
      itemList: ["A"],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
    console.log("scale===" + this.data.scale)
    if (e.controlId === 1) {
      // if (this.data.scale === 13) {
      that.setData({
        scale: --this.data.scale
      })
      // }
    } else {
      //  if (this.data.scale !== 13) {
      that.setData({
        scale: ++this.data.scale
      })
      // }
    }


  },
  //发送消息
  sendMsg: function (e) {
    /* console.log("纬度："+this.data.latitude);//纬度
     console.log("经度："+this.data.longitude);//经度
     this.calculateDistance();
     console.log("距离："+this.data.distance);//
     console.log("员工id:"+this.data.empId);
     console.log("日期："+this.data.date);
     console.log("时间："+this.data.time);
     console.log("地点:"+this.data.location);*/
    this.postAjax("http://localhost/txs/kaoqing/insert")
  },
  //日期和时间改变的绑定函数
  DateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  TimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      time: e.detail.value
    })
  },
  //获取当前经纬度与end的距离
  calculateDistance: function (e) {
    let that = this;
    console.log("=====calculateDistance=====")
    qqmapsdk.calculateDistance({
      "mode": 'straight',
      "from": {
        latitude: that.data.latitude,
        longitude: that.data.longitude
      },
      "to": [{
        location: {
          lat: that.data.endLatitude,
          lng: that.data.endLongitude
        }
      }],
      success: function (res, data) {//成功后的回调
        console.log(res);
        console.log(data)
        console.log("距离目的地有：" + data.distanceResult[0] + "米");
        that.setData({ distance: data.distanceResult[0] })
        if (data.distanceResult[0] < that.data.radius) {
          that.setData({ can: false })
        }
        else {
          that.setData({ can: true })
        }
      },//success-------end
    })//calculateDistance----end
  }//function---------end

  //地址逆解析
  , reverseGeocoder: function () {
    let that = this;
    /* console.log("reverseGeocoder")
    console.log(that.data.latitude) */
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: that.data.latitude,
        longitude: that.data.longitude
      },
      success: function (res) {
        console.log(res.result.address);
        that.setData({ location: res.result.address });
      },
      fail: function (res) { console.log(res) }
    })
  },
  //获取员工id
  getId: function (e) {
    console.log(e.detail.value);
    this.setData({ "empId": e.detail.value })
  },
  //获取经度
  getLongitude: function (e) {
    console.log(e.detail.value);
    this.setData({ "longitude": e.detail.value })
    this.calculateDistance();
  },
  //获取纬度
  getLatitude: function (e) {
    console.log(e.detail.value);

    this.setData({ "latitude": e.detail.value })
    this.calculateDistance();
  },
  //发送ajax
  postAjax: function (url) {
    let that = this;
    wx.request({
      url,
      method: "POST",
      data: {
        "empid": this.data.empId,
        "clockiniocation": this.data.location,
        "date": this.data.date,
        "time": this.data.time,

      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.msg);
       
        that.showModal("Modal", res.data.msg);
       
       
      },
      fail: function () {
        console.log("接口调用失败");
      }
    })

  },
  //模态框
  showModal(e,msg) {
    console.log(e)
    this.setData({
      modalName: e,
      msg:msg
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

})