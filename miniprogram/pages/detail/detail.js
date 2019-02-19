// miniprogram/pages/detail/detail.js
const app = getApp();
import {http} from "../../util/http.js";
let WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFirst: false, // 是否第一次阅读
    isStore:"0", // 是否在书架
    fictionDetails: {}, 
    fiction_id: null,
    fiction_class_id: null,
    bookDetails:{},
    bookList:[], // 数据列表
    shareConfig: {}, //分享配置
    isshare: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    const extendParams = {
      spread_source: options.spread_source,
      spread_source_second: options.spread_source_second,
      puid: options.puid,
    }
    wx.setStorageSync('extendParams', JSON.stringify(extendParams));
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    this.setData({
      fiction_id: options.fiction_id,
      isshare: options.isshare || 0,
    })
    if (options.spread_source || options.spread_source_second || options.puid || this.data.isShare == 1) {
      Promise.all([app.getToken(), app.getUserInfo()]).then( result => {
        this.getBookIntro()
      })
    }
    else {
      // 小说详情
      this.getBookIntro();
    }
  },
  // 继续阅读
  handleKeep(){
    wx.navigateTo({
      url: `/pages/reading/reading?fiction_id=${this.data.fiction_id}&fiction_name=${this.data.bookDetails.fiction_name}`
    })
  },
  fictionSet(ev) {;
    if (this.data.bookDetails.fiction_collection == 0) {
      this.handleAdd(ev)
    }else {
      this.handleRemove(ev);
    }
  },
  // 加入书架
  handleAdd(){
    let _this = this;
    http.request({
      url: "add_controller",
      data:{
        fiction_id: this.data.fiction_id,
      },
      success(res) {
        _this.setData({
          bookDetails: {
            ..._this.data.bookDetails,
            fiction_collection: 1,
            collection_id: res.data.controller_id
          }
        })
        wx.showToast({
          title: "已添加到书架",
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  // 移出书架
  handleRemove(ev){
    let _this = this;
    http.request({
      url: "del_controller",
      data:{
        // controller_id: ev.currentTarget.dataset.collection_id,
        controller_id: _this.data.bookDetails.collection_id,
      },
      success(res) {
        _this.setData({
          bookDetails : {
            ... _this.data.bookDetails,
            ...{ fiction_collection: 0}
          }
        })
        wx.showToast({
          title: "已从书架中移出",
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  // 跳转目录页面
  handleDir(){
    wx.navigateTo({
      url: `/pages/directory/directory?fiction_id=${this.data.fiction_id}&fiction_name=${this.data.bookDetails.fiction_name}`,
    })
  },
  handleRead() {
    if (this.data.fiction_id == 0) {
      wx.showToast({
        title: '小说已下架',
        icon:'none',
        duration: 2000,
      })
    }
    else {
      wx.navigateTo({
        url: `/pages/reading/reading?fiction_id=${this.data.fiction_id}&fiction_name=${this.data.bookDetails.fiction_name}`
      })
    }
  },
  // 小说详情页接口
  getBookIntro() {
    let _this = this;
    if (!_this.data.fiction_id) {
      return ;
    };
    http.request({
      url: "fiction_details",
      data:{
        fiction_id: _this.data.fiction_id,
      },
      success(res) {
        const desc = res.data.fiction_desc || '';
        WxParse.wxParse('article', 'html', desc, _this, 5);
        _this.setData({
          bookDetails: res.data || {},
          isFirst: !res.data.fiction_last_chapter_id || res.data.fiction_last_chapter_id == 1
        });
        // 调用同类小说接口
        _this.postSimilarList()
        wx.hideLoading();
      }
    })
  },
  // 同类小说
  postSimilarList(){
    let _this = this;
    http.request({
      url: "similar_list",
      data:{
        // 这个位置有疑问  现在详情页没有返回(fiction_class_id)
        fiction_class_id: _this.data.bookDetails.fiction_class_id || '',
        fiction_id: _this.data.fiction_id || ''
      },
      success(res) {
        _this.setData({
          bookList: res.data
        })
      }
    })
  },
  // 处理错误默认图片
  errImg() {
    this.data.fictionDetails.fiction_img = app.globalData.defaultImg
    this.setData({
      fictionDetails:this.data.fictionDetails
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
    app.routerUploadToken(); 
    this.getShareInfo();
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

  // 邀请成功之后的回调函数
  postActivityBackoff(boolean) {
    const _this = this;
    http.request({
      url: "activity_backoff",
      data: {
        alias: 'fiction',
      },
      success(res) {
        if (!boolean) {
          const score = _this.data.activityMap['invite'].score
          wx.showToast({
            title: `获得${_this.data.score}积分`,
            icon: 'success',
            duration: 3000
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function () {
    let _this = this;
    const { shareConfig = {}, bookDetails } = this.data;
    const version = app.globalData.isCanShareVersion;
    if (version) {
      _this.postActivityBackoff(true);
      return {
        title: shareConfig.title || bookDetails.fiction_name,
        path: app.getSharePathParams(shareConfig.path || `pages/detail/detail?fiction_id=${_this.data.fiction_id}&isshare=1`),
        desc: shareConfig.desc || bookDetails.fiction_desc,
        imageUrl: shareConfig.img || bookDetails.fiction_img,
        success: function (res) {
          //此版本分享回调异常，时有时无，所以不做处理
        },
      }
    }
    else {
      return {
        title: shareConfig.title || bookDetails.fiction_name,
        path: app.getSharePathParams(shareConfig.path || `pages/detail/detail?fiction_id=${_this.data.fiction_id}&isshare=1`),
        desc: shareConfig.desc || bookDetails.fiction_desc,
        imageUrl: shareConfig.img || bookDetails.fiction_img ,
        success: function (res) {
          _this.postActivityBackoff();
          wx.showToast({
            title: `分享成功`,
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          // 转发失败
          wx.showToast({
            title: `邀请失败`,
            image: '/images/u1565.png',
            duration: 2000
          })
        }
      }
    }
  },
  getShareInfo() {
    const _this = this;
    http.request({
      url: "shares_info",
      data: {
        alias: 'fiction',
        fiction_id: _this.data.fiction_id || '',
      },
      success(res) {
        const shareConfig = res.data;
        _this.setData({
          shareConfig,
        })
      },
    })
  },
  toHome() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }
})