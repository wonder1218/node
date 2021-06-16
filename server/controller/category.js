const { categoryModel, sequelize } = require('../model')

class categoryController {
    // 分类列表
    static async list(ctx) {
        let data = await categoryModel.findAll({});
        // console.log(data);
        await ctx.render('admin/categoryList', { data: data })
    }

    //添加
    static async add(ctx) {
        await ctx.render('admin/categoryAdd')
    }
    static async doadd(ctx) {
            const { name, order } = ctx.request.body
                // console.log(name);
            await categoryModel.create({
                name,
                order
            })
            ctx.redirect('/category')
        }
        // 修改
    static async edit(ctx) {
        let id = ctx.params.id;
        let dataone = await categoryModel.findOne({ where: { id } })
        await ctx.render('admin/categoryEdit', { dataone: dataone })
    }
    static async doedit(ctx) {
        const { name, order } = ctx.request.body
        const id = ctx.request.body.id
        await categoryModel.update({ name, order }, { where: { id } })
        ctx.redirect('/category')
    }

    static async del(ctx) {
        const id = ctx.params.id
        await categoryModel.destroy({ where: { id } })
        ctx.redirect('/category')
    }

}

module.exports = categoryController