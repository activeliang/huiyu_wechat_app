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
    formHelperInStock: true,
    multiIndex: [0, 0],
    currentId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载服务器分类数据
    var that = this;
    wx.request({
      url: "http://localhost:3000/categories/for_wechat_picker",
      success: function(res){
        var i = 0,title_arr = [],id_arr = [],title_item_arr = [],id_item_arr = [];
        for (i in res.data.title_arr){
          title_arr.push(res.data.title_arr[i][0])
          id_arr.push(res.data.id_arr[i][0])
          title_item_arr.push(res.data.title_arr[i][1])
          id_item_arr.push(res.data.id_arr[i][1])
          i++
        }
        console.log("以下是title_arr")
        console.log(title_arr)
        console.log(id_arr)
        console.log(title_item_arr)
        console.log(id_item_arr)
        that.setData({
          title_arr: res.data.title_arr,
          id_arr: res.data.id_arr,
          multiArray: res.data.default_arr,
          title_item_arr: title_item_arr,
          id_item_arr: id_item_arr,
          currentId: res.data.current_index
        })
        console.log(res)
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
    console.log("即将要上传的分类ID:", this.data.currentId)
    wx.request({
      url: 'http://localhost:3000/products/create_form_wechat',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { title: value.title, description: value.description, sub_title: value.sub_title, index_show: that.data.formHelperIndexShow, in_stock: that.data.formHelperInStock, is_hide: that.data.formHelperIsHide, weight: value.weight, price: value.price, category_id: that.data.currentId },
      success: function (res) {
        if (res.data.status == "ok") {
          console.log("新增成功")
          var i = 0, x, id = res.data.id;
          console.log("查看路径")
          console.log(that.data.tempFilePaths)
          // 进行图片和视频上传
          console.log(that.data.previewVideoUrl)
          common.uploadImgAndVideo(id, that.data.tempFilePaths, that.data.previewVideoUrl, 0)
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.status,
          })
        }
      }
    })

    
  },
  // 处理选择器picker
  bindMultiPickerChange: function (e) {
    var currentId = ""
    if (e.detail.value[1] != 0) {
      console.log("选择了第一个")
      currentId = this.data.id_item_arr[e.detail.value[0]][e.detail.value[1]]
      // console.log(this.data.id_item_arr)
    } else {
      currentId = this.data.id_arr[e.detail.value[0]][0]
    }
    console.log( "当前ID:", currentId)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      currentIndex: e.detail.value,
      currentId: currentId
    })
  },

  // 更新选择器选项
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    if (e.detail.column == 0) {
        data.multiArray[1] = this.data.title_item_arr[data.multiIndex[0]]
        data.multiIndex[1] = 0;
    }
    this.setData(data);
  },
  
})