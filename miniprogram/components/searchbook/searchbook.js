// components/searchbook/searchbook.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    books:{
      type:Object,
    },
    outIndex: {
      type: Number,
    },
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
    // 跳转详情页
    handleDetail(){
      wx.navigateTo({
        url: `/pages/detail/detail?fiction_id=${this.data.books.fiction_id}`,
      })
    },
    // 图片路径错误
    errImg(ev) {
      var indexObj = {
        outIndex: ev.currentTarget.dataset.outIndex,
      }
      this.triggerEvent('lookImg', indexObj)
    },
  }
})
