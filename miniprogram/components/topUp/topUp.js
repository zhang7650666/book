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
    },
    curIndex: {
      type: Number
    },
    
  },
  /**
   * 组件的初始数据
   */
  data: {
    gitText: null
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 选中当前
    handleActive(ev){
      let myEventDetail = {
        index: this.data.curIndex
      }
      this.triggerEvent('changeActive', myEventDetail)
    },
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      const bookData = this.properties.topUp;
      let gitText = [];
      if (Number(bookData.give) > 0) {
        gitText.push(`多送${Number(bookData.give)}元`);
      }
      this.setData({
        gitText: gitText.join(""),
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
