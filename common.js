var app = getApp()

// 图片上传功能
function uploadImgAndVideo(id, imgPath, videoPath, i) {
  console.log("进入了图片上传action")
  if (imgPath == undefined){
    wx.hideLoading()
    wx.showModal({
      title: '提示',
      content: '提交成功！',
      showCancel: false
    })
  } else {
  console.log(imgPath.length )
  console.log("I等于",i)
  console.log(i <= imgPath.length - 1 )
  if (i <= imgPath.length - 1 ){
    console.log("标记点a")
    wx.uploadFile({
      url: app.globalData.domain + '/products/' + id + '/add_product_image',
      method: "POST",
      header: { 'content-type': 'multipart/form-data', 'Authorization': wx.getStorageSync("userToken") },
      filePath: imgPath[i],
      name: 'image',
      success: function (res) {
        console.log(res)
        console.log("上传图片")
        console.log(res.data)
        console.log("成功啦" + i)
        console.log("文件地址：", id, imgPath, videoPath, i)
        uploadImgAndVideo(id, imgPath, videoPath, i)
      },
      complete: function(res2){
        if (i = imgPath.length - 1){
          if (videoPath == undefined){
            wx.hideLoading()
            console.log("标记点2：", res2.data)
            if (res2.data == "ok"){
            wx.showModal({
              title: '提示',
              content: '提交成功！',
              showCancel: false,
              success: function (res) {
                // 当用户点击了确定后，刷新当前页面
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.redirectTo({
                    url: '/pages/product_new/new',
                  })
                } 
              }
            })
            } else {
              wx.showModal({
                title: '发生错误',
                content: "权限错误",
                showCancel: false,
                success: function (res) {
                  // 当用户点击了确定后，刷新当前页面
                  if (res.confirm) {
                    console.log('用户点击确定')
                    delete_proudct(id)
                  }
                }
              })
            }
          }
        }
      }
    })
    i++;
  } else if ( videoPath != undefined ){
    uploadVideo(id, videoPath)
  }
  }
}


// 视频上传功能
function uploadVideo(id, videoPath) {
  wx.uploadFile({
    url: app.globalData.domain + '/products/' + id + '/update_form_wechat',
    method: "POST",
    header: { 'content-type': 'multipart/form-data', 'Authorization': wx.getStorageSync("userToken") },
    filePath: videoPath,
    name: 'video',
    success: function(res){
      if (res.data == "ok"){
      console.log("上传视频")
      console.log(res.data)
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '提交成功！',
        showCancel: false,
        success: function (res) {
          // 当用户点击确定后，刷新面前页面
          if (res.confirm) {
            console.log('用户点击确定')
            wx.redirectTo({
              url: '/pages/product_new/new',
            })
          }
        }
      })
      } else {
        wx.showModal({
          title: '发生错误',
          content: "权限错误",
          showCancel: false,
          success: function (res) {
            // 当用户点击了确定后，刷新当前页面
            if (res.confirm) {
              console.log('用户点击确定')
              // wx.redirectTo({
              //   url: '/pages/product_new/new',
              // })
              delete_proudct(id)
            }
          }
        })
      }
    }
  })
}


// 自动在request的header中加入验证的封装方法
function simpleRequest(obj) {
  var sum = 0;
  // 检测初始化是否已经完成
  if (app.globalData.loginStatus == "ok"){
    console.log("当前初始化登录状态为”成功“！")
    // 当初始化成功时直接发起请求
    var header = obj.header || {}
    if (!header['Content-Type']) {
      header['Content-Type'] = 'application/json'
    }
    if (!header['Authorization']) {
      console.log("自动设置Authorization")
      header['Authorization'] = wx.getStorageSync("userToken")
    }

    // This must be wx.request !
    console.log("印出header", header)
    wx.request({
      url: obj.url,
      data: obj.data || {},
      method: obj.method || 'GET',
      header: header,
      success: function (res) {
        typeof obj.success == "function" && obj.success(res)
      },
      fail: obj.fail || function () { },
      complete: obj.complete || function () { }
    })
  } else {
    // 当初始化登录未完成时，执行轮询等待
    console.log("小程序初始化登录未完成！")
    setTimeout(function(){
      sum++;
      console.log("等待次数：", sum)
      // 当sum累加到10次，即3秒后，执行一次始始化登录
      if (sum % 10 == 0){
        console.log("等待超过3秒，进行一次初始化登录")
        app.initialLogin()
      }
      simpleRequest(obj)
    },330)

  }
}

// 当新增商品上传图片失败时，删除已新增的商品，
function delete_proudct(product_id){
  simpleRequest({
    url: app.globalData.domain + "delete_form_wechat",
    data: {id: product_id},
    method: "DELETE"
  })
}





module.exports.uploadImgAndVideo = uploadImgAndVideo
exports.simpleRequest = simpleRequest