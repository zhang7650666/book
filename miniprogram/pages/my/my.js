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
      desc: '签到成功',
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
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    const _this = this;
    let userInfo = JSON.parse(wx.getStorageSync('userInfo') || '{}');
    const extendParams = {
      spread_source: options.spread_source,
      spread_source_second: options.spread_source_second,
      puid: options.puid,
    }
    wx.setStorageSync('extendParams', JSON.stringify(extendParams));
    this.setData({
      userInfo: userInfo,
      userList: [..._this.data.list],
      isAndroid: app.globalData.isAndroid,
    });
    if (!Object.keys(userInfo).length) {
      app.getUserInfo();
    }
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
          'dialogData.desc': `签到成功，${res.data.activity && res.data.activity.sign ? '获得' + res.data.activity.sign.score 　+ '积分' : ''}`
        })

        wx.hideLoading()
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
        wx.switchTab({
          url: `/pages/home/home`,
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
    const _this = this;
    if (!Object.keys(this.data.userInfo).length) {
      let userInfo = JSON.parse(wx.getStorageSync('userInfo') || '{}');
      this.setData({
        userInfo: userInfo
      });
    }
    // 调用用户信息接口
    this.postUserInfo();
    app.routerUploadToken();
    app.paySwitch().then(res => {
      const isHasSwitch = res.data.switch && res.data.switch != 1;
        const updateList = !isHasSwitch ? _this.data.list.filter(v => v.flag != 'recharge') : [
          {
            icon: '/images/my1.png',
            alias: '积分充值',
            url: "/pages/recharge/recharge",
            flag: 'recharge'
          },
          ..._this.data.list.filter(v => v.flag != 'recharge')
        ]
        _this.setData({
          list: updateList
        });
    });
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
})