// pages/product/detail.js
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
    console.log("http://localhost:3000/products/" + options.id + ".json")
    wx.request({
      url: "http://localhost:3000/products/" + options.id + ".json" ,
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          product: res.data.product,
          random_product: res.data.random_product
        })
        console.log(res.data)
      }
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
  }
})