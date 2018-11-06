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
    books:{
      img: "../../images/u27.jpeg",
      name: "青春年华1",
      author: "琼瑶",
      type:"爱情",
      wordCount:"字数",
      flag:"连载/完结",
      introduce:"简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
    },
    bookList:[
      {
        id: 5678,
        img:"../../images/u27.jpeg",
        name:"青春年华1",
        author:"琼瑶"
      },
      {
        id: 5678,
        img:"../../images/u27.jpeg",
        name:"青春年华2",
        author:"琼瑶"
      },
      {
        id: 5678,
        img:"../../images/u27.jpeg",
        name:"青春年华3",
        author:"琼瑶"
      },
      {
        id: 5678,
        img:"../../images/u27.jpeg",
        name:"青春年华4",
        author:"琼瑶"
      },
      {
        img:"../../images/u27.jpeg",
        name:"青春年华2",
        author:"琼瑶"
      },
      {
        img:"../../images/u27.jpeg",
        name:"青春年华3",
        author:"琼瑶"
      },
      {
        img:"../../images/u27.jpeg",
        name:"青春年华4",
        author:"琼瑶"
      }
    ], // 数据列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 小说详情
    this.getBookIntro({fiction_id:options.fiction_id});
    // similar_list同类小说
    this.postSimilarList({fiction_class_id:options.fiction_class_id})
  },
  // 继续阅读
  handleKeep(){
    wx.navigateTo({
      url: `/pages/reading/reading?fictionID=${this.data.fictionDetails.fiction_id}&chapter=${this.data.fictionDetails.fiction_look_chapter}`
    })
  },
  // 加入书架
  handleAdd(ev){
    let _this = this;
    http.request({
      url: "add_book_rack",
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
  // 移出书架
  handleRemove(){
    let _this = this;
    http.request({
      url: "remove_book_rack",
      data:{
        fiction_id:ev.currentTarget.dataset.fictionId,
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
      url: `/pages/directory/directory?fictionID=${this.data.fictionDetails.fiction_id}`,
    })
  },
  handleRead() {
    wx.navigateTo({
      url: `/pages/reading/reading?fictionID=${this.data.fictionDetails.fiction_id}&chapter=${this.data.fictionDetails.fiction_look_chapter}`
    })
  },
  // 小说详情页接口
  getBookIntro(obj) {
    let _this = this;
    http.request({
      url: "fiction_details",
      data:{
        fiction_id:obj.id,
      },
      success(res) {

        _this.setData({
          // 这里需要改成调试时候的实际数据
          fictionDetails:res.data,
          isStore:res.data.fiction_collect,
          isFirst:res.data.fiction_look_chapter, // 这里注意没有阅读章节的时候返回什么
        })
      }
    })
  },
  // 同类小说
  postSimilarList(obj){
    let _this = this;
    http.request({
      url: "similar_list",
      data:{
        fiction_class_id:obj.fiction_class_id,
      },
      success(res) {
        _this.setData({
          bbookList:res.data.data
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