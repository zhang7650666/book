// components/searchbook/searchbook.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    books:{
      type:Object,
    }
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
        url: `/pages/detail/detail?fiction_id=${books.fiction_id}&fiction_class_id=${books.fiction_class_id}`,
      })
    },
  }
})
