// miniprogram/pages/recharge/recharge.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive: 0,
    topUp:[
      {
        id:0,
        money:1,
        proportion:50,
        giving:0,
        add:0,
      },
      {
        id: 1,
        money: 2,
        proportion: 100,
        giving: 0,
        add: 0,
      },
      {
        id: 2,
        money: 3,
        proportion: 150,
        giving: 0,
        add: 0,
      },
      {
        id: 3,
        money: 6,
        proportion: 300,
        giving: 50,
        add: 1,
      },
      {
        id: 4,
        money: 10,
        proportion: 500,
        giving: 100,
        add: 2,
      },
    ], // 充值列表
  },
  // 修改isActive
  handleActive(ev){
    this.setData({
      isActive:ev.detail.id,
    })
  },
 // 跳转到支付页面
  handlePay(){
    wx.navigateTo({
      url: "/pages/wxPay/wxPay",
    })
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