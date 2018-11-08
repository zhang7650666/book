// 1、移出、清空书架接口没有
// 2、阅读页（fiction_read）
//     a、后台接受参数时没有接受当前章结  （前端不知道这本书该读那一章节了）
//     b、剩余积分字段、消耗积分字段没有
// 3、积分充值接口没有
// 4、我的书架接口
// 5、最近阅读接口
// 6、搜索页接口
// 7、邀请好友接口
// 8、签到接口
// 9、个人中心接口

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
 * 
             

             
             
 */         

// =========================问题============================
/**
 * 1、首页
 *      图片地址无效时候的默认图片 (图片名称banner.png)
 *      热门推荐  男生推荐 女生推荐 接口 （album_id）为什么没有了
 * 2、列表页
 *      为什么把（fiction_class_id 小说分类字段去掉了），这个字段跳到详情页的时候，请求同类小说的时候这个字段还要用到
 * 3、详情页
 *      详情页没有返回(fiction_class_id)但是下面的同类小说请求中却在用这个字段
 * 4、阅读页
 *      小说是否收费要在跳到阅读页之前的接口告知，(要不然到阅读页面，不知道是不是要收费)
 *      阅读本章消耗多少积分(字段)没有
 *      总积分(字段)没有
 *      上一章（last_catalog_id）字段怎么去掉了
 *      下一章（next_catalog_id）字段怎么去掉了
 */

 // ============================缺失接口===========================
 /**
  * 1、小说阅读页
  *     上一页 下一页 接口没有
  *     积分充值接口
  * 2、搜索页面
  *     相关接口都没有
  * 3、邀请页面
  *     邀请接口
  * 4、我的页面
  *     相关页面接口没有
  * 5、充值记录
  *     充值记录接口没有
  */


  // ===============================问题（11/8)======================
  /**
   * 1、阅读页
   *    返回是否自动购买字段（is_auto_pay）取消了吗 （这样的话前端不知道是否自动购买按钮有没有勾选
   * 
   * 
   */