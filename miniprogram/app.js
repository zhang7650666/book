//app.js
// App({
//   onLaunch: function () {
    
//     if (!wx.cloud) {
//       console.error('请使用 2.2.3 或以上的基础库以使用云能力')
//     } else {
//       wx.cloud.init({
//         traceUser: true,
//       })
//     }

//     this.globalData = {

//     }
//   }
// }) 

import { http } from "/util/http.js";
App({
  // onLaunch: function (resa) {
  //   // let openId = (wx.getStorageSync('openId'));
  //   let openId = false;
  //   if (openId) {
  //     wx.getUserInfo({
  //       success(res) {
  //         this.globalData.userInfo = res.userInfo;
  //         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //         // 所以此处加入 callback 以防止这种情况
  //         if (this.userInfoReadyCallback) {
  //           this.userInfoReadyCallback(res)
  //         }
  //       },
  //       fail() {
  //         console.log("获取失败！")
  //       }
  //     })
  //   } else {
  //     wx.login({
  //       success(res) {
  //         console.log(res)
  //         if (res.code) {
  //           wx.getUserInfo({
  //             withCredentials: true,
  //             success(res_user) {
  //               console.log(res_user)
  //               http.request({
  //                 url: "token",
  //                 data: {
  //                   login_code: res.code,
  //                 },
  //                 method: "POST",
  //                 // token:wx.getStorageSync('token'),
  //                 success(data) {
  //                   // 拿到的数据只取前10条数据
  //                   console.log(data);
  //                 }
  //               })
  //             }, 
  //             fail() {
  //               wx.showModal({
  //                 title: '警告通知',
  //                 content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
  //                 success(res) {
  //                   if (res.confirm) {
  //                     wx.openSetting({
  //                       success: (res) => {
  //                         console.log(res)
  //                         if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
  //                           wx.login({
  //                             success: function (res_login) {
  //                               if (res_login.code) {
  //                                 wx.getUserInfo({
  //                                   withCredentials: true,
  //                                   success(res_user) {
  //                                     http.request({
  //                                       url: "token",
  //                                       data: {
  //                                         login_code: res_login,
  //                                       },
  //                                       method: "POST",
  //                                       // token:wx.getStorageSync('token'),
  //                                       success(data) {
  //                                         // 拿到的数据只取前10条数据
  //                                         console.log('账号信息请求成功');
  //                                       }
  //                                     })
  //                                   }
  //                                 })
  //                               }
  //                             }
  //                           });
  //                         }
  //                       }, 
  //                       fail(res) {
  //                         console.log('失败了')
  //                       }
  //                     })
  //                   }
  //                 }
  //               })
  //             }
  //           })
  //         }
  //       }
  //     })
  //   }
  // },
  globalData: {
    userInfo: '111',
  }
})
 