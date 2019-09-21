//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    subjectList:[
      {
        
        icon:"/images/order.png",
        comtent:"我的订单",
        righIcon:"/images/right.png",
        url:"/pages/orderForm/orderForm",
      },
      {
        icon: "/images/bag.png",
        comtent: "账户",
        righIcon: "/images/right.png",
        url: "/pages/account/account",
        h20: " height: 20rpx;  width: 100 %; background: #f2f2f2; "
      },
      {
        icon: "/images/kaquan.png",
        comtent: "卡券",
        righIcon: "/images/right.png",
        url: "/pages/logs/logs",       
      },
      {
        icon: "/images/add.png",
        comtent: "地址管理",
        righIcon: "/images/right.png",
        url: "/pages/addAdress/addAdress?index=0",
        h20: " height: 20rpx;  width: 100 %; background: #f2f2f2; "

      } ,
     
      {
        icon: "/images/cust.png",
        comtent: "客服",
        righIcon: "/images/right.png",
        url: "/pages/teamDeatil/teamDeatil",
      },
      {
        icon: "/images/suggest.png",
        comtent: "建议或意见",
        righIcon: "/images/right.png",
        url: "/pages/go-comments/go-comments",
        h20: " height: 20rpx;  width: 100 %; background: #f2f2f2; "

      }  ,
      {
        icon: "/images/share.png",
        comtent: "分享",
        righIcon: "/images/right.png",
      }      
    ],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    console.log(this.data.userInfo,"sss")
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
