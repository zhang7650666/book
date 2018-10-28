// miniprogram/pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordMap: {
      '-1': '收费章节阅读',
      '0': '成功签到',
      '1': '邀请好友',
      '2': '添加到桌面',
      '3': '积分充值',
    },
    list: [],
    recordList:[
      {
        id:0,
        type: '1',   //积分: 扣除, 签到、邀请好友、添加到桌面、积分充值
        integral: 89,
        time:'2018-10-19 19:17',
      },
      {
        id: 1,
        type: '-1',
        integral: 89,
        time: '2018-10-19 19:17',
      },
      {
        id: 2,
        type: '2',
        integral: 89,
        time: '2018-10-19 19:17',
      },
      {
        id: 3,
        type: '3',
        integral: 89,
        time: '2018-10-19 19:17',
      },
      {
        id: 4,
        type: '0',
        integral: 89,
        time: '2018-10-19 19:17',
      },
      {
        id: 5,
        type: '1',
        integral: 89,
        time: '2018-10-19 19:17',
      },
      {
        id: 6,
        type: '1',
        integral: 89,
        time: '2018-10-19 19:17',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIntegralList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  getIntegralList() {
    let list = this.data.recordList.map(v => {
      v.labelText = `${this.data.recordMap[v.type]}${(v.type == '-1' ? ', 扣除' : ', 获得')}${v.integral}积分`;
      return v
    })
   this.setData({
     list: list
   })
  }

})