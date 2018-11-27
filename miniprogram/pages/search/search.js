// miniprogram/pages/search/search.js
import {http} from "../../util/http.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword:'', // 输入框的绑定值
    isShowSearch:true, // searchStorage 展示隐藏
    page:1,
    size:10,
    sercherStorage:[], // 热门关键字
    searchBooks:[], // 搜索数据
    allLook:[], // 大家都在看数据
    storeKeyword:[], // 存储关键字
    len:10, // 存储数据的条数
    isLoadEnd: false, //搜索结束是否加载完
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 热门关键字 接口调用
    this.postHotKeywords();
  },
  // 热门关键字 接口请求
  postHotKeywords() {
    let _this = this;
    http.request({
      url:"/hot_keywords",
      data:{},
      success(res){
        _this.setData({
          sercherStorage: res.data,
        })
      }
    })
  },
  // 搜索接口
  postSearch(obj) {
    let _this = this;
    if (!_this.data.keyword){
      wx.showToast({
        title: "请输入小说名称或作者",
        icon: 'none',
        duration: 1000,
      });
      return;
    }
    http.request({
      url:"/search",
      data:{
        keyword: _this.data.keyword,
        page: _this.data.page,
        size: _this.data.size, 
      },
      success(res){
        if (obj.pullDown && !obj.pullUp){
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh(); 
        };
        if (!obj.pullDown && obj.pullUp){
          // 隐藏加载框
          wx.hideLoading();
        };
        _this.setData({
          searchBooks: _this.data.page == 1 ? (res.data || []) : [..._this.data.searchBooks, ...res.data],
          isShowSearch: _this.data.searchBooks.length > 0 ? true : false,
          isLoadEnd: res.data.length > 0
        });
        if(_this.data.searchBooks.length == 0){
          // 大家都在看接口调用
          _this.postAllSee({
            pullDown:false,
            pullUp:false,
          });
          _this.setData({
            isShowSearch:false,
          });
        }
      }
    })
  },
  // 大家都在看接口
  postAllSee(obj) {
    obj = obj || {};
    let _this = this;
    http.request({
      url:"/all_see",
      data:{
        page: _this.data.page,
        size: _this.data.size, 
      },
      success(res){
        if (obj.pullDown && !obj.pullUp){
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh(); 
        };
        if (!obj.pullDown && obj.pullUp){
          // 隐藏加载框
          wx.hideLoading();
        };
        _this.setData({
          allLook: _this.data.page == 1 ? (res.data || []) : [..._this.data.allLook, ...res.data],
        })
      }
    })
  },
  // change事件
  bindChange(ev){
    if (this.data.keyword == ev.detail.value && this.data.keyword != ''){
      return;
    }
    this.setData({
      keyword: ev.detail.value,
      // searchBooks:[],
      // isShowSearch:true,
    });
    if (this.data.keyword == '') {
      this.setData({
        searchBooks: [],
        isShowSearch: true,
      });
      return;
    }
    this.postSearch({
      pullDown:false,
      pullUp:false,
    });
    // 存储条数大于限制条件删除一条
    // if (wx.setStorageSync('storeKeyword')){
    //   this.data.storeKeyword = JSON.parse(wx.setStorageSync('storeKeyword'));
    // }
    // if(this.data.storeKeyword.length > this.data.len) {
    //   this.data.storeKeyword.pop();
    //   for (let i = 0; i < this.data.storeKeyword.length; i++) {
    //     if (this.data.storeKeyword[i] == ev.detail.value.trim()) {
    //       this.data.storeKeyword.splice(i, 1);
    //       break;
    //     }
    //   };
    //   this.data.storeKeyword.unshift(ev.detail.value.trim());
    //   wx.setStorageSync('storeKeyword', JSON.stringify(this.data.storeKeyword));
    // }
  },
  // 点击搜索关键字字段
  handleSearch(ev){
    this.setData({
      keyword: ev.currentTarget.dataset.keyword,
    });
    this.postSearch({
      pullDown: false,
      pullUp: false,
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
    if (this.data.searchBooks.length) {
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
      // 页数+1
      this.setData({
        page: 1,
      });
      this.postSearch({
        pullDown: true,
        pullUp: false,
      })
    } 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isLoadEnd) {
      return;
    }
    if (this.data.searchBooks.length) {
      // 显示加载图标
      wx.showLoading({
        title: '加载中',
      })
      // 页数+1
      this.setData({
        page: this.data.page + 1
      });
    
      this.postSearch({
        pullDown: true,
        pullUp: false,
      })
    }
  },

})