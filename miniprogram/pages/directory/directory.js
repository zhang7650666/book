// miniprogram/pages/directory/directory.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:100, // 总共多少章节
    fiction_class_id: null,
    sort: 'desc',  //asc
    page: 1,
    size: 20,
    dirList:[
      {
        sort:1,
        title:'校园毕业校园毕业校园毕业校园毕业校园毕业校园毕业校园毕业',
        isPay:true,
      },
      {
        sort: 2,
        title: 'xxxxxxxxxxxx',
        isPay: true,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fiction_id: options.fiction_id,
    })
    this.getDirectoryList();
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
    this.setData({
      page: 1,
    })
    this.getDirectoryList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const _this = this;
    this.setData({
      page: _this.data.page ++,
    })
    this.getDirectoryList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取目录列表
  getDirectoryList() {
    let _this = this;
    http.request({
      url: "fiction_chapter",
      data: {
        fiction_id: _this.data.fiction_class_id || '',
        sort: _this.data.sort,
        page: _this.data.page,
        size: _this.data.size,
      },
      success(res) {
        _this.setData({
          count: res.data.count,
          dirList: res.data.list
        })
      }
    })
  }
})