// miniprogram/pages/record/record.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordMap: {
      '-1': '收费章节阅读',
      '0': '成功签到',
      '1': '邀请好友',
      '2': '添加到桌面',
      '3': '积分充值',
    },
    list: [],
    pageNo: 1,
    isPullRefresh: false,
    recordList:[
      {
        id:0,
        type: '1',   //积分: 扣除, 签到、邀请好友、添加到桌面、积分充值
        integral: 89,
        time:'2018-10-19 19:17',
      },
      {
        id: 1,
        type: '-1',
        integral: 89,
        time: '2018-10-19 19:17',
      },
      {
        id: 2,
        type: '2',
        integral: 89,
        time: '2018-10-19 19:17',
      },
      {
        id: 3,
        type: '3',
        integral: 89,
        time: '2018-10-19 19:17',
      },
      {
        id: 4,
        type: '0',
        integral: 89,
        time: '2018-10-19 19:17',
      },
      {
        id: 5,
        type: '1',
        integral: 89,
        time: '2018-10-19 19:17',
      },
      {
        id: 6,
        type: '1',
        integral: 89,
        time: '2018-10-19 19:17',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIntegralList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    const that = this;
    this.setData({
      isPullRefresh: true,
      pageNo: 1
    })
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    this.getIntegralList(() => {
      // 隐藏加载框
      wx.hideLoading();
    })
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    this.data.pageNo ++ ;
    this.getIntegralList();
  },

  getIntegralList(callback) {
    const that = this;
    http.request({
      url: "api/Integral/list",
      data: {
        pageNo: that.data.pageNo || 1,
        pageSize: 20,
      },
      success(data) {
        const list = this.pickIntegralList(data.list || this.data.recordList)
        this.setData({
          list: !this.data.list.length && !this.data.isPullRefresh ? [this.data.list, ...list] : list,
        })
        callback && callback();
      }
    })
  },
  // 处理积分显示文字
  pickIntegralList(list) {
    let integralList = (list || []).map(v => {
      v.labelText = `${this.data.recordMap[v.type]}${(v.type == '-1' ? ', 扣除' : ', 获得')}${v.integral}积分`;
      return v
    })
    return integralList;
  }

})