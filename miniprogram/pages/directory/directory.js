// miniprogram/pages/directory/directory.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countPage:100, // 总共多少章节
    dirList:[
      {
        sort:1,
        title:'校园毕业校园毕业校园毕业校园毕业校园毕业校园毕业校园毕业',
        isPay:true,
      },
      {
        sort: 2,
        title: 'xxxxxxxxxxxx',
        isPay: true,
      },
      {
        sort: 3,
        title: 'xxxxxxxxxxxx',
        isPay: true,
      },
      {
        sort: 4,
        title: 'xxxxxxxxxxxx',
        isPay: false,
      },
      {
        sort: 5,
        title: 'xxxxxxxxxxxx',
        isPay: true,
      },
      {
        sort: 6,
        title: 'xxxxxxxxxxxx',
        isPay: false,
      },
      {
        sort: 7,
        title: 'xxxxxxxxxxxx',
        isPay: true,
      },
      {
        sort: 8,
        title: 'xxxxxxxxxxxx',
        isPay: false,
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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