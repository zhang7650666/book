// miniprogram/pages/home/home.js
const app = getApp();
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**S
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const _this = this;
    const isHasToken = wx.getStorageSync('token');
    if (isHasToken) {
      const versionSwitch =  wx.getStorageSync('version_switch')
      _this.updateToken(versionSwitch);
    }
    else {
      app.getToken().then(data => {
        wx.setStorageSync('token', JSON.stringify(data.data));
        const versionSwitch = data.data.version_switch || wx.getStorageSync('version_switch');
        _this.updateToken(versionSwitch);
      })
    }
  },
  updateToken(versionSwith = 0) {
    if (versionSwith == 1) {
      wx.switchTab({
        url: `/pages/home/home`,
      })
    }
    else if (versionSwith == 0) {
      wx.navigateTo({
        url: `/pages/calc/calc`,
      })
    }
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
})