// pages/category_new/new.js
const common = require('../../common.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerIndex: 0,
    currentCategoryId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // 获取一级分类列表
    var that = this;
    wx.request({
      url: app.globalData.domain + "/categories/for_wechat_category_new_picker",
      success: function(res) {
        console.log("加载成功")
        that.setData({
          title_arr: res.data.title_arr,
          id_arr: res.data.id_arr
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

  // 处理选择器事件
  bindPickerChange_for_new: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickerIndex: e.detail.value
    })
    if (e.detail.value != 0){
      this.setData({
        currentCategoryId: this.data.id_arr[e.detail.value]
      })
    } 
    console.log(this.data.currentCategoryId)
  },

  // 处理表单提交事件
  formSubmitForCategoryNew: function(e){
    var that = this;
    var value = e.detail.value;
    wx.request({
      url: app.globalData.domain + "/categories/create_form_api",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: { title: value.title, parent_id: that.data.currentCategoryId },
      success: function (res){
        if (res.data.status == "ok") {
          wx.showModal({
            title: '提示',
            content: '新增成功！',
          })
          that.onLoad()
        } else {
          wx.showModal({
            title: '提示',
            content: '新增失败，请联系管理员',
          })
        }
      }
    })
  }


})