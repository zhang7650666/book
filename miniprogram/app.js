//app.js
import { http, callbackQueue } from "./util/http.js";
import mtiwxsdk from './util/mtj-wx-sdk.js'

App({
  onLaunch: function (resa) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.getSystemInfo().then(data => {
      this.getUserInfo();
    })
  },
  // 请求Token接口
  getToken(res_login = {}) {
    const _this = this;
    return new Promise(function (resolve, reject) {
        wx.login({
          success(res) {
            res_login.login_code = res.code;
            _this.fefrechToken(res_login).then(data => {
              resolve(data)
            })
          }
        })
    });
  },
  fefrechToken(res_login) {
    const _this = this;
    const extendParams = JSON.parse(wx.getStorageSync('extendParams') || '{}');
    return new Promise(function (resolve, reject) {
      http.request({
        isNotToken: true,
        url: "token",
        data: {
          login_code: res_login.login_code,
          channel: _this.globalData.systemInfo.platform == 'ios' ? 'ios' : 'android',
          version: 1.5,
          ...extendParams,
        },
        success(data) {
          wx.hideLoading()
          wx.setStorageSync('token', JSON.stringify(data.data));
          wx.setStorageSync('version_switch', data.data.version_switch);
          http.performCallbackQueue();
          resolve(data);
        },
      })
    })
  },
  // 授权、登录  获取用户信息 封装
  getUserInfo(isLoginStatus = false) {
    const _this = this;
    return new Promise(function (resolve, reject) {
      wx.getSetting({
        success: function (res) {
          wx.getUserInfo({
            // 要求有登录状态
            withCredentials: isLoginStatus,
            success(res_user) {
              wx.setStorageSync('userInfo', JSON.stringify(res_user.userInfo));
              // wx.setStorageSync('encryptedData', res_user.encryptedData);
              _this.setUserInfo({
                nike_name: res_user.userInfo.nickName,
                head_img: res_user.userInfo.avatarUrl
              })
              wx.hideLoading();
              resolve(res_user)
            },
            fail(code) {
              wx.hideLoading();
              wx.redirectTo({
                url: '/pages/impower/impower',
              })
            }
          })
        }
      })
    })
  },
  getSystemInfo(callback) {
    const _this = this;
    return new Promise((resolve, reject) => {
      wx.getSystemInfo({
        success: function (res) {
          _this.globalData.systemInfo = res;
          _this.globalData.isAndroid = res.platform == 'android';
          const baseSDKVersion = res.SDKVersion.split('.').join('');
          const wxVersion = res.version.split('.').join('');
          _this.globalData.isCanShareVersion = baseSDKVersion >= 230 && wxVersion >= 672;
          resolve(res);
        }
      });
    });
  },
  globalData: {
    userInfo: null,
    defaultImg: '/images/u69.png',
    systemInfo: {},
    isAndroid: true,
    isCanShareVersion: false,
  },
  routerUploadToken() {
    const _this = this;
    //没有登陆token就要去登陆
    let userToken = JSON.parse(wx.getStorageSync('token') || '{}')
    const userInfo = JSON.parse(wx.getStorageSync('userInfo') || '{}');
    if (!userToken.token || !userInfo.nickName) {
      Promise.all([_this.getToken(), _this.getUserInfo()]).then(result => {
        console.log();
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
  },
  setUserInfo(params = {}) {
    if (!params.nike_name || !params.head_img) {
      return ;
    }
    http.request({
      url: "set_user_info",
      data: {
        ...params
      },
      success(res) {
      },
    })
  },
  paySwitch() {
    let _this = this;
    return new Promise((resolve, reject) => {
      http.request({
        url: 'pay_switch',
        data: {},
        success(res) {
          resolve(res);
        },
      })
    })
  },
  getSharePathParams(path) {
    let userToken = JSON.parse(wx.getStorageSync('token') || '{}');
    console.log(userToken);
    const pathSpliter = path.indexOf('?') > -1 ? '&' : '?';
    return `${path}${pathSpliter}puid=${userToken.puid}&spread_source=${userToken.spread_source}&spread_source_second=${userToken.spread_source_second}`;
  }
})
