// miniprogram/pages/wxPay/wxPay.js
import {http} from "../../util/http.js";
Page({
  data: {
    baseUrl: 'http://book.qiyunet.top/wxPay.html',
    url: 'http://book.qiyunet.top/wxPay.html',
  },
  onLoad: function (options) {
    const params = Object.keys(options).forEach((v) => {
      return v + '=' + Object.keys[v];
    })
    this.setData({
      url: this.data.baseUrl + '?' +　params
    })
    // 获取网页传过来的值
    // TODO 用es6解构来获取值TODO
  }
})