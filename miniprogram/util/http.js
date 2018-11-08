import {config} from "../config.js";
const tips = {
  1:"默认错误提示",
  1005:"错误代码1005",
  3000: "错误代码3000",
  4001:'删除书架失败',
  3001:'小说不存在已下架',
  6001: "活动次数已用完",
  1003:"fiction_id不能为空",
  4001:'删除书架失败',
  404:'已确认路径无误',

}
let data = JSON.parse(wx.getStorageSync('token') || '{}')
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
        'token': data.token,
        //'unique_id': data.unique_id
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
