// miniprogram/pages/detail/detail.js
const app = getApp();
import {http} from "../../util/http.js";
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
    bookDetails:{
      // img: "../../images/u27.jpeg",
      // name: "青春年华1",
      // author: "琼瑶",
      // type:"爱情",
      // wordCount:"字数",
      // flag:"连载/完结",
      // introduce:"简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
    },
    bookList:[
     
    ], // 数据列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fiction_id: options.fiction_id
    })
    // 小说详情
    this.getBookIntro();
  },
  // 继续阅读
  handleKeep(){
    wx.navigateTo({
      url: `/pages/reading/reading?fiction_id=${this.data.fictionDetails.fiction_id}`
    })
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
  handleRemove(){
    let _this = this;
    http.request({
      url: "remove_book_rack",
      data:{
        fiction_id:ev.currentTarget.dataset.fiction_id,
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
      url: `/pages/directory/directory?fiction_id=${this.data.fiction_id}`,
    })
  },
  handleRead() {
    wx.navigateTo({
      url: `/pages/reading/reading?fiction_id=${this.data.fiction_id}`
    })
  },
  // 小说详情页接口
  getBookIntro() {
    let _this = this;
    if (!_this.data.fiction_id) {
      return ;
    }
    http.request({
      url: "fiction_details",
      data:{
        fiction_id: _this.data.fiction_id,
      },
      success(res) {
        _this.setData({
          // 这里需要改成调试时候的实际数据
          bookDetails: res.data || {},
        })
        _this.postSimilarList()
      }
    })
  },
  // 同类小说
  postSimilarList(){
    let _this = this;
    http.request({
      url: "similar_list",
      data:{
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

  },
})