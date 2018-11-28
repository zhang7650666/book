//app.js
// 注意上线之后 （login_code: 'test' || res_login.code）去掉test
import { http, callbackQueue} from "./util/http.js";

App({
  onLaunch: function (resa) {
    this.getSystemInfo(res => {
      this.openSettingFn();
    });
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  openSettingFn() {
    const _this = this;
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
              })
            }
          })
        }
        else {
          _this.getUserInfo()
          // wx.hideLoading();
        }
      },
      complete() {
        // wx.hideLoading();
      }
    })
  },
  // 请求Token接口
  getToken(res_login){
    const _this = this;
    if (!res_login.login_code) {
      wx.login({
        success(res) {
          res_login.login_code = res.code;
          _this.fefrechToken(res_login)
        }
      })
    }
    else {
      this.fefrechToken(res_login)
    }
  },
  fefrechToken(res_login) {
    const _this = this;
    http.request({
      isNotToken: true,
      url: "token",
      data: {
        login_code: res_login.login_code,
        encrypted_data: res_login.encrypted_data,
        iv: res_login.iv,
        channel: _this.globalData.systemInfo.platform == 'ios' ? 'ios' : 'android'
      },
      success(data) {
        wx.setStorageSync('token', JSON.stringify(data.data));
        wx.setStorageSync('isInit', true);
        http.performCallbackQueue();
      },
    })
  },
  // 授权、登录  获取用户信息 封装
  getUserInfo(){
    const _this = this;
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
                  encrypted_data: res_user.encryptedData,
                  iv: res_user.iv,
                })
              }, 
              fail() {
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
  },
  getSystemInfo(callback) {
    const _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.globalData.systemInfo = res;
        _this.globalData.isAndroid = res.platform == 'android';
      },
      complete(res) {
        callback && callback(res);
      }
    })
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
        // _this.setData({
        //   shareConfig,
        // })
      },
    })
  }
})
