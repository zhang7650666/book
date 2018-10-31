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

import config from 'config'
console.log(config)
App({
  onLaunch: function (resa) {
    // let openId = (wx.getStorageSync('openId'));
    let openId = false;
    if (openId) {
      wx.getUserInfo({
        success(res) {
          // this.globalData.userInfo = res.userInfo;
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        },
        fail() {
          console.log("获取失败！")
        }
      })
    } else {
      wx.login({
        success(res) {
          console.log(4567890);
          console.log(res.code);
          console.log(456789);
          if (res.code) {
            wx.getUserInfo({
              withCredentials: true,
              success(res_user) {
                // console.log(res_user)
                // this.globalData.userInfo = res_user.userInfo;

                wx.request({
                  //后台接口地址
                  url: "http://book.qiyunet.top/api/token",
                  data: {
                    login_code: res.code,
                  },
                  method: "POST",
                  success: function (res) {
                    
                    console.log(res);
                  }
                })
              }, 
              fail() {
                wx.showModal({
                  title: '警告通知',
                  content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
                  success(res) {
                    if (res.confirm) {
                      wx.openSetting({
                        success: (res) => {
                          console.log(res)
                          if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                            wx.login({
                              success: function (res_login) {
                                if (res_login.code) {
                                  wx.getUserInfo({
                                    withCredentials: true,
                                    success(res_user) {
                                      http.request({
                                        url: "token",
                                        data: {
                                          login_code: res_login,
                                        },
                                        method: "POST",
                                        // token:wx.getStorageSync('token'),
                                        success(data) {
                                          // 拿到的数据只取前10条数据
                                          console.log('账号信息请求成功');
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
              }
            })
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null,
  }
})
 