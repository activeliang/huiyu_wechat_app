// pages/product_list/list.js
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
    // 跳转时，从上一个页面带来的参数
    this.setData({
      title: options.title,
      id: options.id
    })

    // 根据传参，跟服务器要数据
    var that = this;
    var category_id = options.id, category_title = options.title;
    wx.request({
      url: "http://localhost:3000/categories/" + category_id + ".json?title=" + category_title,
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          product_list: res.data
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
  // 点击跳转到产品详情页面
  navigationTo: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/detail?id=' + e.currentTarget.dataset.id,
    })
  }
  
})