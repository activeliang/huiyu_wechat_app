// pages/profile/index.js
const common = require('../../common.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn_status: "true"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("标记", wx.getStorageSync("userToken"))
    console.log("标记2", app.globalData.userType)
    if (app.globalData.userType && app.globalData.userInfo && wx.getStorageSync("userToken")){
      this.setData({
        userType: app.globalData.userType,
        userInfo: app.globalData.userInfo,
        windowH: app.globalData.windowH
      })
    } else {
      // 如果因网络问题没有获取到，这里会重新获取
      console.log("因网络问题没有获取到，这里会重新获取")
      app.initialLogin()
    }
    console.log("拿出当前所有的globalData:", app.globalData)
    console.log("头像：", this.data.userInfo)
    console.log("当前页面的参数： ", this.data)
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
    console.log("测试")
    this.setData({
      userType: app.globalData.userType,
      userInfo: app.globalData.userInfo,
      windowH: app.globalData.windowH
    })
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
  navigationToProductNew: function(){
    console.log("what!!!!!!!!!!")
    wx.navigateTo({
      url: '/pages/product_new/new'
    })
  },
  navigationToTest: function(){
    wx.navigateTo({
      url: '/pages/test/text',
    })
  },
  go_to_map: function () {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },
  go_to_admin_required: function(){
    wx.navigateTo({
      url: '/pages/admin_login/login',
    })
  },
  go_to_my_collects: function(){
    wx.navigateTo({
      url: '/pages/my_collects/index',
    })
  },
  backend_witch: function(){
    if (this.data.btn_status == "hide"){
      this.setData({
        btn_status: "show"
      })
    } else {
      this.setData({
        btn_status: "hide"
      })
    }
  },
  epmty: function(){
    wx.removeStorageSync("userToken")
    wx.showToast({
      title: 'nnnnnnnnn',
    })
  }
})