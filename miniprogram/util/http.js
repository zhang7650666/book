import {config} from "../config.js";
const tips = {
  1:"默认错误提示",
  1005:"错误代码1005",
  3000: "错误代码3000",
}
class HTTP{
  request(params){
    if(!params.method){
      params.method = "POST";
    }
    wx.request({
      url: config.baseUrl + params.url,
      data: params.data,
      header: {
        'content-type': 'application/json',
      },
      method: params.method,
      success: (res) => { 
        // startsWith
        // endsWith  
        let code = res.statusCode.toString();
        if(code.startsWith("2")){
            params.success(res.data);
        }else{
          let errCode = res.data.error_code;
          this._err_code(errCode);
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
