// 图片上传功能
function uploadImgAndVideo(id, imgPath, videoPath, i) {
  console.log("看")
  console.log(imgPath.length )
  console.log("I等于",i)
  console.log(i <= imgPath.length - 1 )
  if (i <= imgPath.length - 1 ){
    wx.uploadFile({
      url: 'http://localhost:3000/products/' + id + '/update_product_image',
      method: "POST",
      header: { 'content-type': 'multipart/form-data' },
      filePath: imgPath[i],
      name: 'image',
      success: function (res) {
        console.log("上传图片")
        console.log(res.data)
        console.log("成功啦" + i)
        console.log("文件地址：", id, imgPath, videoPath, i)
        uploadImgAndVideo(id, imgPath, videoPath, i)
      }
    })
    i++;
  } else if ( videoPath != undefined ){
    uploadVideo(id, videoPath)
  }

}


// 视频上传功能
function uploadVideo(id, videoPath) {
  wx.uploadFile({
    url: 'http://localhost:3000/products/' + id + '/update_form_wechat',
    method: "POST",
    header: { 'content-type': 'multipart/form-data' },
    filePath: videoPath,
    name: 'video',
    success: function(res){
      console.log("上传视频")
      console.log(res.data)
    }
  })
}

module.exports.uploadImgAndVideo = uploadImgAndVideo