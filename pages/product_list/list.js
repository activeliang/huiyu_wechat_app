// pages/product_list/list.js
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
    // 跳转时，从上一个页面带来的参数
    this.setData({
      title: options.title,
      id: options.id,
      userType: app.globalData.userType
    })

    // 根据传参，跟服务器要数据
    var that = this;
    var category_id = options.id;
    common.simpleRequest({
      url: app.globalData.domain + "/categories/" + category_id + ".json",
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

    if (app.globalData.userType == "admin"){
      console.log("执行admin版权限")
      // 标题变名称 
      wx.setNavigationBarTitle({
        title: '商品列表 (管理员)'
      })
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
  // 点击跳转到产品详情页面
  navigationTo: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  goToEdit: function (e) {
    wx.navigateTo({
      url: '/pages/product_new/new?pagetype=edit&id=' + e.currentTarget.dataset.id,
    })
  },
  goToDelete: function (e) {
    wx.showLoading({
      title: '请稍等'
    })
    var that = this;
    console.log("点击了删除商品，id:", e.currentTarget.dataset.id)
    common.simpleRequest({
      url: app.globalData.domain + "/products/" + e.currentTarget.dataset.id + "/delete_form_wechat",
      data: { id: e.currentTarget.dataset.id },
      method: "delete",
      success: function(res){
        if (res.data.status == "ok"){
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: res.data.info,
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                that.setData({
                  hideItem: e.currentTarget.dataset.id
                })
                console.log("设置了id为", e.currentTarget.dataset.id, "隐藏")
              } 
            }
          })
        }
      }
    })
  }
  
})