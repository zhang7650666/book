// miniprogram/pages/record/record.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    size:20,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIntegralList(
      {
        pullDown:false,
        pullUp:false,
      }
    );
  },
  getIntegralList(obj) {
    const _this = this;
    http.request({
      url: "user_score_record",
      data: {
        // page: _this.data.page || 1,
        // size: _this.data.size,
      },
      success(res) {
        if (obj.pullDown && !obj.pullUp){
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh(); 
        };
        _this.setData({
          searchBooks: _this.data.page == 1 ? (res.data || []) : [..._this.data.searchBooks, ...res.data],
        });
        if (!obj.pullDown && obj.pullUp){
          // 隐藏加载框
          wx.hideLoading();
        };
        _this.setData({
          list: _this.data.page == 1 ? (res.data || []) : [..._this.data.list, ...res.data],
        })
      }
    })
  },
  // 处理积分显示文字
  // pickIntegralList(list) {
  //   let integralList = (list || []).map(v => {
  //     v.labelText = `${this.data.recordMap[v.type]}${(v.type == '-1' ? ', 扣除' : ', 获得')}${v.integral}积分`;
  //     return v
  //   })
  //   return integralList;
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
      // 页数+1
    _this.setData({
      page: 1,
    });
    this.getIntegralList({
      pullDown:true,
      pullUp:false,
    })
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    if (this.data.list.length % this.data.size > 0) {
      return;
    }
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    this.setData({
      page: this.data.page + 1
    });
    // 小说列表接口调用
    this.getIntegralList({
      pullDown:false,
      pullUp:true,
    })
  },
})