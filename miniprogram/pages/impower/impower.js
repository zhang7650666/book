const app = getApp();
import { http } from "../../util/http.js";

// pages/impower/impower.js
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
    // let userToken = JSON.parse(wx.getStorageSync('token') || '{}')
    // if (!userToken) {
    //   wx.login({
    //     success(res) {
    //       if (res.code) {
    //         //发起网络请求
    //         wx.request({
    //           url: 'https://test.com/onLogin',
    //           data: {
    //             code: res.code
    //           }
    //         })
    //       } else {
    //         console.log('登录失败！' + res.errMsg)
    //       }
    //     }
    //   })
    // }
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
  // 请求Token接口
  getToken(res_login) {
    http.request({
      isNotToken: true,
      url: "token",
      data: {
        login_code: res_login.login_code,
        encrypted_data: res_login.encrypted_data,
        iv: res_login.iv
      },
      success(data) {
        wx.setStorageSync('token', JSON.stringify(data.data));
        wx.setStorageSync('isInit', true);
        http.performCallbackQueue();
         wx.switchTab({
          url: `/pages/index/index`,
        })
      },
      fail: function () {
        wx.showToast({
          title: '登陆失败',
          icon: 'none',
          duration: 1000,
        })
      }
    })
  },
  bindgetuserinfo(res_user) {
    const _this = this;
    const details = res_user.detail;
    // errMsg "getUserInfo:fail auth deny"
    if (details.errMsg == 'getUserInfo:ok') {
      wx.setStorageSync('userInfo', JSON.stringify(details.userInfo));
      wx.setStorageSync('encryptedData', details.encryptedData);
      wx.login({
        success(res) {
          _this.getToken({
            login_code: res.code,
            encrypted_data: res_user.encryptedData,
            iv: res_user.iv
          })
        }
      })
    }
    else if (details.errMsg == 'getUserInfo:fail auth deny') {

    }
  }
})