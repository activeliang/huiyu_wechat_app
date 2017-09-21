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
    currentIndex: [0,0],
    currentId: "",
    currentTitle: "",
    weight_slider_show: "none",
    pickerIndex: 1,
    currentCategoryId: "",
    categoryImgBtn: "block",
    categoryImgDisplay: "none",
    categoryFormDisplay: "none",
    formHelperCategoryWeight: "",
    categoryType: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载服务器根目录下分类数据
    var that = this;
    wx.request({
      url: "http://localhost:3000/categories/for_wechat_product_new_picker",
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
          currentId: res.data.current_id,
          currentTitle: res.data.current_title,
          currentParentId: res.data.current_id,
          currentCategoryId: res.data.current_id

        })
        console.log(res)
      }
    })

    // 新增分类时获取一级分类列表
    var that = this;
      wx.request({
        url: "http://localhost:3000/categories/for_wechat_category_new_picker",
        success: function (res) {
          console.log("加载成功")
          console.log(res)
          that.setData({
            category_new_title_arr: res.data.title_arr,
            category_new_id_arr: res.data.id_arr
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
  // 打开新增表单
  go_to_category_new: function () {
    this.setData({
      categoryFormDisplay: "block",
      categoryType: "add",
      categoryTitleInput: "",
      editCategoryWeight: "",
      selectedCategoryImgUrl: "",
      categoryImgDisplay: "none",
      categoryImgBtn: "block"

    })
  },
  //点击编辑按钮
  edit_category: function(){
    this.setData({
      editCategoryId: this.data.currentId,
      editCategoryTitle: this.data.currentTitle,
      categoryFormDisplay: "block",
      categoryType: "edit",
      pickerIndex: this.data.currentIndex[0] + 1,
      categoryTitleInput: this.data.currentTitle,
      categoryImgBtn: "block"
    })
    console.log("当前选择的一级分类", this.data.currentIndex[0] + 1)
    console.log("当前id:", this.data.currentId, this.data.currentTitle)
    let that = this;
    wx.request({
      url: "http://localhost:3000/categories/" + this.data.editCategoryId + "/get_category_detail",
      success: function(res){
        console.log(res.data)
        if (res.data.image != null){
          var categoryImgDisplay = "block"
        } else {
          var categoryImgDisplay = "none"
        }
        that.setData({
          selectedCategoryImgUrl: res.data.image,
          editCategoryWeight: res.data.weight,
          categoryImgDisplay: categoryImgDisplay
        })
      }
    })
  },
  // 处理新增分类的选择器事件
  bindPickerChangeForCategoryNew: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickerIndex: e.detail.value
    })
    if (e.detail.value != 0) {
      this.setData({
        currentParentId: this.data.category_new_id_arr[e.detail.value]
      })
    }
    console.log("选择要新增子类的一级分类:", this.data.currentParentId)
  },

  // 选取新增分类时的图片
  select_category_image: function(){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      success: function(res) {
        console.log(res.tempFilePaths[0])
        that.setData({
          selectedCategoryImgUrl: res.tempFilePaths[0],
          categoryImgBtn: "none",
          categoryImgDisplay: "block"
        })
      }
    })
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
          previewVideoDisplay: "block",
          selectBtnDisplay: "none"
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
        formHelperIndexShow: true,
        weight_slider_show: "block"
      })
    } else {
      that.setData({
        formHelperIndexShow: false,
        weight_slider_show: "none"
      })
    }
    console.log(that.data.formHelperIndexShow)
  },

  // 产品的weight设slider条的值
  change_weight: function (e) {
    this.setData({
      formHelperWeight: e.detail.value
    })
    console.log(e.detail.value)
  },

  // 分类的weight设置slider
  change_category_weight: function (e){
    this.setData({
      formHelperCategoryWeight: e.detail.value
    })
    console.log("当前的选择：", e.detail.value)
  },

  // 新增、编辑分类的表单提交事件
  formSubmitForCategoryNew: function (e) {
    var that = this;
    var value = e.detail.value, url, data;
    var edit_id = that.data.currentCategoryId;
    if (edit_id == that.data.currentParentId){
      var parent_id = ""
    } else {
      var parent_id = that.data.currentParentId
    }
    console.log("当前的表单提交模式：", this.data.categoryType, "ID为：", edit_id);
    console.log(this.data.categoryType === "add");
    if (that.data.categoryType == "add") {
      console.log("新增分类")
      console.log(edit_id)
       url = "http://localhost:3000/categories/create_form_api";
       data = { title: value.title, parent_id: that.data.currentParentId, weight: that.data.formHelperCategoryWeight }

    } else if (that.data.categoryType == "edit") {
      console.log("编辑分类")
      console.log(edit_id)
       url = "http://localhost:3000/categories/" + edit_id + "/update_form_api";
       data = { title: value.title, parent_id: parent_id, weight: that.data.formHelperCategoryWeight }
    }
    wx.request({
      url: url,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      method: "POST",
      success: function (res) {
        console.log("返回的数据：", res)
        if (res.data.status == "ok") {
          console.log(that.data.selectedCategoryImgUrl != "");
          console.log(that.data.selectedCategoryImgUrl);
          if (that.data.selectedCategoryImgUrl != ""){
            wx.uploadFile({
              url: 'http://localhost:3000/categories/' + res.data.id + "/update_image_form_api",
              filePath: that.data.selectedCategoryImgUrl,
              name: 'image',
              success: function(ress){
                console.log(ress)
                if (ress.data == "ok"){
                  console.log("上传图片成功")
                  wx.showModal({
                    title: '提示',
                    content: '新增成功！'
                  })
                  that.onLoad()
                  that.setData({
                    categoryFormDisplay: "none",
                    categoryType: "add",
                    categoryTitleInput: "",
                    editCategoryWeight: "",
                    selectedCategoryImgUrl: ""
                  })
                }
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '新增成功！'
            })
          }
          
        } else {
          wx.showModal({
            title: '提示',
            content: '新增失败，请联系管理员',
          })
        }
      }
    })
  },

  // 收起分类表单按键
  hideForm: function(){
    this.setData({
      categoryFormDisplay: "none",
      editCategoryId: null
    })
  },
  

  // 新增商品提交表单事件
  formSubmit: function (e) {
    wx.showLoading({
      title: '正在提交...',
      mask: true
    })
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
      data: { title: value.title, description: value.description, sub_title: value.sub_title, index_show: that.data.formHelperIndexShow, in_stock: that.data.formHelperInStock, is_hide: that.data.formHelperIsHide, weight: that.data.formHelperWeight, price: value.price, category_id: that.data.currentId },
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
  // 处理多列选择器picker
  bindMultiPickerChange: function (e) {
    var currentId = ""
    var currentTitle = ""
    var currentParentId = ""
    console.log(e.detail.value[1] != 0)
    if (e.detail.value[1] != "0") {
      console.log("选择了第一个")
      currentId = this.data.id_item_arr[e.detail.value[0]][e.detail.value[1]]
      currentTitle = this.data.title_item_arr[e.detail.value[0]][e.detail.value[1]]
      // console.log(this.data.id_item_arr)
    } else {
      console.log("选择了第二个")
      currentId = this.data.id_arr[e.detail.value[0]][0]
      currentTitle = this.data.title_arr[e.detail.value[0]][0]
    }
    currentParentId = this.data.id_arr[e.detail.value[0]][0]
    console.log("当前选择的一级分类是：", currentParentId)
    console.log( "当前ID:", currentId,"当前选项:", currentTitle, "当前索引：", e.detail.value)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      currentIndex: e.detail.value,
      currentId: currentId,
      currentTitle: currentTitle,
      pickerIndex: e.detail.value[0] + 1,
      categoryTitleInput: currentTitle,
      currentCategoryId: currentId,
      currentParentId: currentParentId
    })
  },

  // 更新多列选择器选项
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