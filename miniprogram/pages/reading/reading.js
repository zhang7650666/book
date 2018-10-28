// miniprogram/pages/reading/reading.js
import {axios} from "../../util/http.js";
let WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readData:{
      title:"不经历风雨怎么能够见到彩虹",
      article:'<div><p>“再一次来到深圳，再次来到广东，我们就是要在这里向世界宣示：中国改革开放永不停步！下一个40年的中国，定当有让世界刮目相看的新成就！”</p><p>24日上午，习近平在深圳参观“大潮起珠江——广东改革开放40周年展览”时坚定作出上述表示。</p><p>展览中，今昔图片强烈对比，历史场景历历再现，全景展示了广东改革开放40年的峥嵘岁月。习近平不时驻足察看，询问有关细节。在会见广东省改革开放相关方面代表时，习近平指出，今年是改革开放40周年。40年来，中国发展成就令世界刮目相看。既然是越走越好，为什么不继续走下去呢？即便我们存在这样那样的一些困难和问题，也要在继续走下去中加以解决、加以克服。我们要坚定沿着改革开放之路走下去，同时要向更深更广的领域中不断开拓，不断提高水平。（记者：张晓松、鞠鹏）,</p></div>',　
    },
    curPage:1, // 当前页码
    endPage:true, // 最后一页
    fontSize:36, // 默认字体大小
    showSize:18, // 显示 字体大小
    bgColor: '#e9dabd', // 默认背景颜色
    isMask:false, // 浮层显示隐藏
    isPay:true, // 是否收费标识
    consume:2, // 消耗积分
    integral:100, // 剩余积分
    deduction:[{
      name:'tips',
      checked:false,
      value:'自动扣除，不在提示'
    }], // 选中取消
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
        title: "字体大小不能操作27px",
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
    if (this.data.fontSize < 24) {
      wx.showToast({
        title: "字体大小不能操作12px",
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
    if(colorvalue == "1"){
      bgColor = "#d0d0ce"
    } else if (colorvalue == "2") {
      bgColor = "#e9dabd"
    } else if (colorvalue == "3") {
      bgColor = "#5a8258"
    } else if (colorvalue == "4") {
      bgColor = "#0c0b0a"
    }
    this.setData({
      bgColor,
    });
  },
  // 加入书城
  handleJoin(){
    let _this = this;
    axios.request({
      url:"classic",
      data:'',
      success(data){
        // 拿到的数据只取前10条数据
        wx.showToast({
          title: "已添加到书架",
          icon: 'success',
          duration: 2000,
        });
        _this.setData({
          isMask:false,
        })
      }
    })
  },
  // 跳转到目录页面
  handleDir(){
    wx.navigateTo({
      url: "/pages/directory/directory",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    WxParse.wxParse('article', 'html', that.data.readData.article, that, 5);
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