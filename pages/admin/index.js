// pages/admin/index.js
const common = require('../../common.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowH: app.globalData.windowH,
    windowW: app.globalData.windowW
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求最后一个月的登入用户
    var that = this;
    common.simpleRequest({
      url: app.globalData.domain + "/admin/recent_login_log",
      success: function(res){
        console.log("拿到的最近一个月的数据：", res.data)
        that.setData({
          recent_users: res.data
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
  
  },
  navigationToProductNew: function () {
    console.log("what!!!!!!!!!!")
    wx.navigateTo({
      url: '/pages/product_new/new'
    })
  },
  navigationToTest: function () {
    wx.navigateTo({
      url: '/pages/test/text',
    })
  },
  go_to_map: function () {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },
  go_to_admin_required: function () {
    wx.navigateTo({
      url: '/pages/admin_login/login',
    })
  },
  go_to_my_collects: function () {
    wx.navigateTo({
      url: '/pages/my_collects/index',
    })
  },
  show_user_login_log: function(e){
    console.log("查看登入记录事件的关联数据,标记1：", e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/login_log/index?user_id=' + e.currentTarget.dataset.id
    })
  }
})