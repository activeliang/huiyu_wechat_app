// pages/category/category.js
import defaultData from '../../data';
var app = getApp()
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
    lock: false
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

    // console.log("wftc", defaultData.category_tree.scroll_detail)

    
    var that = this;
    wx.request({
      url: 'http://localhost:3000/categories.json',
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          category_tree: res.data
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
      windoww: sysInfo.windowWidth
    });

    console.log(defaultData.tree )
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
      title: '汇宇通产品中心',
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
    if (this.data.lock == false && e.detail.scrollHeight - app.globalData.windowH - e.detail.scrollTop > 50) {
      var that = this;
      var scrollTop = e.detail.scrollTop;
      var i = 0;
      var scroll_detail = this.data.category_tree.scroll_detail;
      for (i in scroll_detail) {
        if (scroll_detail[i] > scrollTop){ 
          that.setData({
            currentScrollItem: i,
            currentNavLeft: ""
          })
          break;
          } 
        i++;
      }
      console.log(this.data.currentScrollItem)
      console.log(e.detail)
    } else if (e.detail.scrollHeight - app.globalData.windowH - e.detail.scrollTop < 50) {
      // 当距底部不足50px时触发事件
      console.log("开始");
      var tree = this.data.category_tree.tree
      this.setData({
        currentNavLeft: tree[tree.length - 1].id,
        currentScrollItem: "99999",
        lock: true
      })
      console.log("这是当前" + tree[tree.length - 1].id, this.data.lock)
    } else {
      this.data.lock = false
    }
    console.log(e.detail.scrollHeight - app.globalData.windowH - e.detail.scrollTop)

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
  }
  
})