
// ======================分享==============================

/**
 * 1、首页
 *     "pages/index/index"
 * 
 * 2、搜索页
 *     "/pages/search/search"
 * 
 * 3、我的书架
 *      "/pages/store/store"
 * 
 * 4、小说列表
 *      album_id:对应 热门推荐  男生推荐  女生推荐的标识
 *      title：如果 album_id 对应的是热门推荐 title="热门推荐" 一次类推
 *      "/pages/list/list?typeid=${album_id}&title=${title}"
 * 
 * 5、小说详情
 *      fiction_id: 小说id
 *      fiction_class_id ： 小说分类
 *      '/pages/detail/detail?fiction_id=${fiction_id}&fiction_class_id=${fiction_class_id}'
 * 
 * 6、小说阅读
 *      从其他页面跳转到阅读页 不需要章节ID
 *          fiction_id: 小说id
 *          '/pages/reading/reading?fiction_id=${fiction_id}'
 *      从目录页面跳转到阅读页 需要章节ID
 *          chapterInfo包含一下信息(chapterInfo转成字符串)
 *           fiction_id	int	是	小说ID
 *           chapter_id	int	是	章节ID 不传按上次记录或者第一章    
 *           is_auto_pay	int	否	是否自动购买 传入设置自动购买不传按正常购买0不自动购买 1自动购买
 *           is_pay	int	否	是否购买本书 1购买0不够
 *            '/pages/reading/reading?chapterInfo=${chapterInfo}'
 * 
 * 7、目录页面
 *      fiction_id: 小说id
 *      '/pages/directory/directory?fiction_id=${fiction_id}'
 * 
 * 8、邀请页面
 *      objInfo = 
            {
                icon:'/images/my5.png',
                url:"/pages/invitation/invitation",
                flag:'invite',
                "alias": "邀请好友",
                "score": 10,
                "status": 0
            },
        
 *      "pages/invitation/invitation?objInfo=${objInfo}"
 * 
 * 9、积分充值
 *      'pages/recharge/recharge'
 * 10、积分充值记录
 *      'pages/record/record'
 * 11、联系客服
 *      'pages/service/service'
 * 
 * 
 * 
 * 
 * /            

             
             

  // ===============================问题（11/14)======================
  /**
   * fiction_read 阅读：
   *    next_chapter_id：下一章节id　当前章节如是最后一章，此字段的返回值？目前一直是2,不确认代表的意思
   *    ＋　is_collection：是否加入书架，用于显示隐藏　加入书架功能
   * 
   * fiction_details　小说详情
   *    ＋　controller_id：用于移除书架时用
   */