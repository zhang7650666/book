// components/blank/blank.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //去书城
    handleStore(){
      wx.switchTab({
        url: `/pages/home/home`,
      })
    }
  }
})
