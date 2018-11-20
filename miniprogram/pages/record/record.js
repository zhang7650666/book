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
    isLoadEnd: false,
    isRefreshEnd: false,
    isHideLoadMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
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
        page: _this.data.page || 1,
        size: _this.data.size,
      },
      success(res) {
        if (obj.pullDown && !obj.pullUp){
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh(); 
        };
        if (!obj.pullDown && obj.pullUp){
          // 隐藏加载框
          wx.hideLoading();
        };
        _this.setData({
          list: _this.data.page == 1 ? (res.data || []) : [..._this.data.list, ...res.data],
          isLoadEnd: res.data.length < 0,
          isHideLoadMore: true,
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function () {
    this.setData({
      isLoadEnd: false,
    })
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
      // 页数+1
    this.setData({
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
    if (this.data.isLoadEnd) {
      return;
    }
    // // 显示加载图标
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    // 页数+1
    this.setData({
      page: this.data.page + 1,
      isHideLoadMore: false,
    });
    // 小说列表接口调用
    this.getIntegralList({
      pullDown:false,
      pullUp:true,
    })
  },
})