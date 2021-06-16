module.exports = (sequelize, DataTypes) => {
    const categoryModel = sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '名称'
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0,
            comment: '排序'
        }

    })
    categoryModel.associate = (models) => {
        categoryModel.hasMany(models.articleModel)
    }
    return categoryModel
}
