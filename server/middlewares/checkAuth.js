// 校验请求的接口是否需要管理员权限
module.exports = async(ctx, next) => {
    ctx.state.user = ctx.session.user; //全局变量(注意)
    // 判断用户访问的权限
    let user = ctx.session.user;
    if (!user) {
        //  /article, /article/add /article/del /artilce/edit
        let adminPathRegs = [/article\/(add|del|edit)/, /category\/(add|del|edit)/];
        console.log(ctx.path)
        let isAdminPath = adminPathRegs.find(reg => reg.test(ctx.path));
        if (isAdminPath) {
            await ctx.redirect('/login');
            return;
        }
    }
    await next();
};