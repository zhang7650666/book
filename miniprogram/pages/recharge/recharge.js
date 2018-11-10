// miniprogram/pages/recharge/recharge.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive: 0,
    isCheckCardId: '',
    topUp:[], // 充值列表
    topUpMap: {},
  },
  // 修改isActive
  handleActive(ev){
    this.setData({
      isActive: ev.currentTarget.dataset.index,
      isCheckCardId: ev.currentTarget.dataset.card_id,
    });
  },
 // 跳转到支付页面
  handlePay(){
    let _this = this;
    http.request({
      url:"wxpay",
      data:{
        card_id: this.data.isCheckCardId,
      },
      success(res){
        wx.requestPayment(
          {
            'appId': res.data.appId,
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': res.data.signType,
            'paySign': res.data.paySign,
            success(){
              
            },
            fail() {

            },
            complete(res) {
              console.log(res);
            }
          })
      },
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
    let _this = this;
    http.request({
      url:"recharge_card",
      data:{},
      success(res){
        _this.setData({
          topUp: res.data,
          topUpMap: (res.data || []).reduce((map, v) => {
            map[v.card_id] = v;
            return map;
          }, {})
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