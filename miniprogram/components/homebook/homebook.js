// components/like/like.js
import { http } from "../../util/http.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    books:{
      type:Object,
    },
    isEdit:{
      type:Boolean,
    },
    isCur:{
      type:Number,
      value:9999,
    },
    isStore:{
      type: Boolean,
    },
    outIndex:{
      type: Number,
    },
    innerIndex: {
      type: Number,
      value:-1,
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
    handleDetail(ev){
        wx.navigateTo({
          url: `/pages/detail/detail?fiction_id=${this.data.books.fiction_id}`,
        })
    },
    // 图片路径错误
    errImg(ev){
      var indexObj = {
        outIndex: ev.currentTarget.dataset.outIndex,
        innerIndex: ev.currentTarget.dataset.innerIndex
      }
      this.triggerEvent('handleImg', indexObj) 
    },
    // 删除函数
    handleRemove(ev){
      let myEventDetail = {
        id: ev.currentTarget.dataset.index
      }
      this.triggerEvent('removeData', myEventDetail)
    },
    // 添加到书架
    handleRead(ev){
      let _this = this;
      const fiction_id = ev.currentTarget.dataset.fiction_id || 1;
      http.request({
        url: "add_controller",
        data: {
          fiction_id: fiction_id,
        },
        success(data) {
          wx.showToast({
            title: '已添加到书架',
            icon: 'success',
            duration: 2000
          })
          let myEventDetail = {
            val: true
          }
          _this.triggerEvent('addCallback', myEventDetail)
        }
      })
    }, 
  }
})
