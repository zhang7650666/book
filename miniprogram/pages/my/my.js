// miniprogram/pages/my/my.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户信息
    //显示弹窗
    signInShowModel: false,
    //弹窗
    dialogData: {
      //是否只显示确认
      isComfrim: true,
      //描述
      desc: '签到成功，获得10积分！',
      //icon
      icon: '',
      // title: '标题'
    },
    userInfo: {},
    //用户Id,
    useId: 123456789,
    //积分
    integral: '6789',
    isShareShow: false,
    //列表数据
    userList: [
      {
        icon: '/images/my1.png',
        label: '积分充值',
        url:"/pages/recharge/recharge",
      },
      {
        icon: '/images/my2.png',
        label: '积分记录',
        url: "/pages/record/record",
      },
      {
        icon: '/images/my5.png',
        label: '邀请好友 ',
        desc: '可获得30积分',
        url: "/pages/invitation/invitation",
      },
      {
        icon: '/images/my4.png',
        label: '联系客服 ',
        url: "/pages/service/service",
      },
      {
        icon: '/images/my3.png',
        label: '添加到桌面 ',
        desc: '可获得10积分',
        itemType: 'share',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo') || '{}';
    this.setData({
      userInfo: JSON.parse(userInfo)
    })
  },
  // 界面跳转
  handleJump(ev){
    let item = ev.currentTarget.dataset.item;
    if(item.url) {
      wx.navigateTo({
        url: item.url
      })
    } else if (item.itemType == 'share'){
      this.setData({
        isShareShow: true,
      })
    }
  },
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
    this.setData({
      signInShowModel: true,
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