// miniprogram/pages/my/my.js
const app = getApp();
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户信息
    signInShowModel: false, //显示签到弹窗
    isShowSignInButton: true,//是否可以签到
    dialogData: { //弹窗
      //是否只显示确认
      isComfrim: true,
      //描述
      desc: '签到成功，获得10积分！',
      //icon
      icon: '',
      // title: '标题'
    },
    userInfo: {},
    isShareShow: false,　//显示添加桌面层
    userData:{}, // 用户相关数据
    //列表数据
    userList: [],
    list: [
      {
        icon: '/images/my1.png',
        alias: '积分充值',
        url:"/pages/recharge/recharge",
        flag: 'recharge'
      },
      {
        icon: '/images/my2.png',
        alias: '积分记录',
        url: "/pages/record/record",
      },
      {
        icon: '/images/my4.png',
        alias: '联系客服 ',
        url: "/pages/service/service",
      },
      {
        icon: '/images/my6.png',
        alias: '清除缓存 ',
        itemType: 'clearStore',
      },
    ],
    systemInfo: {},
    activityMap: {},
    isAndroid: false,
    isHasSwitch: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    let userInfo = JSON.parse(wx.getStorageSync('userInfo') || '{}');
    this.setData({
      userInfo: userInfo,
      userList: [..._this.data.list],
      isAndroid: app.globalData.isAndroid,
    });
    // 调用用户信息接口
    this.postUserInfo();
  },
  // 用户信息接口请求
  postUserInfo() {
    let _this = this;
    http.request({
      url:"user_info",
      data:{},
      success(res){ 
        wx.setStorageSync('activityMap', JSON.stringify(res.data.activity || {}))
        let invite = {
          icon:'/images/my5.png',
          url:"/pages/invitation/invitation",
          flag:'invite',
          alias: '邀请好友',
        };
        let desktop = {
          icon:'/images/my3.png',
          itemType:'share',
          flag:'desktop',
          alias: '添加到桌面',
          score: null
        }
        //用户共用同一个接口的弊端，签到后，更新积分需要重新读接口
        let list = [..._this.data.list]
        // let splitCount = !_this.data.isShowSignInButton ? 1 : 0;
        if (res.data.activity.invite) {
          list.splice(2, 0, { ...res.data.activity.invite, ...invite });
        }
        if (res.data.activity.desktop && _this.data.isAndroid) {
          list.splice(5, 0, { ...res.data.activity.desktop, ...desktop });
        }
        _this.setData({
          userData: res.data,
          userList:(list || []).map( v => {
            v.score = v.count ? v.count * v.score : v.score
            return v
          }),
          activityMap: res.data.activity,
          isShowSignInButton: res.data && res.data.activity && res.data.activity.sign && res.data.activity.sign.status == 1 || false,
        })
      },
    })
  },
  // 界面跳转
  handleJump(ev){
    let item = ev.currentTarget.dataset.item;
    let str = JSON.stringify(item);
    if(item.url) {
      wx.navigateTo({
        url: `${item.url}?objInfo=${str}`,
      })
    } else if (item.itemType == 'share'){
      this.setData({
        isShareShow: true,
      })
    } else if (item.itemType == 'clearStore') {
      //清除本地信息;
      try {
        wx.clearStorageSync()
        wx.showToast({
          title: '清除成功！',
          icon: 'success',
          duration: 2000,
        })
      } catch (e) {
        // Do something when catch error
      }
    }
  },
  // 弹框隐藏
  hideShareHandel() {
    this.setData({
      isShareShow: !this.data.isShareShow,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.routerUploadToken();
    this.paySwitch();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  //签到
  userSignIn() {
    let _this = this;
    http.request({
      url: 'activity_backoff',
      data: {
        alias:'sign',
      },
      success(res) {
        _this.setData({
          isShowSignInButton: false,
          signInShowModel: true,
        });
        _this.postUserInfo();
      },
    })
    
  },
  //取消签到框
  hideSignInDialog() {
    this.setData({
      signInShowModel: false,
    })
  },
  //确认签到框 
  confirmSignInDialog(value) {
    this.setData({
      signInShowModel: false,
    })
  },
  paySwitch() {
    let _this = this;
    http.request({
      url: 'pay_switch',
      data: {},
      success(res) {
        const isHasSwitch = res.data.switch && res.data.switch != 1;
        _this.setData({
          list: !isHasSwitch ? _this.data.list.filter( v => v.flag != 'recharge') : _this.data.list
        });
      },
    })
  }
})