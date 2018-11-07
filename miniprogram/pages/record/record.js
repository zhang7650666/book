// miniprogram/pages/record/record.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageNo: 1,
    isPullRefresh: false,
    recordList:[],
    isLoadEnd: false,
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
    if (!this.isLoadEnd || this.isPullRefresh) {
      http.request({
        url: "user_score_record",
        data: {
          pageNo: that.data.pageNo || 1,
          pageSize: 20,
        },
        success(data) {
          // const list = this.pickIntegralList(data.list)
          that.setData({
            list: that.data.pageNo != 1 && !this.data.isPullRefresh ? [this.data.list, ...data.data] : data.data,
            isLoadEnd: !data.data.length,
            isPullRefresh: false,
          })
          callback && callback();
        }
      })
    }
  },
  // 处理积分显示文字
  // pickIntegralList(list) {
  //   let integralList = (list || []).map(v => {
  //     v.labelText = `${this.data.recordMap[v.type]}${(v.type == '-1' ? ', 扣除' : ', 获得')}${v.integral}积分`;
  //     return v
  //   })
  //   return integralList;
  // }

})