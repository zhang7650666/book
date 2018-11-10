import {config} from "../config.js";
const tips = {
  1:"默认错误提示",
  1001:'is post',
  1002:'is json',
  1003:'参数不能为空',
  1004:'openid获取失败',
  1005:"无效的用户",
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
  404:'已确认路径无误',
}
let userToken = JSON.parse(wx.getStorageSync('token') || '{}')
console.log(userToken);
class HTTP{
  request(params){
    if(!params.method){
      params.method = "POST";
    }
    wx.request({
      url: config.baseUrl + params.url,
      data: params.data,
      header: {
        'content-Type': 'application/json;charset=utf-8',
        'token': userToken.token,
      },
      method: params.method,
      success: (res) => { 
        if(res.data.code==200){
            params.success(res.data);
        }else{
          if(params.error){
            params.error(res.data);
          }else{
            let errCode = res.data.code;
            this._err_code(errCode);
          }
          
        }
      },
      fail: (res) => {
        this._err_code(1);
       },
      complete: (res) => { },
    })
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
export {http};
