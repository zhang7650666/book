// miniprogram/pages/home/home.js
const app = getApp();
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [], // banner  列表
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 300,
    circular:true,
    booksList:[], // 小说列表
    indexLooks:[], // 大家都在看
    page: 1,
    size: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // banner接口调用
    this.postAddList({alias:'Index_banner',size:5})
    // hot(热门推荐)，boy（男生推荐），girls（女生推荐）
    this.postIndexHot();
    // 大家都在看
    this.postIndexLook({
      pullDown: false,
      pullUp: false,
    });
  },
  // banner图接口请求
  postAddList(obj){
    const that = this;
    http.request({
      url: "ad_list",
      data:{
        alias:obj.alias,
        size:obj.size,
      },
      success(data) {
        that.setData({
          imgUrls: data.data
        })
      }
    })
  },
  // hot(热门推荐)，boy（男生推荐），girls（女生推荐）
  postIndexHot(){
    let _this = this;
    http.request({
      url: "album_list",
      data:{
        page:1,
        size:10
      },
      success(res) {
        _this.setData({
          booksList:res.data
        })
      }
    })
  },
  // 大家都在看接口调用
  postIndexLook(obj){
    let _this = this;
    http.request({
      url: "all_see",
      data:{
        page: this.data.page,
        size: this.data.size,
      },
      success(res) {
        if (!obj.pullDown && obj.pullUp) {
          // 隐藏加载框
          wx.hideLoading();
        };
        if (obj.pullDown && !obj.pullUp) {
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        };
        _this.setData({
          indexLooks: _this.data.page == 1 ? (res.data || []) : [..._this.data.indexLooks, ...res.data],
        })
      }
    })
  },
  // 搜索跳转
  handleShow() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  // 点击更多
  handleMore(ev){
     // 1(热门推荐)，2（男生推荐），3（女生推荐）
    const params = ev.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/list/list?typeid=${params.typeid}&title=${params.title}`
    })
  },
  // 1(热门推荐)，2（男生推荐），3（女生推荐） 默认图片路径
  handleImg(ev) {
    this.data.booksList[ev.detail.outIndex].list[ev.detail.innerIndex].fiction_img = app.globalData.defaultImg;
    this.setData({
      booksList: this.data.booksList
    })
  },
  // 大家都在看默认图片处理
  lookImg(ev) {
    // 现在大家都在看的图片没有是因为他们返回的null  这里不要纠结
    this.data.indexLooks[ev.detail.outIndex].fiction_img = app.globalData.defaultImg;
    this.setData({
      indexLooks: this.data.indexLooks
    })
  },
  // banner 默认图片处理
  errImg(ev){
    this.data.imgUrls[ev.currentTarget.dataset.index] = '/images/banner.png'
    this.setData({
      imgUrls:this.data.imgUrls,
    })
  },
  // 点击轮播图片事件触发
  swipclick(ev){
    wx.navigateTo({
      url: `/pages/detail/detail?fiction_id=${ev.currentTarget.dataset.fiction_id}`
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
    _this.setData({
      page: 1,
    });
    // 小说列表接口调用
    this.postIndexLook({
      pullDown: true,
      pullUp: false,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //大家正在看取30本书，大于30本或列表返回为空时，就不在请求了
    if (this.data.indexLooks.length % this.data.size > 0 || this.data.indexLooks.length >= 30) {
      return;
    }
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    this.setData({
      page: this.data.page + 1,
    });
    // 大家都在看请求
    this.postIndexLook({
      pullDown: false,
      pullUp: true,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})