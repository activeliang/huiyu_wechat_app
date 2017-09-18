// pages/product_new/new.js
// 引入公共模板js
var common = require('../../common.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    previewVideoDisplay: "none",
    formHelperIsHide: false,
    formHelperIndexShow: false,
    formHelperInStock: true
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
  // 选取图片事件
  select_image: function () {
    let that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: 'compressed', // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          tempFilePaths: res.tempFilePaths,
          previewImgUrl: res.tempFilePaths
        })
      }
    })
  },
  // 选取视频事件
  select_video: function (){
    let that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      success: function(res){
        console.log(res)
        that.setData({
          previewVideoUrl: res.tempFilePath,
          videoSize: res.size,
          videoLength: res.duration,
          previewVideoDisplay: "block"
        })
      }
    })
  },
  
  // 是否有现在货开头
  change_in_stock: function (e){
    let that = this;
    if (e.detail.value == true){
      that.setData({
        formHelperInStock: true
      })
    } else {
      that.setData({
        formHelperInStock: false
      })
    }
    console.log(that.data.formHelperInStock)
  },
  // 是否上架开头
  change_is_hide: function (e) {
    let that = this;
    if (e.detail.value == true) {
      that.setData({
        formHelperIsHide: true
      })
    } else {
      that.setData({
        formHelperIsHide: false
      })
    }
    console.log(that.data.formHelperIsHide)
  },
  // 是否在首页推广开头
  change_index_show: function (e) {
    let that = this;
    if (e.detail.value == true) {
      that.setData({
        formHelperIndexShow: true
      })
    } else {
      that.setData({
        formHelperIndexShow: false
      })
    }
    console.log(that.data.formHelperIndexShow)
  },
  

  // 新增商品提交表单事件
  formSubmit: function (e) {
    console.log(this.data.tempFilePaths)
    var that = this;
    var value = e.detail.value;
    wx.request({
      url: 'http://localhost:3000/products/create_form_wechat',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { title: value.title, description: value.description, sub_title: value.sub_title, index_show: value.index_show, in_stock: value.in_stock, is_hide: value.is_hide, weight: value.weight, price: value.price },
      success: function (res) {
        if (res.data.status == "ok") {
          console.log("新增成功")
          var i = 0, x, id = res.data.id;
          console.log("查看路径")
          console.log(that.data.tempFilePaths)
          // 进行图片和视频上传
          console.log(that.data.previewVideoUrl)
          common.uploadImgAndVideo(id, that.data.tempFilePaths, that.data.previewVideoUrl, 1)
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.status,
          })
        }
      }
    })

    
  }
})