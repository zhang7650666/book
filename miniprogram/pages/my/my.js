// miniprogram/pages/my/my.js
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
    userList: [
      {
        icon: '/images/my1.png',
        alias: '积分充值',
        url:"/pages/recharge/recharge",
      },
      {
        icon: '/images/my2.png',
        alias: '积分记录',
        url: "/pages/record/record",
      },
      // {},
      {
        icon: '/images/my4.png',
        alias: '联系客服 ',
        url: "/pages/service/service",
      },
      // {},
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo') || '{}';
    this.setData({
      userInfo: JSON.parse(userInfo)
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
        console.log(res);

        let invite = {
          icon:'/images/my5.png',
          url:"/pages/invitation/invitation",
          flag:'invite',
          alias: '邀请好友',
        };
        let desktop = {
          icon:'/images/my5.png',
          itemType:'share',
          flag:'desktop',
          alias: '添加到桌面',
        }
        // _this.data.userList[2] = {...res.data.activity.invite, ... invite}; // 邀请好友添加到数据中
        // _this.data.userList[4] = {...res.data.activity.desktop, ...desktop}; // 添加桌面
        _this.data.userList.splice(2, 0, { ...res.data.activity.invite, ...invite });
        _this.data.userList.splice(4, 0, { ...res.data.activity.desktop, ...desktop });
        _this.setData({
          userData: res.data,
          userList:_this.data.userList,
          isShowSignInButton: res.data && res.data.activity && res.data.activity.sign && res.data.activity.sign.status == 1
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
    }
  },
  // 弹框隐藏
  hideShareHandel() {
    this.setData({
      isShareShow: !this.data.isShareShow,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  }
})