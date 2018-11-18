//index.js
//获取应用实例
const common = require('../../common.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false

  },
  onLoad: function () {

  // 获取首页展示数据
    var that = this;
    common.simpleRequest({
      url: app.globalData.domain + "/homeset.json",
      success: function (res) {
        that.setData({
          categoryShow: res.data.index_category,
           homeData: res.data,
           windowW: app.globalData.windowW,
           sliderGroup: res.data.products.slice(0, 4),
           productItem: res.data.products.slice(5, 50),
           loadJob: "ok"
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
  slider_navigation: function (e) {
    console.log(e)
    wx.navigateTo({
      url: "/pages/product/detail?id=" + e.currentTarget.dataset.id,
    })
  },
  navigaToCategory: function (e){
     wx.navigateTo({
       url: '/pages/product_list/list?id=' + e.currentTarget.dataset.id + "&title=" + e.currentTarget.dataset.title,
     })
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
      title: 至爱珠宝小程序,
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
})






