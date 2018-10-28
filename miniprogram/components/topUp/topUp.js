// components/top-up/topUp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    topUp:{
      type:Object,
    },
    isActive:{
      type:Number
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
    // 选中当前
    handleActive(ev){
      let myEventDetail = {
        id: ev.currentTarget.dataset.item.id
      }
      this.triggerEvent('changeActive', myEventDetail)
    },
  }
})
