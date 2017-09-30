//index.js
//获取应用实例

const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {

// 登陆相关
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
// 登入相关结束

  // 获取首页展示数据
    var that = this;
    wx.request({
      url: app.globalData.domain + "/homeset.json",
      success: function (res) {
        that.setData({
           homeData: res.data,
           windowW: app.globalData.windowW,
           sliderItem: res.data.products.slice(0, 4),
           productItem: res.data.products.slice(3, 50)
        })
        console.log("获取到的首页数据：", that.data.homeData)
        console.log(res.data.products.slice(0, 3))
        console.log("当前屏幕宽度：", app.globalData.windowW)
        console.log(that.data.homeData.products.slice(0,2))
      }
    })
    
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  gotosearch: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  handleTap1: function (e) {
    console.log(e)
  },
  sliderCurrentItem: function (e) {
    console.log(e)
  },
  slider_navigation: function (e) {
    console.log(e)
    wx.navigateTo({
      url: "/pages/product/detail?id=" + e.currentTarget.dataset.id,
    })
  }
})






