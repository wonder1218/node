const { articleModel, tagModel, categoryModel, commentModel, replyModel } = require('../model')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

class articleController {
    // 添加文章
    static async add(ctx) {
        let data = await categoryModel.findAll({})
        await ctx.render('admin/articleAdd', { data: data })
    }

    static async doadd(ctx) {
            // post   ctx.request.body
            let params = ctx.req.body // 注意注意注意注意注意注意注意 不是  ctx.request.body
                // 把用户上传的图片路径写到 req.body 里
                //console.log(ctx.req.file);  // 注意注意注意注意注意注意
            params.imgurl = ctx.req.file.filename;

            await articleModel.create(params)
            ctx.redirect('/article')

        }
        // 文章列表+分页
    static async list(ctx) {
            let { currentPage, keyword } = ctx.query
            currentPage = currentPage === undefined ? 1 : Number(currentPage) // 当前页码
            let pageSize = 3 // 每页条数
            let where = {},
                include = [];

            // 没有指定返回字段的情况下返回全部字段
            if (keyword) {
                where = {
                    title: {
                        [Op.like]: '%' + keyword + '%'
                    }
                }
            }

            include = [
                { model: categoryModel, attributes: ['name'] },
            ]
            let allResponse = await articleModel.findAll({ where, include })
            let total = allResponse.length // 全部条数
            let totalPage = Math.ceil(total / pageSize) // 页数
            let prev = currentPage - 1 <= 1 ? 1 : currentPage - 1;
            let next = currentPage + 1 >= totalPage ? totalPage : currentPage + 1;
            let response = await articleModel.findAll({
                    offset: (currentPage - 1) * pageSize,
                    limit: pageSize,
                    where,
                    include,
                    order: [
                        ['id', 'DESC']
                    ]
                })
                // console.log(response);
            await ctx.render('admin/articleList', { data: response, totalPage, currentPage, next, prev, keyword })

        }
        // 删除文章
    static async del(ctx) {
            let id = ctx.params.id;
            await articleModel.destroy({
                where: { id },
                // cascade: true,
            })
            ctx.redirect('/article', { id: id })
        }
        // 更新文章
    static async edit(ctx) {
        let id = ctx.params.id;
        let data = await categoryModel.findAll({})
        let dataone = await articleModel.findOne({ where: { id } })
        await ctx.render('admin/articleEdit', { dataone: dataone, data: data })

    }

    static async doedit(ctx) {
        let id = ctx.query.id;
        let params = ctx.req.body
        if (ctx.req.file) {
            params.imgurl = ctx.req.file.filename;
        }

        let {...rest } = ctx.request.body
        let response = await articleModel.update({...rest }, { where: { id } })
        ctx.redirect('/article');


    }



}

module.exports = articleController