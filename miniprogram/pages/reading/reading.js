// miniprogram/pages/reading/reading.js
import {http} from "../../util/http.js";
let WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgActive: 2, // 背景色选中
    fontSize:36, // 默认字体大小
    showSize:18, // 显示 字体大小
    bgColor: '#e9dabd', // 默认背景颜色
    isMask:false, // 浮层显示隐藏
    deduction:[{
      name:'tips',
      checked:false,
      value:'自动扣除，不在提示'
    }], // 选中取消
    fiction_id:'', // 小说ID
    chapter_id:'', // 小说章节id
    is_auto_pay: 0, //是否自动购买 0 不；1 自动
    fictionRead:{}, // 小说相关对象
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从目录页面到阅读页
    if(options.chapterInfo){
      let chapterInfo = JSON.parse(options.chapterInfo);
      this.setData({
        fiction_id: chapterInfo.fiction_id, 
        chapter_id: chapterInfo.chapter_id,
        is_pay:chapterInfo.is_pay,
      });
    }else{
      // 从其他页面到阅读页
      this.setData({
        fiction_id: options.fiction_id, 
        chapter_id: '',
      });
    }
    
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
    let colorvalue = ev.currentTarget.dataset.colorvalue;
    let bgColor = "";
    let bgActive = 2;
    if(colorvalue == "1"){
      bgActive = 1;
      bgColor = "#fff";
    } else if (colorvalue == "2") {
      bgColor = "#e9dabd";
      bgActive = 2;
    } else if (colorvalue == "3") {
      bgActive = 4;
      bgColor = "#5a8258";
    } else if (colorvalue == "4") {
      bgColor = "#0c0b0a";
      bgActive = 4;
    }
    this.setData({
      bgColor,
      bgActive,
    });
  },
  // 加入书城
  handleJoin(ev){
    let _this = this;
    http.request({
      url: "add_controller",
      data:{
        fiction_id:ev.currentTarget.dataset.fictionId,
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
      url: `/pages/directory/directory?fiction_id=${this.data.fiction_id}`,
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
    if(ev && ev.currentTarget.dataset.prev){
      ev.currentTarget.dataset.prev == 'prev' ? chapter = parseInt(this.data.chapter_id) -1 : chapter = parseInt(this.data.chapter_id) +1;
    }
    this.setData({
      chapter_id:_this.data.chapter_id
    });
    http.request({
      url:"fiction_read",
      data:{
        fiction_id: _this.data.fiction_id,
        chapter_id: _this.data.chapter_id,
        is_auto_pay:_this.data.is_auto_pay,
        is_pay: _this.data.is_pay
      },
      success(res){
        // 小程序解析html
        // 小说内容res.data.data.fiction_title
        if(res.code == 200){
          WxParse.wxParse('article', 'html', res.data.content, _this, 5);
          _this.setData({
            fictionRead: res.data,
            isMask: false,
            // is_auto_pay:res.data.is_auto_pay,
          })
        }
      },
      error(res){
        if(res.code == 3001){
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  // checkbox 改变
  checkboxChange(){
    this.setData({
      deduction:!this.data.deduction[0].checked,
      is_auto_pay: this.data.deduction[0].checked ? 1 : 0,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})