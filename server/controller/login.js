const { userModel } = require('../model')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const svgCaptcha = require('svg-captcha'); // 安装并引入验证码

class loginController {
    // 分类列表
    static async Index(ctx) {
        // 判断用户 有没有登录
        if (!ctx.session.user) {
            await ctx.redirect('/login');
        } else {
            await ctx.render('admin/index')
        }

    }

    // 登录页面
    static async login(ctx) {
        // 响应模版
        await ctx.render('admin/login');
    }

    // 登录操作
    static async doLogin(ctx) {
        // 引入 md5 模块
        var md5 = require('md5');
        console.log(ctx.request.body.code); //表单中的验证码
        console.log(ctx.session.code); // session
        // 判断验证码
        if (ctx.request.body.code.toLocaleLowerCase() != ctx.session.code.toLocaleLowerCase()) {
            console.log('验证码不正确');
            await ctx.redirect('/login');
            return;
        }
        // 获取用户名和密码 并 md5 处理密码
        var username = ctx.request.body.username.trim();
        var password = md5(ctx.request.body.password.trim()); // 32位md5加密
        //console.log(username,password);
        // 判断用户名和密码
        let dataone = await userModel.findOne({ username: username, password: password });
        if (!dataone) {
            console.log('用户名不正确或密码不正确');
            await ctx.redirect('/login');
        } else {
            // 登录成功 把用户的信息存到session 里(重要)

            ctx.session.user = dataone; // 重要重要重要
            //console.log(ctx.session.user)
            await ctx.redirect('/');
        }
    }

    // 退出登录
    static async logout(ctx) {
        // 清空登录信息
        ctx.session.user = null;
        // 跳转到登录的页面
        await ctx.redirect('/login');
    }

    // 验证码
    static async code(ctx) {
        var captcha = svgCaptcha.create({
            size: 4, //4位
            fontSize: 50,
            width: 100,
            height: 25,
            background: "#ffffff"
        });
        // 将验证码存在 session 中(重要)
        ctx.session.code = captcha.text;
        //设置响应头
        ctx.response.type = 'image/svg+xml'; // text/html
        ctx.body = captcha.data;

    }

}
module.exports = loginController