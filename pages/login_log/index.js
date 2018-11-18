// pages/login_log/index.js
const common = require('../../common.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowH: app.globalData.windowH
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("上一个页面传来的参数：", options)
    var that = this;
    common.simpleRequest({
      url: app.globalData.domain + "/admin/get_user_login_log",
      data: {wechat_user_id: options.user_id},
      success: function(res){
        console.log("获取某个微信用户的登入记录，拿到的数据：", res.data)
        that.setData({
          logs: res.data.logs,
          user: res.data.detail
        })
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
  
  }
})