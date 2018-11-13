//app.js
// 注意上线之后 （login_code: 'test' || res_login.code）去掉test
import {http} from "./util/http.js";
App({
  onLaunch: function (resa) {
    this.getUserInfo()
  },
  // 请求Token接口
  getToken(res_login){
    http.request({
      url: "token",
      data: {
        login_code: res_login.login_code,
        encrypted_data: res_login.encrypted_data,
        iv: res_login.iv
      },
      success(data) {
        wx.setStorageSync('token', JSON.stringify(data.data));
      }
    })
  },
  // 获取 openSetting
  getOpenSetting(){
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
      success(res) {
        if (res.confirm) {
          wx.openSetting({
            success: (res) => {
              // 如果用户重新同意了授权登录
              if (res.authSetting["scope.userInfo"]) {
                wx.login({
                  success: function (res_login) {
                    if (res_login.code) {
                      wx.getUserInfo({
                        withCredentials: true,
                        success(res_user) {
                          wx.setStorageSync('userInfo', JSON.stringify(res_user.userInfo));
                          wx.setStorageSync('encryptedData', res_user.encryptedData);
                          _this.globalData.userInfo = res_user.userInfo;
                          _this.getToken({
                            login_code: res_login.code,
                            encrypted_data: res_user.encryptedData,
                            iv: res_user.iv
                          })
                        }
                      })
                    }
                  }
                });
              }
            }, 
            fail(res) {
              //this.getOpenSetting();
            }
          })
        }
      }
    })
  },
  // 授权、登录  获取用户信息 封装
  getUserInfo(){
    let _this = this;
    let openId = wx.getStorageSync('openId');
    // let openId = false;
    if (openId) {
      wx.getUserInfo({
        success(res) {
          wx.setStorageSync('userInfo', JSON.stringify(res_user.userInfo));
          wx.setStorageSync('encryptedData', res_user.encryptedData);
          _this.globalData.userInfo = res.userInfo;
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        },
        fail() {
          wx.navigateTo({
            url: '/pages/impower/impower'
          })
        }
      })
    } else {
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
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }, 
              fail() {
                // _this.getOpenSetting();
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

 