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
  getUserInfoFun() {
    wx.getUserInfo({
      success: function (res_user) {
        wx.setStorageSync('userInfo', JSON.stringify(res_user.userInfo));
        wx.setStorageSync('encryptedData', res_user.encryptedData);
        wx.navigateTo({
          url: 'pages/index/index',
        })
      },
      fail: function() {
        // wx.showToast({
        //   title: "为了您更好的体验,请先同意授权",
        //   icon: 'none',
        //   duration: 2000
        // });
      }
    })
  }
})