module.exports = (sequelize, DataTypes) => {
    const adModel = sequelize.define("ad", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "广告标题"
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: "广告内容"
        },
        readCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "浏览量"
        },
        imgurl: {
            type: DataTypes.STRING,
            comment: "广告封面"
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '排序'
        }
    });
    // 关联
    adModel.associate = models => {
        adModel.belongsTo(models.categoryModel);
    };
    return adModel;
};