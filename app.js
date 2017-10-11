//app.js
App({
  onLaunch: function () {
    this.getSys();
    var that = this;
    // 获取userInfo
    wx.getUserInfo({
      lang: "zh_CN",
      success: function (res2) {
        that.globalData.userInfo = res2.userInfo
        console.log("当前用户的userInfo", res2.userInfo)
      }
    })
    this.initialLogin()
  },

  //获取手机信息
  getSys: function () {
    var that = this;
    //  这里要非常注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        //设置变量值
        that.globalData.sysInfo = res;
        that.globalData.windowW = res.windowWidth;
        that.globalData.windowH = res.windowHeight;
        // that.globalData.domain = "http://localhost:3000";
        that.globalData.domain = "http://huiyutongwechat.top";
      }
    })
  },
  // 设置全局变量
  globalData: {
    userInfo: null,
    sysInfo: null,
    windowW: null,
    windowH: null,
    lock: true,
    userToken: wx.getStorageSync('userToken')
                // app.globalData.domain
    // domain: "http://localhost:3000"
    // domain: "http://huiyutongwechat.top"
  },

  // 根据token返回user_type
  pushTokenRenderType: function (userToken){
    var that = this;
    // 向服务器发起登录
    wx.request({
      url: that.globalData.domain + "/sessions/wechat_login",
      method: 'POST',
      data: { client_token: userToken },
      success: function (res) {
        console.log("标记点A：", res)
        if (res.data.status == "ok") {
          wx.setStorageSync("userToken", res.data.userToken)
          that.globalData.loginStatus = "ok"
          that.globalData.userType = res.data.userType
          // wx.setStorageSync()
          console.log("根据3rd提交后，尝试从本地取出userToken,userType:", wx.getStorageSync("userToken"), that.globalData.userType)
        } else {
          that.pushCodeRenderType()
        }
        console.log("检测当前登录状态：", that.globalData.loginStatus)
      }
    })
  },
  // 根据code向服务器请求返回user_type
  pushCodeRenderType: function() {
    var that = this;
    wx.login({
      success: function (res) {
        console.log("拿到的login_code:", res)
        if (res) {
          wx.request({
            url: that.globalData.domain + "/sessions/wechat_login",
            method: 'POST',
            data: { code: res.code, user_info: that.globalData.userInfo },
            success: function (res3) {
              console.log("后台返回的数据1:", res3)
              if (res3.data.status = "ok") {
                console.log("进入了设置3rd_session阶段")
                wx.setStorageSync("userToken", res3.data.userToken)
                that.globalData.userType = res3.data.userType
                that.globalData.loginStatus = "ok"
              }
              console.log("根据微信code提交后台后，从本地尝试取出userToken,userType:", wx.getStorageSync("userToken"), that.globalData.userType)
              console.log("尝试从本地存储中拿出userToken", wx.getStorageSync("userToken"))
              console.log("当前用户类型是：", res3.data.userType)
              console.log("检测当前登录状态：", that.globalData.loginStatus)
            }
          })
        }
      }
    })
  },
  // 小程序初始化时的登录事件
  initialLogin: function(){
    var that = this;
    var userToken = wx.getStorageSync("userToken")
    console.log("取出本地的UserToken:", userToken)
    if (userToken) {
      that.globalData.userToken = userToken
      that.pushTokenRenderType(userToken)
    } else {
      console.log("缓存中没有userToken，开始pushCodeRenderType")
      that.pushCodeRenderType()
    }
  }
})