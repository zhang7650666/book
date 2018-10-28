// miniprogram/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    books:{
      img: "../../images/u27.jpeg",
      name: "青春年华1",
      author: "琼瑶",
      type:"爱情",
      wordCount:"字数",
      flag:"连载/完结",
      introduce:"简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
    },
    bookList:[
      {
        id: 5678,
        img:"../../images/u27.jpeg",
        name:"青春年华1",
        author:"琼瑶"
      },
      {
        id: 5678,
        img:"../../images/u27.jpeg",
        name:"青春年华2",
        author:"琼瑶"
      },
      {
        id: 5678,
        img:"../../images/u27.jpeg",
        name:"青春年华3",
        author:"琼瑶"
      },
      {
        id: 5678,
        img:"../../images/u27.jpeg",
        name:"青春年华4",
        author:"琼瑶"
      },
      {
        img:"../../images/u27.jpeg",
        name:"青春年华2",
        author:"琼瑶"
      },
      {
        img:"../../images/u27.jpeg",
        name:"青春年华3",
        author:"琼瑶"
      },
      {
        img:"../../images/u27.jpeg",
        name:"青春年华4",
        author:"琼瑶"
      }
    ], // 数据列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    if (!id) {
      //如果没有书本id 向前返回一页;
    }
    this.setData({
      id,
    })
    this.getBookIntro();
  },
  // 继续阅读
  handleKeep(){
    wx.navigateTo({
      url: "/pages/reading/reading"
    })
    
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
  handleRead() {
    wx.navigateTo({
      url: "/pages/reading/reading"
    })
  },
  /**
   * 请求小说简介
   */
  getBookIntro() {
    const {id} = this.data;
    //请求接口
  }
})