module.exports = (sequelize, DataTypes) => {
  const articleModel = sequelize.define("article", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "标题"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "内容"
    },
    readCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: "浏览量"
    },
    imgurl:{
      type: DataTypes.STRING,
      comment: "封面图"
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0,
      comment: '排序'
    }
  });
  // 关联
  articleModel.associate = models => {
    articleModel.belongsTo(models.categoryModel);
  };
  return articleModel;
};
