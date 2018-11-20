// miniprogram/pages/detail/detail.js
const APP = getApp();
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    this.setData({
      fiction_id: options.fiction_id,
    })
    // 小说详情
    this.getBookIntro();
  },
  // 继续阅读
  handleKeep(){
    wx.navigateTo({
      url: `/pages/reading/reading?fiction_id=${this.data.fiction_id}&fiction_name=${this.data.bookDetails.fiction_name}`
    })
  },
  fictionSet() {debugger;
    if (this.data.bookDetails.fiction_collection == 0) {
      this.handleAdd()
    }else {
      this.handleRemove();
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
        if (res.code == 200) {
          wx.showToast({
            title: "已添加到书架",
            icon: 'success',
            duration: 1000
          })
        }
      }
    })
  },
  // 移出书架
  handleRemove(ev){
    let _this = this;
    http.request({
      url: "del_controller",
      data:{
        controller_id:ev.currentTarget.dataset.fiction_id,
      },
      success(res) {
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
    wx.navigateTo({
      url: `/pages/reading/reading?fiction_id=${this.data.fiction_id}&fiction_name=${this.data.bookDetails.fiction_name}`
    })
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
          isFirst: res.data.fiction_last_chapter_id && res.data.fiction_last_chapter_id == 1
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
    this.data.fictionDetails.fiction_img = APP.globalData.defaultImg
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
    APP.routerUploadToken();
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
  postActivityBackoff(obj) {
    http.request({
      url: "activity_backoff",
      data: {
        alias: obj.alias,
      },
      success(res) {
        wx.showToast({
          title: obj.status == 1 ? '已转发' : `获得${obj.score}积分`,
          icon: 'success',
          duration: 2000
        })
      },
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let _this = this;
    // const { shareConfig } = this.data;
    // if (shareConfig && shareConfig.path) {
      return {
        title: shareConfig.title,
        path: shareConfig.path,
        desc: shareConfig.desc,
        imageUrl: shareConfig.img,
        success: function (res) {
          _this.postActivityBackoff({ alias: 'fiction' });
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
    // }
    // else {
      // http.request({
      //   url: "shares_info",
      //   data: {
      //     alias: 'fiction',
      //   },
      //   success(res) {
      //     const shareConfig = res.data;
      //     _this.setData({
      //       shareConfig,
      //     })
      //     return {
      //       title: shareConfig.title,
      //       path: shareConfig.path,
      //       desc: shareConfig.desc,
      //       imageUrl: shareConfig.img,
      //       success: function (res) {
      //         _this.postActivityBackoff({ alias: 'fiction' });
      //       },
      //       fail: function (res) {
      //         // 转发失败
      //         wx.showToast({
      //           title: `邀请失败`,
      //           image: '/images/u1565.png',
      //           duration: 2000
      //         })
      //       }
      //     }
      //   },
      // })
    // }
    
  }
})