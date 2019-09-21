const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateItems: [{
        cate_id: 1,
        cate_name: "护肤",
        ishaveChild: true,
        children: [{
            num: 2,
            stock: 24, //库存
            base_unit_name: '盒', //商品单位
            saleNum: 22,
            child_id: 1,
            name: '洁面皂',
            price: 10,
            image: "https://dwz.cn/YnU2IUAV"
          },
          {
            num: 5,
            stock: 24, //库存
            base_unit_name: '盒', //单位
            child_id: 2,
            name: '卸妆',
            saleNum: 10,
            price: 120,
            image: "https://dwz.cn/phvkB1wS"
          }
        ]
      },
      {
        cate_id: 2,
        cate_name: "彩妆",

        ishaveChild: true,
        children: [{
            num: 2,
            child_id: 1,
            saleNum: 22,
            price: 15,

            name: '气垫bb',
            base_unit_name: '盒', //单位

            stock: 24, //库存
            image: "http://5b0988e595225.cdn.sohucs.com/images/20171030/a6217dbc539645d18077c6a9fb1b54b6.jpeg"
          },
          {
            base_unit_name: '盒', //单位
            num: 0,
            saleNum: 5,
            price: 10,

            child_id: 2,
            name: '修容/高光',
            image: "https://dwz.cn/QLZUPCT2"
          },
          {
            num: 1,
            base_unit_name: '盒', //单位
            saleNum: 5,
            price: 10,

            child_id: 3,
            name: '遮瑕',
            image: "https://dwz.cn/wEOgVnV7"
          }
        ]
      },
      {
        cate_id: 3,

        cate_name: "香水/香氛",
        ishaveChild: true,
        children: [{
          child_id: 1,
          base_unit_name: '盒', //单位
          saleNum: 5,
          price: 7,

          num: 0,
          name: '淡香水EDT',
          image: "https://dwz.cn/phvkB1wS"
        }]
      },
      {
        cate_id: 4,
        cate_name: "个人护理",
        ishaveChild: true,
        children: [{
          num: 12,
          child_id: 1,
          base_unit_name: '盒', //单位
          saleNum: 5,
          price: 10,
          name: '淡香水EDT',
          image: "https://dwz.cn/phvkB1wS"
        }]
      }
    ],
    cartGoods: [], //购物车数据
    cartGoodsNum: '',
    curNav: 1,
    curIndex: 0
  },
  //事件处理函数  
  switchRightTab: function(e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
  addGoods(e) {
    let newNum = e.currentTarget.dataset.item.num
    newNum++
    let index = e.currentTarget.dataset.index
    let curIndex = this.data.curIndex,
      cateItems = this.data.cateItems,
      oldNum = cateItems[curIndex].children[index].num;
    cateItems[curIndex].children[index].num = newNum

    this.data.cartGoods.push(e.currentTarget.dataset.item)

    this.setData({
      cateItems: cateItems,
      cartGoods: this.data.cartGoods,
    })
  },
  basketEvent(e) { //购物栏添加数据
    let item = e.detail.item,
      index = e.detail.index,
      cartGood = this.data.cartGoods;
    cartGood[index].num = item.num++
    // this.setData({
    //   cartGoods: cartGood
    // })
    console.log(cartGood[index].num , item.num, '77777')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
// const totalNum=''
    let cartGoods = this.data.cateItems.map(item => {
      item.children.map(res => {
        if (res.num != 0 || res.num != '') {
          this.data.cartGoods.push(res)
          // totalNum=res.num++
          console.log(res.num,'44444444cartGoods')

        }
      })
    })
    this.setData({
      cartGoods: this.data.cartGoods,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})