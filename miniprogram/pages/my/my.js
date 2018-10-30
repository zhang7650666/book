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
    //用户名称
    nickName: '',
    //用户头像
    avatarUrl: '',
    //用户Id,
    useId: 123456789,
    //积分
    integral: '6789',
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
        url: "",
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getUserinfo();
  },
  // 界面跳转
  handleJump(ev){
    let url = ev.currentTarget.dataset.item.url;
    if(url) {
      wx.navigateTo({
        url,
      })
    }else{
      console.log(11)
      wx.showShareMenu({
        withShareTicket: true
      })
      // wx.showActionSheet({
      //   itemList: ['A', 'B', 'C'],
      //   success: function (res) {
      //     console.log(JSON.stringify(res))
      //     console.log(res.tapIndex) // 用户点击的按钮，从上到下的顺序，从0开始
      //   },
      //   fail: function (res) {
      //     console.log(res.errMsg)
      //   }
      // })
    }
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
  //获取微信用户信息;
  // getUserinfo() {
  //   let that = this;
  //   wx.getUserInfo({
  //     success: function (res) {
  //       that.setData({
  //         nickName: res.userInfo.nickName,
  //         avatarUrl: res.userInfo.avatarUrl,
  //       })
  //     },
  //     fail: function () {
  //       // fail
  //       console.log("获取失败！")
  //     },
  //     complete: function () {
  //       // complete
  //       console.log("获取用户信息完成！")
  //     }
  //   })
  // },
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