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
    books:[
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华1",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华2青春年华2青春年华2青春年华2青春年华2",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华3",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华4",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华2",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华3",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华4",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华2",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华3",
        author:"琼瑶"
      },
      {
        id: 56866,
        img:"../../images/u27.jpeg",
        name:"青春年华4",
        author:"琼瑶"
      }
    ], // 数据列表
    searchBooks: [
      {
        img: "../../images/u27.jpeg",
        name: "青春年华1",
        introduce: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
        author: "琼瑶",
        type: "爱情",
      },
      {
        img: "../../images/u27.jpeg",
        name: "青春年华1",
        introduce: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
        author: "琼瑶",
        type: "爱情",
      },
      {
        img: "../../images/u27.jpeg",
        name: "青春年华1",
        introduce: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
        author: "琼瑶",
        type: "爱情",
      },
      {
        img: "../../images/u27.jpeg",
        name: "青春年华1",
        introduce: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
        author: "琼瑶",
        type: "爱情",
      },
      {
        img: "../../images/u27.jpeg",
        name: "青春年华1",
        introduce: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
        author: "琼瑶",
        type: "爱情",
      },
      {
        img: "../../images/u27.jpeg",
        name: "青春年华1",
        introduce: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
        author: "琼瑶",
        type: "爱情",
      },
      {
        img: "../../images/u27.jpeg",
        name: "青春年华1",
        introduce: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
        author: "琼瑶",
        type: "爱情",
      },
      {
        img: "../../images/u27.jpeg",
        name: "青春年华1",
        introduce: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
        author: "琼瑶",
        type: "爱情",
      },
      {
        img: "../../images/u27.jpeg",
        name: "青春年华1",
        introduce: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
        author: "琼瑶",
        type: "爱情",
      },
      {
        img: "../../images/u27.jpeg",
        name: "青春年华1",
        introduce: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
        author: "琼瑶",
        type: "爱情",
      },
      {
        img: "../../images/u27.jpeg",
        name: "青春年华1",
        introduce: "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
        author: "琼瑶",
        type: "爱情",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // http.request({
    //   url: "ad_list",
    //   data:{
    //     alias:'aaaa',
    //   },
    //   method:"POST",
    //   // token:wx.getStorageSync('token'),
    //   success(data) {
    //     // 拿到的数据只取前10条数据
    //     //console.log(data);
    //   }
    // })

    wx.showModal({
      title: '警告通知',
      content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
      success(res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              console.log(1111)
              console.log(res.authSetting["scope.userInfo"])
              if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录              console.log(222222)
                wx.login({
                  success: function (res_login) {
                    console.log(333)
                    if (res_login.code) {
                      wx.getUserInfo({
                        withCredentials: true,
                        success(res_user) {
                          console.log(res_login.code);
                          http.request({
                            url: "token",
                            data: {
                              login_code: res_login.code,
                            },
                            method: "POST",
                            // token:wx.getStorageSync('token'),
                            success(data) {
                              // 拿到的数据只取前10条数据
                              console.log('账号信息请求成功');
                              console.log(data)
                            }
                          })
                        }
                      })
                    }
                  }
                });
              }
            },
            fail(res) {
              console.log('失败了')
            }
          })
        }
      }
    })

  },
  // onGotUserInfo: function (e) {
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.userInfo)
  //   console.log(e.detail.rawData)
  //   wx.login({
  //     success: function (res_login) {
  //       console.log(res_login)
  //       http.request({
  //         url: "token",
  //         data: {
  //           login_code: res_login.code,
  //         },
  //         method: "POST",
  //         // token:wx.getStorageSync('token'),
  //         success(data) {
  //           // 拿到的数据只取前10条数据
  //           console.log(data);
  //         }
  //       })
  //     }
  //   })
  // },
  // tapToAuthorize(){
  //   wx.openSetting({
  //     success: (res) => {
  //       console.log(res);
  //        res.authSetting = {
  //           "scope.userInfo": true,
  //           "scope.userLocation": true
  //         }
  //       //因为openSetting会返回用户当前设置，所以通过res.authSetting["scope.userInfo"]来判断用户是否勾选了【用户信息】这一项
  //       if (res.authSetting["scope.userInfo"] === true) {
  //         var that = this
  //         app.getUserInfo(function (userInfo) {
  //           console.log(userInfo)
  //           //更新数据
  //           that.setData({
  //             userInfo: userInfo,
  //             noAuthorized: false
  //           })
  //         })
  //       }
  //       else {
  //         wx.showModal({
  //           title: '用户未授权',
  //           content: '如需正常使用小程序，请点击授权按钮，勾选用户信息并点击确定。',
  //           showCancel: false,
  //           success: function (res) {
  //             if (res.confirm) {
  //               console.log('用户点击确定')
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  // 搜索切换
  handleShow() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  // 点击更多
  handleMore(ev){
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