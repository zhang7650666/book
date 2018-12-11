//app.js
// 注意上线之后 （login_code: 'test' || res_login.code）去掉test
import { http, callbackQueue} from "./util/http.js";
import mtiwxsdk from './util/mtj-wx-sdk.js'

App({
  onLaunch: function (resa) {
    // this.getSystemInfo(res => {
    //   this.openSettingFn();
    // });
    this.getSystemInfo().then( data => {
      this.openSettingFn();
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  openSettingFn() {
    const _this = this;
    return new Promise(function (resolve, reject) {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              withCredentials: true,
              success: function (res_user) {
                wx.setStorageSync('userInfo', JSON.stringify(res_user.userInfo));
                wx.setStorageSync('encryptedData', res_user.encryptedData);
                _this.getToken({
                  encrypted_data: res_user.encryptedData,
                  iv: res_user.iv
                }).then( data => {
                  resolve(data)
                })
              }
            })
          }
          else {
            _this.getUserInfo()
          }
        }
      })
    })
  },
  // 请求Token接口
  getToken(res_login = {}){
    const _this = this;
    return new Promise(function (resolve, reject) {
      if (!res_login.login_code) {
        wx.login({
          success(res) {
            res_login.login_code = res.code;
            _this.fefrechToken(res_login).then( data => {
              resolve(data)
            })
            
          }
        })
      }
      else {
        this.fefrechToken(res_login)
      }
    });
  },
  fefrechToken(res_login) {
    const _this = this;
    return new Promise(function (resolve, reject) {
      http.request({
        isNotToken: true,
        url: "token",
        data: {
          login_code: res_login.login_code,
          // encrypted_data: res_login.encrypted_data,
          // iv: res_login.iv,
          channel: _this.globalData.systemInfo.platform == 'ios' ? 'ios' : 'android',
          version: 1.1,
        },
        success(data) {
          // wx.setStorageSync('token', JSON.stringify(data.data));
          wx.setStorageSync('version_switch', data.data.version_switch);
          resolve(data);
        },
      })
    })
  },
  // 授权、登录  获取用户信息 封装
  getUserInfo(){
    const _this = this;
    return new Promise(function (resolve, reject) {
      wx.login({
        success(res) {
          if (res.code) {
            wx.getUserInfo({
              // 要求有登录状态
              withCredentials: false,
              success(res_user) {
                console.log(res_user);
                wx.setStorageSync('userInfo', JSON.stringify(res_user.userInfo));
                wx.setStorageSync('encryptedData', res_user.encryptedData);
                _this.getToken({
                  login_code: userToken.token,
                  // encrypted_data: res_user.encryptedData,
                  // iv: res_user.iv,
                }).then( data => {
                  resolve(data);
                })
              }, 
              fail(err) {
                // wx.navigateTo({
                //   url: '/pages/impower/impower'
                // })
              }
            })
          }
        },
        fail: function () {
          console.info("登录失败");
        }
      })
    })
  },
  getSystemInfo(callback) {
    const _this = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     _this.globalData.systemInfo = res;
    //     _this.globalData.isAndroid = res.platform == 'android';
    //   },
    //   complete(res) {
    //     callback && callback(res);
    //   }
    // })
    return new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: function (res) {
          _this.globalData.systemInfo = res;
          _this.globalData.isAndroid = res.platform == 'android';
          resolve(res);
        }
      });
    });
  },
  globalData: {
    userInfo: null,
    defaultImg:'/images/u69.png',
    systemInfo: {},
    isAndroid: true,
  },
  routerUploadToken() {
    //没有登陆token就要去登陆
    let userToken = JSON.parse(wx.getStorageSync('token') || '{}')
    if (!userToken.token) {
      wx.navigateTo({
        url: '/pages/impower/impower'
      })
    }
  },
  getShareInfo(params, callback) {
    http.request({
      url: "shares_info",
      data: {
        alias: params.alias || 'home',
      },
      success(res) {
        const shareConfig = res.data;
        callback && callback(shareConfig);
      },
    })
  }
})
