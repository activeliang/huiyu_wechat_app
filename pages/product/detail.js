// pages/product/detail.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({currentProductId: options.id})
    // 加载时向服务器请求产品详情数据
    var that = this;
    console.log(app.globalData.domain + "/products/" + options.id + ".json")
    wx.request({
      url: app.globalData.domain + "/products/" + options.id + ".json" ,
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          product: res.data.product,
          random_product: res.data.random_product,
          windowH: app.globalData.sysInfo.windowHeight,
          main_img: res.data.product_main_img
        })
        console.log(res.data)
      }
    })
    console.log("获取globalData", app.globalData.sysInfo.windowHeight)
    console.log(windowH)
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
      title: "【汇宇通】" + this.data.product.title,
      path: '/pages/product/detail?id=' + this.data.currentProductId,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 随机推荐的产品列表，点击跳转到详情页面
  linkToProduct: function (e) {
    wx.redirectTo({
      url: '/pages/product/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  navigationToProductEdit: function (e) {
    wx.navigateTo({
      url: '/pages/product_new/new?pagetype=edit&id=' + e.currentTarget.dataset.id,
    })
  },
  share_btn: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
})