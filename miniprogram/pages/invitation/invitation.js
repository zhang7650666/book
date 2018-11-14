// miniprogram/pages/invitation/invitation.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objInfo:{},
    shareInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let objInfo = JSON.parse(options.objInfo);
    this.setData({
      objInfo,
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
   // 邀请成功之后的回调函数
   postActivityBackoff(){
    http.request({
      url:"activity_backoff",
      data:{
        alias:'invite',
      },
      success(res){
        console.log(res);
        wx.showToast({
          title: `已转发,获得${_this.data.score}积分`,
          icon: 'success',
          duration: 2000
        })
      },
    })
   },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let _this = this;
    const { shareInfo } = this.data;
    return {
      title: shareInfo.title,
      path: shareInfo.path,
      desc: shareInfo.desc,
      imageUrl: shareInfo.img,
      success: function (res) {
        _this.postActivityBackoff();
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: `邀请失败`,
          image: '/images/u1565.png',
          duration: 2000
        })
      }
    }
  },
  getShareInfo() {
    const _this = this;
    http.request({
      url: "shares_info",
      data: {
        alias: 'invite',
      },
      success(res) {
        _this.setData({
          shareInfo: res
        })
      },
    }) 
  }
})