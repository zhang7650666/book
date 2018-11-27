
// ======================分享==============================

/**
 * 1、书城　"pages/index/index"
 * 2、搜索页　 "/pages/search/search"　 //不支持分享
 * 3、书架　 "/pages/store/store"　　//不支持分享
 * 4、小说列表 "/pages/list/list"　//带参，以当前用户列表分类为参
 * 5、小说详情　 '/pages/detail/detail"　 //带参，以当前用户打开小说参数为参
 * 6、小说阅读 '/pages/reading/reading"　 //带参，以当前用户打开小说参数为参
 * 7、章节目录　 '/pages/directory/directory"　 //带参，以当前用户打开小说参数为参
 * 8、邀请页面　 "pages/invitation/invitation" 
 * 9、积分充值　 'pages/recharge/recharge'　
 * 10、积分记录　 'pages/record/record' //不支持分享
 * 11、联系客服　 'pages/service/service'　
 * 12、个人中心 　‘不支持分享’
 * 13、授权 由于小程序的发动，除正式排版以外的其它版本，均不可静默登陆，需要授权，界面UI待优化

 * 
 * /            

             
             

  // ===============================问题（11/14)======================
  /**
   * fiction_read 阅读：
   *    next_chapter_id：下一章节id　当前章节如是最后一章，此字段的返回值？
   *    ＋　is_collection：是否加入书架，用于显示隐藏　加入书架功能
   * 
   * fiction_details　小说详情
   *    ＋　controller_id：用于移除书架时用
   * 
   * 支付成功后，我的界面　积分并未变更，　积分列表，并未显示充值的记录
   * 
   * 1、邀请好友界面　，邀请次数可配
   * 
   * 
   * 加入书架－〉　移除　－〉　加入 -> 移除：此时拿不到书架Id所以报错，需要后端返回一个书架id给前端更新
   */