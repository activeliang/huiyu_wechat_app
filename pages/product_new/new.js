 // pages/product_new/new.js
// 引入公共模板js
const common = require('../../common.js')
const app = getApp()

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
    console.log("页面跳转信息", options)
    // 加载服务器根目录下分类数据
    var that = this;
    common.simpleRequest({
      url: app.globalData.domain + "/categories/for_wechat_product_new_picker",
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
        console.log("测试：", that.data.id_arr)
        // 判断当页面类型为编辑时的处理：
          if (options.id != undefined){
            // 获取product详情：
            that.renderProductDetail(options.id, options.pagetype);
          }
                    
      }
    })
    

    // 新增分类时获取一级分类列表
      common.simpleRequest({
        url: app.globalData.domain + "/categories/for_wechat_category_new_picker",
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
  
  // 向服务器获取一个产品的详情
  renderProductDetail: function (id, pagetype){
    if (id != undefined && pagetype == "edit") {
      this.setData({
        pageType: pagetype,
        editProductId: id
      })
      console.log("当前页面类型为edit", id)
      var that = this;
      common.simpleRequest({
        url: app.globalData.domain + "/products/" + id + "/get_product_detail",
        success: function (res) {
          console.log("查询到的product_detail", res)
          console.log("当前所有的页面变量：", that.data)
          // 获取页面category索引值
          var editProductcurrentCategoryIndex = that.renderCategoryIndex(res.data.category_id, that.data.id_arr)
          var multiArray = that.data.multiArray ;
          multiArray[1] = that.data.title_item_arr[editProductcurrentCategoryIndex[0]];
          that.setData({
            currentTitle: res.data.category_title,
            multiIndex: editProductcurrentCategoryIndex,
            currentIndex: editProductcurrentCategoryIndex,
            categoryTitleInput: res.data.category_title,
            pickerIndex: editProductcurrentCategoryIndex[0] + 1 ,
            multiArray: multiArray,
            previewImgUrl: res.data.image,
            previewVideoUrl: res.data.video.url,
            previewVideoDisplay: "block",
            editProductWeight: res.data.weight,
            formHelperInStock: res.data.in_stock,
            formHelperIsHide: res.data.is_hide,
            formHelperIndexShow: res.data.index_show,
            productTitleInput: res.data.title,
            productSubTitleInput: res.data.sub_title,
            productDescriptionInput: res.data.description,
            productPriceInput: res.data.price
          })
          console.log("设置PickerIndex", that.data.multiArray[1], that.data.multiIndex[1] )
          console.log("当前设置的title_input值", that.data.categoryTitleInput)

          console.log("当前商品的分类标题：", editProductcurrentCategoryIndex, that.data.categoryTitleInput)
        }
      })
    }
  },

  // 根据产品返回来分类ID分析当前页面显示对应分类需要的选择器Index
  renderCategoryIndex: function(id, array){
    console.log("成功调用callback函数")
    console.log("检测分类变量和id_arr：", id, array)
    var x, j;
    for (x in array) {
      for (j in array[x][1]) {
        console.log("遍历项：", array[x][0], array[x][1][j])
        if (array[x][0] == id || array[x][1][j] == id) {
          console.log("当前找到的索引", x, j)
          return new Array(parseInt(x), parseInt(j));
          break;
        }
        
      }
     
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
  // 打开新增表单
  go_to_category_new: function () {
    console.log("获取id_arr:", this);
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
      // pickerIndex: this.data.currentIndex[0] + 1,
      categoryTitleInput: this.data.currentTitle,
      categoryImgBtn: "block"
    })
    console.log("编辑时的Picker值：", this.data.currentIndex, this.data.pickerIndex)
    // console.log("当前选择的一级分类", this.data.currentIndex[0] + 1)
    console.log("当前id:", this.data.currentId, this.data.currentTitle)
    let that = this;
    common.simpleRequest({
      url: app.globalData.domain + "/categories/" + this.data.editCategoryId + "/get_category_detail",
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
  // 按删除按钮前的确认modal
  delete_category_btn: function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '该分类下的商品也会被一起清除，按确认会继续进行删除！',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.delete_category()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 删除按钮事件
  delete_category: function(){
    var that = this;
    wx.showLoading({
      title: '',
    })
    common.simpleRequest({
      url: app.globalData.domain + "/categories/" + that.data.currentId + "/delete_category",
      method: "POST",
      success: function (res) {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: res.data.info,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              if (that.data.pageType == "edit") {
                var url = "/pages/product_new/new?pagetype=edit&id=" + that.data.editProductId
              } else {
                var url = "/pages/product_new/new"
              }
              wx.redirectTo({
                url: url,
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
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
    } else {
      this.setData({
        currentParentId: ""
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
      // sizeType: 'compressed', // 可以指定是原图还是压缩图，默认二者都有
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
  // 预览增加的图片
  lookImage: function (res) {
    var that = this;
    console.log("标记点9", res.target.dataset.index)
    wx.previewImage({
      current: that.data.previewImgUrl[res.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: that.data.previewImgUrl // 需要预览的图片http链接列表
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
          videoTempFilePath: res.tempFilePath,
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







  ///////////////////////////////////////////////  //////////// 新增、编辑分类的表单提交事件
  formSubmitForCategoryNew: function (e) {
    // 先检查是否为新增二级分类，新增时是否有带图片
    if (this.data.selectedCategoryImgUrl == "" && this.data.currentParentId != ""){
      console.log("当前图片为空！")
      console.log("当前选择的分类id：", this.data.currentParentId)
      console.log("当前准备新增二级分类，但没有图片！")
      wx.showModal({
        title: '提示',
        content: '新增二级分类时，图片不能为空。',
        showCancel: false
      })
      return
    }
    // 显示标题Loading
    wx.showNavigationBarLoading()
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
       url = app.globalData.domain + "/categories/create_form_api";
       data = { title: value.title, parent_id: that.data.currentParentId, weight: that.data.formHelperCategoryWeight }

    } else if (that.data.categoryType == "edit") {
      console.log("编辑分类")
      console.log(edit_id)
       url = app.globalData.domain + "/categories/" + edit_id + "/update_form_api";
       data = { title: value.title, parent_id: parent_id, weight: that.data.formHelperCategoryWeight }
    }
    common.simpleRequest({
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
            console.log("进入了上传图片逻辑")
            wx.uploadFile({
              url: app.globalData.domain + '/categories/' + res.data.id + "/update_image_form_api",
              filePath: that.data.selectedCategoryImgUrl,
              header: { 'content-type': 'multipart/form-data', 'Authorization': wx.getStorageSync("userToken") },
              name: 'image',
              success: function(ress){
                console.log(ress)
                if (ress.data == "ok"){
                  console.log("上传图片成功")
                  wx.hideNavigationBarLoading()
                  wx.showModal({
                    title: '提示',
                    content: '提交成功！',
                    showCancel: false
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
            wx.hideNavigationBarLoading()
            wx.showModal({
              title: '提示',
              content: '提交成功！',
              showCancel: false
            })
          }
          
        } else {
          wx.hideNavigationBarLoading()
          wx.showModal({
            title: '发现错误',
            content: res.data.info.join("；"),
            showCancel: false
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
    if (this.data.tempFilePaths == undefined){
      wx.showModal({
        title: '提示',
        content: '您未选择图片,请确保商品有图片哦~',
        showCancel: false
      })
      return false;
    }
    wx.showLoading({
      title: '正在提交...'
    })
    console.log(this.data.tempFilePaths)
    var that = this;
    var value = e.detail.value;
    console.log("即将要上传的分类ID:", this.data.currentId)
    if (this.data.pageType == "edit"){
      var url = app.globalData.domain + '/products/' + this.data.editProductId + '/update_form_wechat'
    } else {
      var url = app.globalData.domain + '/products/create_form_wechat'
    }
    common.simpleRequest({
      url: url,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: { title: value.title, description: value.description, sub_title: value.sub_title, index_show: that.data.formHelperIndexShow, in_stock: that.data.formHelperInStock, is_hide: that.data.formHelperIsHide, weight: that.data.formHelperWeight, price: value.price, category_id: that.data.currentId },
      success: function (res) {
        if (res.data.status == "ok") {
          console.log("新增成功")
          var i = 0, x, id = res.data.id;
          console.log("查看路径准备要上传的图片路径：")
          console.log(that.data.tempFilePaths)
          // 进行图片和视频上传
          console.log("查看视频路径：",that.data.previewVideoUrl)
          common.uploadImgAndVideo(id, that.data.tempFilePaths, that.data.videoTempFilePath, 0)
        } else {
          wx.hideLoading()
          wx.showModal({
            title: '发生错误！',
            content: res.data.info.join("；"),
            showCancel: false
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