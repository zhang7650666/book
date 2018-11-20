// miniprogram/pages/directory/directory.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0, // 总共多少章节
    sort: 'desc',  //asc
    page: 1,
    size: 20,
    fiction_name: '',
    fiction_id: '',
    dirList:[],
    chapter_id: '', //当前章节，高亮
    isLoadEnd: false,
    isFirstLoadEnd: false,
    isHideLoadMore: true, //加载更多
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      fiction_id: options.fiction_id,
      fiction_name: options.fiction_name,
      chapter_id: options.chapter_id,
    })
    //获取目录列表
    this.getDirectoryList({
      pullDown:false,
      pullUp:false,
    });
    wx.setNavigationBarTitle({
      title: options.fiction_name
    });
  },
  //获取目录列表
  getDirectoryList(obj) {
    let _this = this;
    _this.setData({
      sort:_this.data.sort
    });
    http.request({
      url: "fiction_chapter",
      data: {
        fiction_id: _this.data.fiction_id || '',
        sort: _this.data.sort,
        page: _this.data.page,
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
        wx.hideLoading();
        _this.setData({
          count: res.data.count,
          dirList: _this.data.page == 1 ? (res.data.list || []) : [..._this.data.dirList, ...res.data.list],
          isLoadEnd: res.data.list && !res.data.list.length,
          isFirstLoadEnd: true,
          isHideLoadMore: true,
        });
      }
    })
  },
  toReading(ev) {
    let chapterInfo = JSON.stringify(ev.currentTarget.dataset.item);
    wx.navigateTo({
      url: `/pages/reading/reading?chapter_info=${chapterInfo}&fiction_id=${this.data.fiction_id}&fiction_name=${this.data.fiction_name}`
    })
  },
  // 排序
  handleSort() {
    this.setData({
      sort: this.data.sort == 'desc' ? 'asc' : 'desc',
    })
    this.getDirectoryList({
      pullDown:false,
      pullUp:false,
    });
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
    this.setData({
      isLoadEnd: false,
    })
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
    wx.showNavigationBarLoading();
     // 页数+1
    this.setData({
      page: 1,
    });
    // 小说列表接口调用
    this.getDirectoryList({
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
    // })
    // 页数+1
    this.setData({
      page: this.data.page + 1,
      isHideLoadMore: false,
    });
    this.getDirectoryList({
      pullDown:false,
      pullUp:true,
    })
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },
})