// miniprogram/pages/wxPay/wxPay.js
import {http} from "../../util/http.js";
Page({
  data: {
    baseUrl: 'http://book.qiyunet.top/wxPay.html',
    url: '',
  },
  onLoad: function (options) {
    let orderParams = wx.getStorageSync('orderData');
    try{
      orderParams = JSON.parse(orderParams);
    }catch(e) {
      orderParams = {};
    }
    const params = Object.keys(orderParams).map(v => {
      return v + '=' + orderParams[v];
    }).filter( v => v).join('&')
    this.setData({
      url: this.data.baseUrl + '?' +　params
    })
  }
})