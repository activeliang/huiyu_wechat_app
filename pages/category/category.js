// pages/category/category.js
const common = require('../../common.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category_tree: {},
    rightToView: "",
    current: "",
    scrollHeight: "",
    currentScrollItem: null,
    lock: false,
    alreadyCompute: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showShareMenu({
     withShareTicket: true
    })


    
    // this.setData({
    //   category_tree: defaultData.category_tree
    // })

    // console.log("wftc", defaultData.category_tree.scroll_detail_2)

    
    var that = this;
    common.simpleRequest({
      url: app.globalData.domain + '/categories.json',
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          category_tree: res.data,
          loadJob: "ok"
        })
        console.log(res.data)
      }
    })
    

    var that = this;
    // 取值全局变量
    var sysInfo = app.globalData.sysInfo;
    console.log(app.globalData)
    that.setData({
      windowH: sysInfo.windowHeight,
      windowW: sysInfo.windowWidth
    });

    // console.log(defaultData.tree )
    console.log(this.data.windowH)
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '至爱珠宝产品中心',
      path: '/pages/category/category',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  // 右侧栏滚动事件
  scroll: function (e) {
    var that = this;
    if (this.data.alreadyCompute === false) {
      var scroll_detail = this.data.category_tree.scroll_detail;
      var itemHeight = e.detail.scrollHeight / (this.data.category_tree.sum.title * 0.6983 + this.data.category_tree.sum.item)
      var titleHeight = itemHeight * 0.6983
      var j = 0 , tem_a = [], x = 0;
      for (j in scroll_detail){
        x += scroll_detail[j] * itemHeight + titleHeight
        tem_a.push(x)
      }
      that.setData({
        scroll_detail_2: tem_a,
        alreadyCompute: true
      })
    }
      
    if (this.data.lock == false && e.detail.scrollHeight - app.globalData.windowH - e.detail.scrollTop > 50) {
      var scrollTop = e.detail.scrollTop;
      var i = 0;
      var screenWidth = app.globalData.windowW;
      var scroll_detail_2 = this.data.scroll_detail_2
      for (i in scroll_detail_2) {
        if (scroll_detail_2[i] > scrollTop){ 
          that.setData({
            currentScrollItem: i,
            currentNavLeft: ""
          })
          break;
          } 
        i++;
      }
    } else if (e.detail.scrollHeight - app.globalData.windowH - e.detail.scrollTop < 50) {
      // 当距底部不足50px时触发事件
      var tree = this.data.category_tree.tree
      this.setData({
        currentNavLeft: tree[tree.length - 1].id,
        currentScrollItem: "99999",
        lock: true
      })
    } else {
      this.data.lock = false
    }
  },

  // 点击左边侧栏点击事件
  bindLeftTap(e) {
    // 由于事件是冒泡的，所以不确定点击操作是在哪个元素上触发的，但currentTarget表示当前绑定事件对应的节点，便可准确获取该节点上的dataset
    let current_nav_lef = e && e.currentTarget;
    // target
    this.setData({
      rightToView: "nav_right-" + current_nav_lef.id, // 更新右侧的scroll-to-view属性。
      currentNavLeft: current_nav_lef.id,
      currentScrollItem: "9999",
      lock: true
    })
  },

  navigationTo: function(e) {
    console.log(e.currentTarget.dataset.id)
    let currentItem = e && e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/product_list/list?title=' + currentItem.title + "&id=" + currentItem.id
      
    })
    console.log('../product_list/list?title=' + currentItem.title + "&id=" + currentItem.id)
  },

  navigationToProduct: function(e) {
    let currentItem = e && e.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/product/detail?id=' + currentItem.id
    })
  }
  
})