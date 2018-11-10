// miniprogram/pages/invitation/invitation.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objInfo:{},
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
   postActivityBackoff(obj){
    http.request({
      url:"activity_backoff",
      data:{
        alias:obj.alias,
      },
      success(res){
        wx.showToast({
          title: obj.status == 1 ? '已转发' : `获得${obj.score}积分` ,
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
    // if (ops.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(ops.target)
    // }
    let _this = this;
    http.request({
      url:"shares_info",
      data:{
        alias:this.data.objInfo.alias,
      },
      success(res){
        return {
          title: res.title,
          path: res.path,
          desc: res.desc,
          imageUrl: res.img,
          success: function (res) {
            _this.postActivityBackoff(this.data.objInfo);
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
    })   
  }
})