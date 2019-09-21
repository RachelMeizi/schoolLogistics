// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pages: '',
    sizeList: [
      { title: '1', size: '150*455' },      
      { title: '4', size: '150*455' },
      { title: '5', size: '150*455' },
      { title: '6', size: '150*455' },
      { title: '7', size: '150*455' },
      { title: 'A4', size: '150*455' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.isImg) {
      this.setData({
        pages: 'size',
        
      })
      wx.setNavigationBarTitle({
        title: '选择尺寸',
      })
    }

  },
  chooseSize(e) {
    console.log(e,'1111')
    let size = e.currentTarget.dataset.item.title
    let isImg = e.currentTarget.dataset.isimg

     wx.navigateTo({
       url: '/pages/buycar/buycar?isImg=' + isImg + '&&size=' + size
    })
  },
  /**isImg
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let info = wx.getStorageSync('isImg')
    console.log(info, '88888888')
  },
  print(e) {
    console.log(e.currentTarget.dataset.isimg, '44')
    let isImg = e.currentTarget.dataset.isimg
    let url;
    if (isImg == "true") {
      url = '/pages/upload/upload?isImg=' + isImg
    } else {
      url = '/pages/buycar/buycar?isImg=' + isImg
    }
    wx.navigateTo({
      url: url
    })
    // wx.navigateTo({
    //   url: '/pages/buycar/buycar?isImg=' + isImg,

    // })
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

  }
})