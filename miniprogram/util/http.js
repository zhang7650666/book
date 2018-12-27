import {config} from "../config.js";
const tips = {
  1:"默认错误提示",
  1001:'is post',
  1002:'is json',
  1003:'参数不能为空',
  1004:'openid获取失败',
  1005: "无效的用户", 
  2001:'无效的TOKEN',
  3000: "错误代码3000",
  3001:'小说不存在已下架',
  3002:'章节不存在',
  3003:'积分不足',
  3004:'章节购买失败',
  4001:'删除书架失败',
  4002:'清空书架失败',
  4003:'添加书架失败',
  4004:'清除书架阅读历史失败',
  6001: "活动次数已用完",
  1003:"fiction_id不能为空",
  // 404:'已确认路径无误',
}
let userToken = JSON.parse(wx.getStorageSync('token') || '{}')
let callbackQueue = [];
let isTokenValid = true;
class HTTP{
  init(callback) {
    let userToken = wx.getStorageSync('token') || false;
    if (!userToken) {
      callbackQueue.push(callback)
    }
    else if (userToken && callbackQueue.length) {
      this.performCallbackQueue();
    }
    else {
      callback();
    }
  }
  performCallbackQueue() {
    userToken = JSON.parse(wx.getStorageSync('token') || '{}')
    callbackQueue.forEach(function (cb, i) {
      cb && cb();
    });
    callbackQueue = [];
  }
  request(params){
    const _this = this;
    userToken = JSON.parse(wx.getStorageSync('token') || '{}');
    if (!userToken.token && isTokenValid) {
      isTokenValid = false;
      wx.navigateTo({
        url: '/pages/impower/impower'
      })
    }
    if (!params.method) {
      params.method = "POST";
    }
    if (params.isNotToken) {
      wx.request({
        url: config.baseUrl + params.url,
        data: {
          ...(params.data || {}),
        },
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'token': userToken.token || ''
        },
        method: params.method,
        success: (res) => {
          if (res.data.code == 200) {
            params.success(res.data);
          } else {
            if (params.error) {
              params.error(res.data);
            } else {
              let errCode = res.data.code;
              _this._err_code(errCode);
            }
          }
        },
        fail: (res) => {
          console.log(res);
          this._err_code(res.data.code);
        },
        complete: (res) => { },
      })
    }
    else {
      this.init(function () {
        wx.request({
          url: config.baseUrl + params.url,
          data: {
            ...(params.data || {}),
          },
          header: {
            'content-Type': 'application/json;charset=utf-8',
            'token': userToken.token ? userToken.token : JSON.parse(wx.getStorageSync('token') || '{}').token || '',
          },
          method: params.method,
          success: (res) => {
            if (res.data.code == 200) {
              params.success(res.data);
            } else {
              let errCode = res.data.code;
              if (params.error) {
                _this._err_code(errCode);
                params.error && params.error(res.data);
              } else {
                _this._err_code(errCode);
              }
              if (res.data.code == 3002 || res.data.code == 3001) {
                setTimeout( () => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)
              }
              if (res.data.code == 2001) {
                wx.removeStorageSync('token');
              }
            }
          },
          fail: (res) => {
            console.log(res);
            this._err_code(res.data.code);
          },
          complete: (res) => {
            setTimeout(() => {
              wx.hideLoading();
            }, 2000)
            params.complete && params.complete(res.data)
          },
        })
      })
    }
  }
  _err_code(errCode){
    if(!errCode){
      errCode = 1;
    }
    wx.showToast({
      title: tips[errCode],
      icon: 'none',
      duration: 2000,
    })
  }
}

let http = new HTTP();
export {callbackQueue}
export {http};
