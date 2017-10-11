// pages/admin_login/login.js
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
    var userType = app.globalData.userType
    console.log("当前用户类型：", userType)
    if (userType == "admin"){
      wx.showToast({
        title: '自动验证中...',
        icon: "success"
      })
      setTimeout(function(){
        wx.redirectTo({
          url: '/pages/admin/index',
        })
      }, 1500)
    } else {
      wx.showModal({
        title: '',
        content: '当前为测试版本，正在自动跳过验证...',
        showCancel: false
      })
      setTimeout(function(){
        wx.redirectTo({
          url: '/pages/admin/index',
        })
      }, 3500)
    }
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
  formSubmit: function(e){
    console.log("提交事件详情", e)
    var phone = e.detail.value.phone;
    var password = e.detail.value.password;
    if ( phone && password ){
      common.simpleRequest({
        url: app.globalData.domain + "/sessions/admin_required",
        method: 'POST',
        data: {phone: phone, password: password},
        success: function(res){
          console.log("验证后返回的数据1：", res)
          if (res.data.status == "ok"){
            app.globalData.userType = "admin"
            wx.showToast({
              title: '验证成功',
              icon: 'success',
              mask: true,
              complete: function(){
                setTimeout(function(){
                  wx.redirectTo({
                    url: '/pages/admin/index'
                  })
                }, 1500)
              }
            })
          } else {
            app.globalData.userType = 'general',
            wx.showModal({
              title: '验证失败！',
              content: res.data.info,
              showCancel: false
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入手机或密码不能为空！',
        showCancel: false
      })
    }
  }
})