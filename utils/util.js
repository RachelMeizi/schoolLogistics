var app = getApp()


// const host = "http://192.168.1.104"s
const host ="https://jgzycz.store"

const formatTime = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function pxToRpx(px) {
  const systemInfo = wx.getSystemInfoSync()
  return px / systemInfo.windowWidth * 750
}

function rpxToPx(rpx) {
  const systemInfo = wx.getSystemInfoSync()
  return rpx / 750 * systemInfo.windowWidth
}

function isBlank(str) {
  //判断对象是否为空值
  if (Object.prototype.toString.call(str) === '[object Undefined]') { //空
    return true
  } else if (
    Object.prototype.toString.call(str) === '[object String]' ||
    Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
    return str.length == 0 ? true : false
  } else if (Object.prototype.toString.call(str) === '[object Object]') {
    return JSON.stringify(str) == '{}' ? true : false
  } else {
    return true
  }

}
/**
 * 浮点数运算
 */
const floatOpration = {
  /**
   * 加法运输，避免数据相加小数点后产生多位数和计算精度损失
   * @param {Number} num1 - 键，必传
   * @param {Number} num1 - 值，必传
   */
  add(num1, num2) {
    let baseNum, baseNum1, baseNum2;
    let precision // 精度
    try {
      baseNum1 = num1.toString().split('.')[1].length
    } catch (e) {
      baseNum1 = 0
    }
    try {
      baseNum2 = num2.toString().split('.')[1].length
    } catch (e) {
      baseNum2 = 0
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2
    return ((num1 * baseNum + num2 * baseNum) / baseNum).toFixed(precision)
  },
  /**
   * 减法运算，避免数据相减小数点后产生多位数和计算精度损失
   * @param {Number} num1 - 键，必传
   * @param {Number} num1 - 值，必传
   */
  sub(num1, num2) {
    let baseNum, baseNum1, baseNum2
    let precision // 精度
    try {
      baseNum1 = num1.toString().split('.')[1].length
    } catch (e) {
      baseNum1 = 0
    }
    try {
      baseNum2 = num2.toString().split('.')[1].length
    } catch (e) {
      baseNum2 = 0
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
  },
  /**
   * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失
   * @param {Number} num1 - 键，必传
   * @param {Number} num1 - 值，必传
   */
  multi(num1, num2) {
    let baseNum = 0
    try {
      baseNum += num1.toString().split('.')[1].length
    } catch (e) { }
    try {
      baseNum += num2.toString().split('.')[1].length
    } catch (e) { }
    return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, baseNum)
  },
  /**
   * 除法运算，避免数据相除小数点后产生多位数和计算精度损失
   * @param {Number} num1 - 键，必传
   * @param {Number} num1 - 值，必传
   */
  div(num1, num2) {
    let baseNum1 = 0
    let baseNum2 = 0
    let baseNum3, baseNum4
    try {
      baseNum1 = num1.toString().split('.')[1].length
    } catch (e) {
      baseNum1 = 0
    }
    try {
      baseNum2 = num2.toString().split('.')[1].length
    } catch (e) {
      baseNum2 = 0
    }

    baseNum3 = Number(num1.toString().replace('.', ''))
    baseNum4 = Number(num2.toString().replace('.', ''))
    return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1)
  }
}

//上传图片
function uploadImage(url, filePaths) {
  // const length = filePaths.length
  wx.showLoading({
    title: '上传中..',
    mask: true
  })
  return new Promise((resolve, failed) => wx.uploadFile({
    header: app.globalData.header,
    url: host + url,
    filePath: filePaths,
    name: 'file',
    success: resolve,
    fail: res => {
      wx.hideLoading()
      wx.showToast({
        title: '上传失败!',
        icon: 'none'
      })
    }
  }))
  // wx.uploadFile({
  //   header: app.globalData.header,
  //   url: host + url,
  //   filePath: filePaths[i],
  //   name: 'file',
  //   success: res => {
  //     console.log(res.data)
  //     i++
  //     if (i < length) {
  //       this.uploadImage(url, filePaths, i)
  //     } else {
  //       wx.hideLoading()
  //       wx.showToast({
  //         title: '上传完成!',
  //       })
  //     }
  //   },
  //   fail: res => {
  //     wx.hideLoading()
  //     wx.showToast({
  //       title: '上传失败!',
  //       icon: 'none'
  //     })
  //   }
  // })
}



//生成随机字符串
function generateMixed(n) {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G']
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.round(Math.random() * (chars.length - 1));
    res += chars[id];
  }
  return res;
}

// 打开地图选择器
var getPosition = (that) => {
  wx.chooseLocation({
    success: (res) => {
      var newAddress = {
        addressName: res.name,
        address: res.address,
        latitude: res.latitude, //纬度
        longitude: res.longitude //经度  
      }
      that.data.addresses.unshift(newAddress)
      that.setData({
        addresses: that.data.addresses,
        chooseLocation: true
      })
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      })
    }
  })
}

function get(url, data = {}) {

  if (url.indexOf("http://") == -1) {
    console.log("fsdfs")
    url = host + url
  }

  return new Promise((resolve, failed) => wx.request({
    header: app.globalData.header,
    data: data,
    method: "get",
    url: url,
    success: resolve,
    fail: err => {
      wx.showToast({
        title: '服务器错误',
        icon: 'none'
      })
      failed()
    }
  }))
}


function post(url, data) {

  if (url.indexOf("http://") == -1) {
    url = host + url
  }

  return new Promise((resolve, failed) => wx.request({
    method: "post",
    header: app.globalData.header,
    url: url,
    data: data,
    success: resolve,
    fail: err => {
      wx.showToast({
        title: '服务器错误',
        icon: 'none'
      })
      failed()
    }
  }))
}


function userInfo() {
  //获取用户信息存储到全局变量
  return new Promise((resolve, failed) => wx.getUserInfo({
    success: res => {
      app.globalData.userInfo = res.userInfo,
        resolve(res)
    },
    fail: err => {
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      }),
        failed()
    }
  }))
}

function login() {
  return new Promise((resolve, failed) => wx.login({
    success: res => {
      app.globalData.header = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": 'code=' + res.code,
      },
        resolve(res)
    },
    fail: err => {
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      }),
        failed()
    }

  }))
}

/**
 * [checkPhone 验证手机号]
 * @Author   tomorrow-here
 * @DateTime 2018-12-20
 * @param    {string}      phone [要验证的手机号字符串]
 * @return   {boolean}            [手机号正确，返回true，否则返回false]
 */
function checkPhone(phone) {
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    wx.showToast({
      title: '请输入正确的手机号！',
      icon: 'none'
    })
    return false
  } else {
    return true
  }
}



module.exports = {
  floatOpration,
  formatTime,
  getPosition,
  post,
  get,
  login,
  isBlank,
  userInfo,
  generateMixed,
  uploadImage,
  pxToRpx,
  rpxToPx,
  checkPhone
}