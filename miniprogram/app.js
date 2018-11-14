//app.js
// 注意上线之后 （login_code: 'test' || res_login.code）去掉test
import { http, callbackQueue} from "./util/http.js";

App({
  onLaunch: function (resa) {
    this.getUserInfo()
  },
  // 请求Token接口
  getToken(res_login){
    http.request({
      isNotToken: true,
      url: "token",
      data: {
        login_code: res_login.login_code,
        encrypted_data: res_login.encrypted_data,
        iv: res_login.iv
      },
      success(data) {
        wx.setStorageSync('token', JSON.stringify(data.data));
        wx.setStorageSync('isInit', true);
        http.performCallbackQueue();
      }
    })
  },
  // 授权、登录  获取用户信息 封装
  getUserInfo(){
    let _this = this;
    let encryptedData = wx.getStorageSync('encryptedData');
    // let encryptedData = false;
    if (!encryptedData) {
      wx.login({
        success(res) {
          if (res.code) {
            wx.getUserInfo({
              // 要求有登录状态
              withCredentials: true,
              success(res_user) {
                wx.setStorageSync('userInfo', JSON.stringify(res_user.userInfo));
                wx.setStorageSync('encryptedData', res_user.encryptedData);
                _this.globalData.userInfo = res.userInfo;
                _this.getToken({
                  login_code: res.code,
                  encrypted_data: res_user.encryptedData,
                  iv: res_user.iv
                })
              }, 
              fail() {
                wx.navigateTo({
                  url: '/pages/impower/impower'
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
    defaultImg:'/images/u69.png'
  }
})



/**
 * 支付函数
 * @param  {[type]} _payInfo [description]
 * @return {[type]}          [description]
 */
// pay:function(_payInfo,success,fail){
// 	var payInfo = {
// 		body:'',
// 		total_fee:0,
// 		order_sn:''
// 	}
// 	Object.assign(payInfo, _payInfo);
// 	if(payInfo.body.length==0){
// 		wx.showToast({
// 			title:'支付信息描述错误'
// 		})
// 		return false;
// 	}
// 	if(payInfo.total_fee==0){
// 		wx.showToast({
// 			title:'支付金额不能0'
// 		})
// 		return false; 
// 	}
// 	if(payInfo.order_sn.length==0){
// 		wx.showToast({
// 			title:'订单号不能为空'
// 		})
// 		return false; 
// 	}
// 	var This = this;
// 	This.getOpenid(function(openid){
// 		payInfo.openid=openid;
// 		This.request({
// 			url:'api/pay/prepay',
// 			data:payInfo,
// 			success:function(res){
// 				var data = res.data;
// 				console.log(data);
// 				if(!data.status){
// 					wx.showToast({
// 						title:data['errmsg']
// 					})
// 					return false;
// 				}
// 				This.request({
// 					url:'api/pay/pay',
// 					data:{prepay_id:data.data.data.prepay_id},
// 					success:function(_payResult){
// 						var payResult = _payResult.data;
// 						console.log(payResult);
// 						wx.requestPayment({
// 							'timeStamp': payResult.timeStamp.toString(),
// 							'nonceStr': payResult.nonceStr,
// 							'package': payResult.package,
// 							'signType': payResult.signType,
// 							'paySign': payResult.paySign,
// 							'success': function (succ) {
// 								success&&success(succ);
// 							},
// 							'fail': function (err) {
// 								fail&&fail(err);
// 							},
// 							'complete': function (comp) { 
 
// 							}
// 						}) 
// 					}
// 				})
// 			}
// 		})
// 	})
// }

 