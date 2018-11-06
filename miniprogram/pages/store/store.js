// miniprogram/pages/store/store.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData: 0, // 当前选项卡
    countBook:100, // 总共多少本书
    isEdit: true, // 是否是编辑
    swiperHeight:800,
    isRead:true,
    bookPage: 1, // 书架当前页
    readingPage: 1, //最近阅读当前页
    size: 10,
    deleteId: null,
    readArr:[], // 最近阅读数组
    books: [
      // {
      //   fiction_id:1,
      //   fiction_img: "../../images/u27.jpeg",
      //   fiction_name: "青春年华1",
      //   fiction_author: "琼瑶"
      // },
      // {
      //   fiction_id: 1,
      //   fiction_img: "../../images/u27.jpeg",
      //   fiction_name: "青春年华2",
      //   fiction_author: "琼瑶"
      // }
    ], // 数据列表
  },
  //获取当前滑块的index
  bindchange(e) {
    this.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent(e) {
    if (this.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentData: e.target.dataset.current
      })
      if (this.data.currentData == 1) {
        this.getRecentlyBookList()
      }
      else {
        this.getBooksList();
      }
    }
  },
  // 点击编辑
  handleEdit(){
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  // 移除数据
  handleRemove(ev){
    let _this = this;
    this.setData({
      deleteId: ev.currentTarget.dataset.deleteid,
    })
    wx.showModal({
      content: '确认删除本书吗？',
      confirmColor:'#ff3300',
      success(res) {
        if (res.confirm) {
          _this.deleteBookFn();
        }
      }
    })
  },
  // 清空所有
  handleClaer(){
    let _this = this;
    wx.showModal({
      content: '确定要清空书架吗？',
      confirmColor: '#ff3300',
      success(res) {
        if (res.confirm) {
          _this.deleteAllBooks();
        }
      }
    })
  },
  // 清空记录
  handleHistory(){
    let _this = this;
    wx.showModal({
      content: '你确定要清空记录吗？',
      confirmColor: '#ff3300',
      success(res) {
        if (res.confirm) {
          _this.setData({
            readArr: []
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBooksList();
  },
  calcSwiperHeight() {
    this.setData({
      swiperHeight: this.data.books.length % 3 == 0 ? (this.data.books.length / 3 * 370) : (Math.floor(this.data.books.length / 3) + 1) * 370,
    })
  },
  //获取最近阅读列表
  getRecentlyBookList() {
    const _this = this;
    http.request({
      url: "recent_list",
      data: {
      },
      success(res) {
        _this.setData({
          readArr: res.data.list || [],
        });
        _this.calcSwiperHeight();
      }
    })
  },
  //从书架删除
  deleteBookFn() {
    const _this = this;
    http.request({
      url: "controller_list",
      data: {
        controller_id: this.data.deleteId || '',
      },
      success(res) {
        const books = _this.data.books.filter(v => v.fiction_id != _this.data.deleteId)
        _this.setData({
          books,
        })
      }
    })
  },
  //删除书架
  deleteAllBooks() {
    const _this = this;
    http.request({
      url: "del_all_Controller",
      data: {
      },
      success(res) {
        if (res.code == 200) {
          _this.setData({
            books: [],
          });
        }
      }
    })
  },
  //获取书架列表
  getBooksList() {
    const _this = this;
    http.request({
      url: "controller_list",
      data: {
        page: this.data.bookPage,
        size: this.data.size,
      },
      success(res) {
        console.log(res.data.list);
        _this.setData({
         books: res.data.list || [],
       });
        _this.calcSwiperHeight();
      }
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