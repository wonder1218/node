const Sequelize = require('sequelize');
const dbConfig = require('../config/db')
const fs = require('fs')
const path = require('path')
let { database, username, password, options } = dbConfig
let sequelize = new Sequelize(database, username, password, options)

let db = {}

// 读取各个模块
fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file)) //重要重要重要重要重要重要
        db[model.name + 'Model'] = model
    })

// 执行相关联的模块
Object.keys(db).forEach(name => {
    db[name].associate && db[name].associate(db) // 执行每个模型表的关联回调函数
})

db.sequelize = sequelize

sequelize.sync() // 同步数据库

module.exports = db