// miniprogram/pages/reading/reading.js
import {http} from "../../util/http.js";
let WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fontSize:36, // 默认字体大小
    showSize:18, // 显示 字体大小
    isMask:false, // 浮层显示隐藏
    deduction:[{
      name:'tips',
      checked:false,
      value:'自动扣除，不再提示'
    }], // 选中取消
    fiction_id:'', // 小说ID
    chapter_id:'', // 小说章节id
    fiction_name: '',
    auto_pay: null, //是否自动购买 0 不；1 自动
    fictionRead:{}, // 小说相关对象
    skin: 'default-skin', //阅读风格
    skinMap: {
      white: 'white-skin',
      yellow: 'default-skin',
      green: 'green-skin',
      black: 'black-skin'
    },
    isHasPrev: false,
    isHasNext: true,
    activityMap: {}
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let activityMap = JSON.parse(wx.getStorageSync('activityMap') || '{}')
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    // 从目录页面到阅读页
    if (options.chapter_info){
      let chapter_info = JSON.parse(options.chapter_info);
      this.setData({
        fiction_id: chapter_info.fiction_id, 
        chapter_id: chapter_info.chapter_id,
        is_pay:chapter_info.is_pay,
        activityMap,
        fiction_name: options.fiction_name
      });
    }else{
      // 从其他页面到阅读页
      this.setData({
        fiction_id: options.fiction_id, 
        chapter_id: options.chapter_id || null,
        activityMap,
        fiction_name: options.fiction_name
      });
    }
    wx.setNavigationBarTitle({
      title: options.fiction_name
    });
    // 小说内容初始化展示
    this.handleChapter();
  },
  // 点击呼出设置弹框
  handleSet() {
    this.setData({
      isMask:!this.data.isMask,
    })
  },
  // 字号加大
  handleAdd(){
    if (this.data.fontSize > 54){
      wx.showToast({
        title: "字体大小不能超过28px",
        icon: 'none',
        duration: 1000,
      })
      return;
    }
    this.setData({
      fontSize:this.data.fontSize + 2,
      showSize: this.data.showSize + 1,
    })
  },
  // 字号减小
  handleReduc() {
    if (this.data.fontSize < 26) {
      wx.showToast({
        title: "字体大小不能小于12px",
        icon: 'none',
        duration: 2000,
      })
      return;
    }
    this.setData({
      fontSize: this.data.fontSize - 2,
      showSize: this.data.showSize - 1,
    })
  },
  // 改变背景色
  handleColor(ev){
    let skin = ev.currentTarget.dataset.skin;
    this.setData({
      skin: this.data.skinMap[skin],
    });
  },
  // 加入书城
  handleJoin(ev){
    let _this = this;
    http.request({
      url: "add_controller",
      data:{
        fiction_id: ev.currentTarget.dataset.fiction_id,
      },
      success(res) {
        wx.showToast({
          title: "已添加到书架",
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  // 跳转到目录页面
  handleDir(){
    wx.navigateTo({
      url: `/pages/directory/directory?fiction_id=${this.data.fiction_id}&fiction_name=${this.data.fiction_name}&chapter_id=${this.data.chapter_id}`,
    })
  },
  // 去书城
  handleStore(){
    wx.switchTab({
      url: "/pages/index/index",
    })
  },
  // 小说当前章节内容
  handleChapter(ev){
    let _this = this;
    let chapter = this.data.chapter_id;
    const fromPost = ev ? ev.currentTarget.dataset.prev : null;
    if (fromPost) {
      if (fromPost == 'prev' && this.data.isHasPrev) {
        chapter = this.data.fictionRead.last_chapter_id;
      }
      else if (fromPost == 'next' && this.data.isHasNext) {
        chapter = this.data.fictionRead.next_chapter_id;
      }
      else {
        return ;
      }
    }
    this.setData({
      chapter_id: chapter,
    });
    const param = _this.data.chapter_id ? { chapter_id: _this.data.chapter_id} : {}
    http.request({
      url:"fiction_read",
      data:{
        fiction_id: _this.data.fiction_id,
        // chapter_id: _this.data.chapter_id,
        ...param,
        is_auto_pay: _this.data.auto_pay == null ? '' : _this.data.auto_pay,
        is_pay: _this.data.is_pay
      },
      success(res){
        // 小程序解析html
        // 小说内容res.data.data.fiction_title
        wx.hideLoading();
        if(res.code == 200){
          WxParse.wxParse('article', 'html', res.data.content, _this, 5);
          _this.setData({
            fictionRead: res.data,
            isMask: false,
            auto_pay:res.data.auto_pay,
            isHasPrev: !!res.data.last_chapter_id,
            isHasNext: !!res.data.next_chapter_id,
            chapter_id: res.data.chapter_id
          })
        }
      },
      // error(res){
      //   if(res.code == 3001){
      //     wx.navigateBack({
      //       delta: 1
      //     })
      //   }
      // }
    })
  },
  // checkbox 改变
  checkboxChange(ev){ 
    if (ev.detail.value){
      this.setData({
        auto_pay: ev.detail.value.length,
      })
    }
   
  },
  // 继续阅读
  handleRead(){
    if (this.data.fictionRead.is_pay == 3){
      wx.navigateTo({
        url: "/pages/recharge/recharge",
      })
    } else {
      this.setData({
        fictionRead: {},
      })
      this.handleChapter()
    }
  },
  // 分享好友
  handleShare() {
    wx.navigateTo({
      url: "/pages/recharge/recharge",
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
        const score = _this.data.activityMap['invite'].score
        wx.showToast({
          title: `恭喜你，获得${score}积分`,
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
    if (this.data.shareConfig && this.data.shareConfig.path) {
      const shareConfig = this.data.shareConfig;
      return {
        title: shareConfig.title,
        path: shareConfig.path,
        desc: shareConfig.desc,
        imageUrl: shareConfig.img,
        success: function (res) {
          _this.postActivityBackoff({ alias: 'home' });
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
    else {
      http.request({
        url: "shares_info",
        data: {
          alias: 'invite',
        },
        success(res) {
          const shareConfig = res.data;
          _this.setData({
            shareConfig,
          })
          return {
            title: shareConfig.title,
            path: shareConfig.path,
            desc: shareConfig.desc,
            imageUrl: shareConfig.img,
            success: function (res) {
              _this.postActivityBackoff({ alias: 'invite'});
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
      })
    }
  },
})