// miniprogram/pages/list/list.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchBooks: [],
    type:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1 人们推荐   2 男生最爱  3 女生最爱
    let type = '';
    let title = ''
    if(options.title == "1"){
      title = '热门推荐';
      type = 'hot';
    }if(options.title == "2"){
      title = '男生最爱';
      type = 'boy';
    }if(options.title == "3"){
      title = '女生最爱'
      type = 'girls';
    }
    wx.setNavigationBarTitle({
      title: title//页面标题为路由参数
    });
    this.setData({
      type:type,
    })
    // 小说列表接口调用
    this.postFictionList({
      type:this.data.type,
      page:this.data.page,
      size:this.data.size,
      pullDown:false,
      pullUp:false,
    })
  },
  // fiction_list 小说列表请求接口
  postFictionList(obj){
    let _this = this;
    http.request({
      url: "fiction_list",
      data:{
        type:obj.type,
        page:page,
        size:size,
      },
      success(res) {
        if(obj.pullDown){
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
          _this.setData({
            searchBooks:[],
          });
        };
        if(obj.pullUp){
          // 隐藏加载框
          wx.hideLoading();
        };
        _this.setData({
          // 这里需要改成调试时候的实际数据
          searchBooks:this.data.searchBooks.push(res.data),
        });
      }
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
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
     // 页数+1
     that.setData({
      page: 1,
      size: this.data.size
    });
    // 小说列表接口调用
    this.postFictionList({
      type:this.data.type,
      page:this.data.page,
      size:this.data.size,
      pullDown:true,
      pullUp:false,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    that.setData({
      page: this.data.page + 1,
      size: this.data.size
    });
    // 小说列表接口调用
    this.postFictionList({
      type:this.data.type,
      page:this.data.page,
      size:this.data.size,
      pullDown:false,
      pullUp:true,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})