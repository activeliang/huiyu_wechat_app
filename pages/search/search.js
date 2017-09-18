// pages/search/search.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_result_show: "none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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






  // 提交搜索表单的事件
  formSubmit: function (e) {
    var that = this;
    // 如果提交为空，弹框提示用户
    if (e.detail.value.searchKey == "") {
      wx.showModal({
        title: '提示',
        content: '请输入有效关键字',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      // 向服务器发起搜索
      wx.request({
        url: 'http://localhost:3000/products.json?q[title_or_sub_title_cont]=' + "" + e.detail.value.searchKey,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "GET",
        success: function (res) {
          if (res.data.products == "") {
            that.setData({
              searchPresent: "搜索结果为空",
              search_result: "",
              search_result_show: "none"
            })
          } else {
            that.setData({
              search_result: res.data.products,
              search_result_show: "block"
            })
          }
        }
      })
    }
  }, 
  // 点击跳转到产品详情页面
  navigationTo: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/detail?id=' + e.currentTarget.dataset.id,
    })
  }




  
})