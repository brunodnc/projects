const sequelize = require('sequelize');

const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory',
  {
    postId: {
      type: DataTypes.INTEGER,
      },
    categoryId: {
      type: DataTypes.INTEGER,
      }
    },
  {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true
  });

  PostCategoryTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategoryTable,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'postId',
      through: PostCategoryTable,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
  }
  return PostCategoryTable;
};

module.exports = PostCategorySchema;