module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    { sequelize, modelName: "post" }
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: { allowNull: false },
      onDelete: "cascade",
      hooks: true,
    });
  };

  return Post;
};
