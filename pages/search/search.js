// pages/search/search.js
const common = require('../../common.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    search_history: wx.getStorageSync("search_history"),
    windowH: app.globalData.windowH
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search_history: this.render_no_repeat_array(wx.getStorageSync("search_history"))
    })
    console.log("当前历史记录：", wx.getStorageSync("search_history"))
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
  searchformSubmit: function (e) {
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
      this.search_product(e.detail.value.searchKey)
    }
  }, 

  search_product: function(key){
    var that = this;
    // 搜索字段加入缓存
    that.setData({ search_history: "" })
    wx.setStorageSync("search_history", (wx.getStorageSync("search_history") || []).concat(key))
    console.log("标记5", wx.getStorageSync("search_history"));
    common.simpleRequest({
      url: app.globalData.domain + '/products.json?q[title_or_sub_title_cont]=' + "" + key,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "GET",
      success: function (res) {
        console.log("搜索结果：", res.data)
        that.setData({
          search_result: res.data.products,
        })
      }
    })
  },
  
  // 点击跳转到产品详情页面
  navigationTo: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/product/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  destroy_history: function(){
    // 清空搜索历史
    wx.removeStorageSync('search_history')
    this.setData({
      search_history: wx.getStorageSync("search_history")
    })
  },
  search_again: function(){
    //重新搜索
    this.setData({
      search_history: this.render_no_repeat_array(wx.getStorageSync("search_history")),
      inputValue: "",
      focus: "false",
      focus: "true",
      search_result: ''
    })
  },
  search_form_history: function(e){
    //根据历史记录来搜索
    console.log(e.currentTarget.dataset.key)
    this.search_product(e.currentTarget.dataset.key)
  },
  render_no_repeat_array: function(array_raw){
    if (!array_raw) return undefined; 
    var array = array_raw.reverse()
    console.log("进入了返回数组的action")
    var i = 0, new_array = [], h = {}, len = 10;
    for (; i < len;) {
      console.log("检测6：",i, array[i], h[array[i]] == array[i])
      if (h[array[i]] == array[i] && h[array[i]] != undefined){
        i++;
        len++;
        continue;
      }
      h[array[i]] = array[i]
      if (h[array[i]]){
        new_array.push(array[i])
      }
      i++;
    }
    return new_array
  }




  
})