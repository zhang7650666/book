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
    books: [
      {
        id:0,
        img: "../../images/u27.jpeg",
        name: "青春年华1",
        author: "琼瑶"
      },
      {
        id: 1,
        img: "../../images/u27.jpeg",
        name: "青春年华2",
        author: "琼瑶"
      },
      {
        id: 2,
        img: "../../images/u27.jpeg",
        name: "青春年华3",
        author: "琼瑶"
      },
      {
        id: 3,
        img: "../../images/u27.jpeg",
        name: "青春年华4",
        author: "琼瑶"
      },
      {
        id: 4,
        img: "../../images/u27.jpeg",
        name: "青春年华2",
        author: "琼瑶"
      },
      {
        id: 5,
        img: "../../images/u27.jpeg",
        name: "青春年华3",
        author: "琼瑶"
      },
      {
        id: 6,
        img: "../../images/u27.jpeg",
        name: "青春年华4",
        author: "琼瑶"
      },
      {
        id: 7,
        img: "../../images/u27.jpeg",
        name: "青春年华2",
        author: "琼瑶"
      },
      {
        id: 8,
        img: "../../images/u27.jpeg",
        name: "青春年华3",
        author: "琼瑶"
      },
      {
        id: 8,
        img: "../../images/u27.jpeg",
        name: "青春年华4",
        author: "琼瑶"
      }
    ], // 数据列表
    readArr: [
      {
        id: 0,
        img: "../../images/u27.jpeg",
        name: "青春年华1",
        author: "琼瑶",
        isStore:true,
      },
      {
        id: 1,
        img: "../../images/u27.jpeg",
        name: "青春年华2",
        author: "琼瑶",
        isStore: false,
      },
      {
        id: 2,
        img: "../../images/u27.jpeg",
        name: "青春年华3",
        author: "琼瑶",
        isStore: true,
      },
      {
        id: 3,
        img: "../../images/u27.jpeg",
        name: "青春年华4",
        author: "琼瑶",
        isStore: false,
      },
      {
        id: 4,
        img: "../../images/u27.jpeg",
        name: "青春年华2",
        author: "琼瑶",
        isStore: true,
      },
      {
        id: 5,
        img: "../../images/u27.jpeg",
        name: "青春年华3",
        author: "琼瑶",
        isStore: true,
      },
      {
        id: 6,
        img: "../../images/u27.jpeg",
        name: "青春年华4",
        author: "琼瑶",
        isStore: true,
      },
      {
        id: 7,
        img: "../../images/u27.jpeg",
        name: "青春年华2",
        author: "琼瑶",
        isStore: true,
      },
      {
        id: 8,
        img: "../../images/u27.jpeg",
        name: "青春年华3",
        author: "琼瑶",
        isStore: true,
      },
      {
        id: 8,
        img: "../../images/u27.jpeg",
        name: "青春年华4",
        author: "琼瑶",
        isStore: true,
      }
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
    wx.showModal({
      content: '确认删除本书吗？',
      confirmColor:'#ff3300',
      success(res) {
        if (res.confirm) {
          let index = null;
          _this.data.books.map((item, index) => {
            if (item.id == ev.detail.id) {
              index = index;
              return;
            };
          });
          _this.data.books.splice(index, 1);
          _this.setData({
            books: _this.data.books
          })
        } else if (res.cancel) {
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
          _this.setData({
            books: []
          })
        } else if (res.cancel) {
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
    console.log()
    this.setData({
       swiperHeight: this.data.books.length % 3 == 0 ? (this.data.books.length / 3 * 370) : (Math.floor(this.data.books.length / 3) + 1) * 370,
       // books:[],
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