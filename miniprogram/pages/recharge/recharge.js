// miniprogram/pages/recharge/recharge.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive: 0,
    topUp:[], // 充值列表
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
    // 积分充值接口调用
    this.postRechargeCard();
  },
  // 积分充值接口
  postRechargeCard() {
    http.request({
      url:"recharge_card",
      data:{},
      success(res){
        this.setData({
          topUp: res.data,
        })
      },
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