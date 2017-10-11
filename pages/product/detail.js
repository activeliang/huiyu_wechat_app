// pages/product/detail.js
const common = require('../../common.js')
const app = getApp()
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
    console.log("传参: ", options.id)
    this.setData({currentProductId: options.id})
    // 加载时向服务器请求产品详情数据
    var that = this;
    console.log(app.globalData.domain + "/products/" + options.id + ".json")
    common.simpleRequest({
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
          windowW: app.globalData.sysInfo.windowWidth,
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
  },
  // 预览图片
  previewImg: function(res){
    var that = this;
    console.log("标记点1", res)
    wx.previewImage({
      current: that.data.product.images[res.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: that.data.product.images // 需要预览的图片http链接列表
    })
  },
  // 加入收藏
  add_collect: function(){
    var that = this;
    common.simpleRequest({
      url: app.globalData.domain + "/collects/create_collect",
      method: "POST",
      data: { product_id: that.data.currentProductId, product_img: that.data.main_img, product_name: that.data.product.title },
      success: function(res){
        console.log("加入收藏返回的数据：", res)
        if (res.data.status == "ok"){
          wx.showToast({
            title: res.data.info,
            icon: 'success'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.info,
            showCancel: false
          })
        }

      }
    })
  }
})