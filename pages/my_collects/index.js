// pages/my_collects/index.js
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
    var that = this;
    common.simpleRequest({
      url: app.globalData.domain + "/collects/my_collects",
      success: function(res){
        console.log("返回我的收藏数据；", res.data)
        that.setData({
          my_collects: res.data.my_collects
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
  // 点击跳转到产品详情页面
  navigationTo: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  delete_collect_product: function(e){
    console.log("显示当前的关联数据：", e)
    wx.showModal({
      title: '提示',
      content: '您确定要删除【' + e.currentTarget.dataset.title + '】吗？',
      success: function(res){
        if (res.confirm) {
          console.log('用户点击确定')
          common.simpleRequest({
            url: app.globalData.domain + "/collects/remove_clooect",
            method: "DELETE",
            data: { product_id: e.currentTarget.dataset.id },
            success: function (res2) {
              if (res2.data.status == "ok"){
                wx.showToast({
                  title: "已移除",
                  icon: 'success',
                  duration: 3000,
                  complete: function(){
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '/pages/my_collects/index',
                      })
                    },1500)
                  }
                })
              } else {
                wx.showModal({
                  title: 提示,
                  content: res.data.info,
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  navigation_to_find_more: function(){
    wx.switchTab({
      url: '/pages/find_more/index'
    })
  }
})