// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl: "http://ow9r8dc0w.bkt.clouddn.com/uploads/product/video/2/Apple_Official_iPhone_8_Trailer_2017.mp4",
    imgUrl: ["http://olmrxx9ks.bkt.clouddn.com/2017-09-22-timg.jpeg", "http://olmrxx9ks.bkt.clouddn.com/2017-09-22-timg.jpeg", "http://olmrxx9ks.bkt.clouddn.com/2017-09-22-timg.jpeg", "http://olmrxx9ks.bkt.clouddn.com/2017-09-22-timg.jpeg", "http://olmrxx9ks.bkt.clouddn.com/2017-09-22-timg.jpeg"],
    imgGroupUrl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取打开小程序时所在的位置
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log("标记点3", res)
        that.setData({
          lat: res.latitude,
          lng: res.longitude
        })
        var origin = res.longitude + ',' + res.latitude
        // var origin = "108.949333,34.266597"
        console.log("标记点6", origin)
        that.get_distance(origin)
      }
    })


    

    console.log("两点距离" + that.getDistance(34.268188,108.944725,34.264892,108.950476))
    
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 汇宇通小程序,
      path: '/pages/index/index',
      success: function (res) {
        wx.showToast({
          title: '转发成功'
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 拔打电话
  make_call: function(){
    wx.makePhoneCall({
      phoneNumber: '13726470930' 
    })
  },
  // 打开地图
  show_map: function(){
    wx.openLocation({
      latitude: 34.264892,
      longitude: 108.950476,
      scale: 15,
      name: "汇宇通通讯",
      address: "西安市新城区西新街海星智能广场负一层西厅A6"
    })
  },
  // 查询两点行驶距离（步行或驾车）
  get_distance: function (origin) {
    var that = this;
    console.log("标记点2", origin)
    console.log("标记点7", that.getDistance(that.data.lat, that.data.lng, 34.266597, 108.949333))
    if (that.getDistance(that.data.lat, that.data.lng, 34.266597, 108.949333) > 5000){
      var url = 'https://restapi.amap.com/v3/direction/driving?'
    } else {
      var url = 'https://restapi.amap.com/v3/direction/walking?'
    }
    wx.request({
      url: url,
      data: { key: "f30da713208bfd50ec9d0943e21482bd", destination: "108.950476,34.264892", origin: origin },
      success: function (res) {
        console.log("标记点1", res);
        console.log("标记点4", res.data.route.paths[0].distance + 'm');

        if (res.data.route.paths[0].distance < 1000){
          var distance = res.data.route.paths[0].distance + 'm'
        } else {
          var distance = (res.data.route.paths[0].distance / 1000).toFixed(2) + 'km'
        }
        that.setData({
          distance: distance
        })
      }
    })
  },
  // 计算两个点的直线距离
  getDistance: function (lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;
    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var r = 6378137;
    return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
  },
  // 打开图片
  imgpreview: function(){
    wx.previewImage({
      current: this.data.imgUrl[0], // 当前显示图片的http链接
      urls: this.data.imgUrl // 需要预览的图片http链接列表
    })
  }
})