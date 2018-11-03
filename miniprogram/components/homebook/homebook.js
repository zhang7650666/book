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
      value:9999999,
    },
    isStore:{
      type: Boolean,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  
  },
  // attached() {
  //   this.dataInit();
  // },
  /**
   * 组件的方法列表
   */
  methods: {
    // dataInit(){
    //   let books = this.data.books
    //   this.setData({
    //     books:books
    //   })
    // }
    handleDetail(ev){
        wx.navigateTo({
          url: `/pages/detail/detail?fiction_id=${books.fiction_id}&fiction_class_id=${books.fiction_class_id}`,
        })
    },
    // 空函数
    handlenull(){

    },
    // 删除函数
    handleRemove(ev){
      let myEventDetail = {
        id: ev.currentTarget.dataset.index
      }
      this.triggerEvent('removeData', myEventDetail)
    },
    // 添加到书架
    handleRead(){
      http.request({
        url: "classic",
        data: '',
        success(data) {
          wx.showToast({
            title: '已添加到书架',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }, 
  }
})
