const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'blog_posts',
    underscored: true,
    timestamps: false,
  });

  BlogPostTable.associate = (models) => {
    BlogPostTable.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
  }
  return BlogPostTable;
};

module.exports = BlogPostSchema;