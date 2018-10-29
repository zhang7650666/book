// miniprogram/pages/home/home.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
  "http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg",
  "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
  "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 300,
    circular:true,
    books:[
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华1",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华2青春年华2青春年华2青春年华2青春年华2",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华3",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华4",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华2",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华3",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华4",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华2",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华3",
        author:"琼瑶"
      },
      {
        id: 56866,
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
   
  },
  // 搜索切换
  handleShow() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  // 点击更多
  handleMore(ev){
    wx.navigateTo({
      url: `/pages/list/list?title=${ev.currentTarget.dataset.title}`
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

  }
})