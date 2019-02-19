// miniprogram/pages/home/home.js
const app = getApp();
import { http } from "../../util/http.js";
import { removeHtmlTag } from '../../util/base.js';
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
    circular: true,
    booksList: [], // 小说列表
    indexLooks: [], // 大家都在看
    page: 1,
    size: 10,
    shareConfig: {}, //分享的配置
    activityMap: {},
    userToken: {},
    isshare: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    let activityMap = JSON.parse(wx.getStorageSync('activityMap') || '{}')
    this.setData({
      activityMap,
      isshare: options.isshare || 0,
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    if (options.spread_source || options.spread_source_second || options.puid || this.data.isShare == 1) {
      // Promise.all([app.getToken(), app.getUserInfo()]).then(result => {
      //   // banner接口调用
      //   _this.postAddList({ alias: 'Index_banner', size: 5 })
      //   // hot(热门推荐)，boy（男生推荐），girls（女生推荐）
      //   _this.postIndexHot();
      //   // 大家都在看
      //   _this.postIndexLook({
      //     pullDown: false,
      //     pullUp: false,
      //   });
      // })
      app.getToken().then(data => {
         // banner接口调用
        _this.postAddList({ alias: 'Index_banner', size: 5 })
        // hot(热门推荐)，boy（男生推荐），girls（女生推荐）
        _this.postIndexHot();
        // 大家都在看
        _this.postIndexLook({
          pullDown: false,
          pullUp: false,
        });
      })
    }
    else {
      // banner接口调用
      this.postAddList({ alias: 'Index_banner', size: 5 })
      // hot(热门推荐)，boy（男生推荐），girls（女生推荐）
      this.postIndexHot();
      // 大家都在看
      this.postIndexLook({
        pullDown: false,
        pullUp: false,
      });
    }
    
  },
  // banner图接口请求
  postAddList(obj) {
    const that = this;
    http.request({
      isNotToken: true,
      url: "ad_list",
      data: {
        alias: obj.alias,
        size: obj.size,
      },
      success(data) {
        that.setData({
          imgUrls: data.data
        })
      }
    })
  },
  // hot(热门推荐)，boy（男生推荐），girls（女生推荐）
  postIndexHot() {
    let _this = this;
    http.request({
      isNotToken: true,
      url: "album_list",
      data: {
        page: 1,
        size: 10
      },
      success(res) {
        _this.setData({
          booksList: res.data
        })
        wx.hideLoading();
      }
    })
  },
  // 大家都在看接口调用
  postIndexLook(obj) {
    let _this = this;
    http.request({
      isNotToken: true,
      url: "all_see",
      data: {
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
  handleMore(ev) {
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
  errImg(ev) {
    this.data.imgUrls[ev.currentTarget.dataset.index] = '/images/banner.png'
    this.setData({
      imgUrls: this.data.imgUrls,
    })
  },
  // 点击轮播图片事件触发
  swipclick(ev) {
    wx.navigateTo({
      url: `/pages/detail/detail?fiction_id=${ev.currentTarget.dataset.fiction_id}`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userToken = JSON.parse(wx.getStorageSync('token') || '{}');
    this.setData({
      userToken,
    })
    if (userToken.token) {
      this.getShareInfo();
    }
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
    const _this = this;
    const { shareConfig = {} } = this.data;
    return {
      title: removeHtmlTag(shareConfig.title),
      path: app.getSharePathParams(shareConfig.path) + '&isshare=1',
      desc: removeHtmlTag(shareConfig.desc),
      imageUrl: shareConfig.img,
      success: function (res) {
        // _this.postActivityBackoff({ alias: 'home' });
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
  },
  getShareInfo() {
    const _this = this;
    http.request({
      url: "shares_info",
      data: {
        alias: 'home',
      },
      success(res) {
        const shareConfig = res.data;
        _this.setData({
          shareConfig,
        })
      },
    })
  }
})