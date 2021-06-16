const Router = require('koa-router')
const router = new Router()
const articleController = require('../controller/article')
const categoryController = require('../controller/category')
const loginController = require('../controller/login')
const adController = require('../controller/ad');
// 上传
const multer = require('koa-multer');
var storage = multer.diskStorage({
    destination: 'public/upload/',
    filename: function(req, file, cb) { /*图片上传完成重命名*/
        var fileFormat = (file.originalname).split("."); /*获取后缀名  分割数组*/
        cb(null, file.originalname + "." + fileFormat[fileFormat.length - 1]);
    }
})
var upload = multer({ storage: storage });

/* 首页 */

router.get('/', loginController.Index);

// 登录的页面
router.get('/login', loginController.login);
// 登录操作
router.post('/doLogin', loginController.doLogin);
// 退出登录
router.get('/logout', loginController.logout);
// 验证码接口
router.get('/code', loginController.code);


// 添加栏目
router.get('/category/add', categoryController.add);
// 插入栏目数据
router.post('/category/doadd', categoryController.doadd);
// 栏目列表
router.get('/category/', categoryController.list);
// 修改栏目页面
router.get('/category/edit/:id', categoryController.edit);
// 修改栏目数据
router.post('/category/doedit', categoryController.doedit);
// 删除栏目
router.get('/category/del/:id', categoryController.del);



// 发布文章
router.get('/article/add', articleController.add);
// 插入文章数据
router.post('/article/doadd', upload.single('imgurl'), articleController.doadd);
// 文章列表
router.get('/article', articleController.list)
    // 删除文章
router.get('/article/del/:id', articleController.del);
// 编辑文章
router.get('/article/edit/:id', articleController.edit);
// 修改文章的文本
router.post('/article/doedit', upload.single('imgurl'), articleController.doedit)

// 添加广告
router.get('/ad/add', adController.add);
// 插入广告数据
router.post('/ad/doadd', upload.single('imgurl'), adController.doadd);
// 广告列表
router.get('/ad', adController.list)
    // 删除广告
router.get('/ad/del/:id', adController.del);
// 编辑广告
router.get('/ad/edit/:id', adController.edit);
// 修改广告的文本
router.post('/ad/doedit', upload.single('imgurl'), adController.doedit)
module.exports = router