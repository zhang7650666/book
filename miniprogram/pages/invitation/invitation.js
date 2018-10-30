// miniprogram/pages/invitation/invitation.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integral: 10, // 邀请好友送积分
    count: 3, // 每天只有3次邀请机会
    addCount: 0, // 转发次数
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
    // if (ops.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(ops.target)
    // }
   let _this = this;
    return {
      title: '奔跑的小女孩',
      path: '/pages/index/index',
      desc:'主人公在讲述一个小姑娘，对生活的悲伤，与失望。',
      imageUrl: '/images/u27.jpeg',
      success: function (res) {
        let flag = this.addCount > this.count ? '已转发' : `获得${integral}积分`;
        wx.showToast({
          title: flag ,
          icon: 'success',
          duration: 2000
        })
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
  }
})