// miniprogram/pages/recharge/recharge.js
import {http} from "../../util/http.js";
// import weixin from 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js'
// require('https://res.wx.qq.com/open/js/jweixin-1.3.2.js')
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
        console.log(res)
        const payData = JSON.parse(res.data || '{}');
        // wx.setStorageSync('orderData', res.data);
        // const path = '/pages/wxPay/wxPay'
        // wx.navigateTo({
        //   url: path,
        // })
        wx.requestPayment(
          {
            'appId': payData.appId,
            'timeStamp': payData.timeStamp,
            'nonceStr': payData.nonceStr,
            'package': payData.package,
            'signType': payData.signType,
            'paySign': payData.paySign,
            success(res){
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 1000,
              })
              setTimeout(function() {
                wx.navigateBack({
                  delta: 2
                })
              }, 1000)
            },
            fail() {
              wx.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 1000,
              })
            },
            complete(res) {
              // console.log(res);
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
          isCheckCardId: res.data[0]['card_id'],
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

})