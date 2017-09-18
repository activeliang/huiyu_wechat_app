// 图片上传功能
function uploadImgAndVideo(id, imgPath, videoPath, i) {
  console.log("看")
  console.log(imgPath.length )
  console.log(i < imgPath.length )
  if (i < imgPath.length ){
    wx.uploadFile({
      url: 'http://localhost:3000/products/' + id + '/update_form_wechat',
      method: "POST",
      header: { 'content-type': 'multipart/form-data' },
      filePath: imgPath[i],
      name: 'images[]',
      success: function (res) {
        console.log("上传图片")
        console.log(res.data)
        console.log("成功啦" + i)
        uploadImgAndVideo(id, imgPath, videoPath)
      }
    })
    i++;
  } else {
    uploadVideo(id, videoPath)
  }

}

// if (i < imgPath.length - 1) {
//   uploadImgAndVideo(id, imgPath, videoPath)
// } else {
//   console.log("准备上传视频")
//   console.log(videoPath)
//   uploadVideo(id, videoPath)
// }


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