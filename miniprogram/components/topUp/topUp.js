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
    isGive: false,
  },
  onload(options) {
    const bookData = this.properties.topUp;
    this.setData({
      isGive: bookData && (bookData.give || bookData.giveScore)
    })
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
  }
})
