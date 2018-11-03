// miniprogram/pages/home/home.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
  "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
  "http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg",
  "http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 300,
    circular:true,
    hotBooks:[], // 热门推荐
    boyBooks:[], // 男生推荐
    girlsBooks:[], // 女生推荐
    indexLooks:[], // 大家都在看
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // banner接口调用
    this.postAddList({alias:'aaaa',size:3})
    // hot(热门推荐)，boy（男生推荐），girls（女生推荐）
    this.postIndexHot('hot');
    this.postIndexHot('boy');
    this.postIndexHot('girls');
    // 大家都在看
    this.postIndexLook();
  },
  // banner图接口请求
  postAddList(obj){
    http.request({
      url: "ad_list",
      data:{
        alias:obj.alias,
        size:obj.size,
      },
      success(data) {
        // 拿到的数据只取前10条数据
        console.log(data);
      }
    })
  },
  // hot(热门推荐)，boy（男生推荐），girls（女生推荐）
  postIndexHot(arg){
    let _this = this;
    http.request({
      url: "index_hot",
      data:{
        type:arg,
      },
      success(res) {
        let itemBook = '';
        switch(arg){
          case 'hot':
            itemBook = 'hotBooks';
            break;
          case 'boy':
            itemBook = 'boyBooks';
            break;
          case 'girls':
            itemBook = 'girlsBooks';
            break;
        }
        _this.setData({
          // 这里需要改成调试时候的实际数据
          itemBook:res.data,
        })
      }
    })
  },
  // 大家都在看接口调用
  postIndexLook(){
    let _this = this;
    http.request({
      url: "index_look",
      data:{},
      success(res) {
        _this.setData({
          // 这里需要改成调试时候的实际数据
          indexLooks:res.data,
        })
      }
    })
  },
  // 搜索切换
  handleShow() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  // 点击更多
  handleMore(ev){
     // 1(热门推荐)，2（男生推荐），3（女生推荐）
    wx.navigateTo({
      url: `/pages/list/list?title=${ev.currentTarget.dataset.title}`
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