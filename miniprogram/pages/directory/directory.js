// miniprogram/pages/directory/directory.js
import {http} from "../../util/http.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0, // 总共多少章节
    sort: 'asc',  //desc
    page: 'low',
    size: 100,
    fiction_name: '',
    fiction_id: '',
    dirList:[],
    chapter_id: '', //当前章节，高亮
    cur_chapter_id: '', //当前章节，高亮
    isLoadEnd: true,
    isFirstLoadEnd: false,
    isHideLoadMore: true, //加载更多
    isHasPrve: false,
    last_chapter_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      fiction_id: options.fiction_id,
      fiction_name: options.fiction_name,
      chapter_id: options.chapter_id || '',
      cur_chapter_id: options.chapter_id || '',
      last_chapter_id: options.last_chapter_id || 0
    })
    //获取目录列表
    this.getDirectoryList({
      pullDown:false,
      pullUp:false,
    });
    wx.setNavigationBarTitle({
      title: options.fiction_name
    });
  },
  //获取目录列表
  getDirectoryList(obj) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let _this = this;
    _this.setData({
      sort:_this.data.sort
    });
    http.request({
      url: "fiction_chapter",
      data: {
        fiction_id: _this.data.fiction_id || '',
        sort: _this.data.sort,
        page: _this.data.page,
        size: _this.data.size,
        ...(_this.data.last_chapter_id ? {last_chapter_id: _this.data.last_chapter_id} : {}),
        ...(!_this.data.last_chapter_id && _this.data.chapter_id ? { chapter_id: _this.data.chapter_id } : {})
      },
      success(res) {
        // if (obj.pullDown && !obj.pullUp){
        //   // 隐藏导航栏加载框
        //   wx.hideNavigationBarLoading();
        //   // 停止下拉动作
        //   wx.stopPullDownRefresh(); 
        // };
        // if (!obj.pullDown && obj.pullUp){
        //   // 隐藏加载框
        //   wx.hideLoading();
        // };
        const resultList = res.data.list || [];
        if (resultList && !resultList.length) {
          // _this.setData({
          //   isLoadEnd: _this.data.page == 'up' ? false : true ,
          //   isHasPrve: _this.data.page == 'up' ? false : true
          // })
          wx.hideLoading();
          wx.showToast({
            title: '章节已加载完！',
            icon: 'none',
            duration: 2000,
            success() {
              setTimeout(() => {
                wx.hideToast()
              }, 2000)
            }
          })
          return ;
        }
        let lastId = _this.updatePageStatus(resultList);
        let isHasPrveData = true; 
        let isHadNextData = true; 
        // 降序时，上一页与下一页可点击状态
        if (_this.data.sort == 'desc') {
          if (resultList[0]['chapter_id'] == res.data.count) {
            isHasPrveData = false;
          }
          if (resultList[resultList.length - 1]['chapter_id'] == 1) {
            isHadNextData = false;
          }
        }
        else {
          if (resultList[0]['chapter_id'] == 1) {
            isHasPrveData = false;
          }
          if (resultList[resultList.length - 1]['chapter_id'] == res.data.count) {
            isHadNextData = false;
          }
        }
        _this.setData({
          count: res.data.count,
          dirList: res.data.list && !res.data.list.length ? _this.data.dirList : (res.data.list || []),
          isLoadEnd: isHadNextData,
          isFirstLoadEnd: true,
          isHideLoadMore: true,
          isHasPrve: isHasPrveData,
        });

        wx.hideLoading();
      }
    })
  },
  toReading(ev) {
    let chapterInfo = JSON.stringify(ev.currentTarget.dataset.item);
    wx.navigateTo({
      url: `/pages/reading/reading?chapter_info=${chapterInfo}&fiction_id=${this.data.fiction_id}&fiction_name=${this.data.fiction_name}`
    })
  },
  // 排序
  handleSort() {
    this.setData({
      sort: this.data.sort == 'desc' ? 'asc' : 'desc',
      chapter_id: null,
      last_chapter_id: null,
      // page: 1,
    })
    this.getDirectoryList({
      pullDown:false,
      pullUp:false,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isLoadEnd: false,
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // wx.showNavigationBarLoading();
    //  // 页数+1
    // this.setData({
    //   page: 1,
    // });
    // // 小说列表接口调用
    // this.getDirectoryList({
    //   pullDown:true,
    //   pullUp:false,
    // })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // if (this.data.isLoadEnd) {
    //   return;
    // }
    // // 显示加载图标
    // wx.showLoading({
    //   title: '加载中',
    // })
    // 页数+1
    // this.setData({
    //   page: this.data.page + 1,
    //   isHideLoadMore: false,
    // });
    // this.getDirectoryList({
    //   pullDown:false,
    //   pullUp:true,
    // })
  },
  // updateIsHasPrve() {
  //   if (this.data.sort == 'desc') {
  //         hasPrve = list[list.length - 1]['chapter_id'] || 0;
  //       } else {
  //         hasPrve = list[0]['chapter_id'] || 0;
  //       }
  // },
  updatePageStatus(list, type) {
    const postType = type || 'low';
    list = list || [];
    let hasPrve = '';
    if (list && list.length) {
      if (postType == 'low') {
        hasPrve = list[list.length - 1]['chapter_id'] || 0;
      }
      else {
        hasPrve = list[0]['chapter_id'] || 0;
      }
    }
    return hasPrve;
  },
  prveHander() {
    // sort == 'desc' ? !isHasPrve : isLoadEnd
    // if (this.data.sort == 'desc')
    // if (this.data.isHasPrve) {
      this.setData({
        page: 'up',
        chapter_id: this.updatePageStatus(this.data.dirList, 'up'),
        last_chapter_id: null,
      });
      //获取目录列表
      this.getDirectoryList({
        pullDown: false,
        pullUp: false,
      });
    // }
  },
  nextHander() {
    if (this.data.isLoadEnd) {
      this.setData({
        page: 'low',
        chapter_id: this.updatePageStatus(this.data.dirList),
        last_chapter_id: null,
      });
      //获取目录列表
      this.getDirectoryList({
        pullDown: false,
        pullUp: false,
      });
    }
  }
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },
})