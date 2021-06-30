module.exports = (sequelize, DataTypes) => {
    const CommentPost = sequelize.define(
      "CommentPost",
      {
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { sequelize, modelName: "commentPost" }
    );
  
  
    
  
  CommentPost.associate = (models) => {
    CommentPost.belongsTo(models.Post, {
      foreignKey: { allowNull: false },
      onDelete: "cascade",
      hooks: true,
    });
  };
  
    return CommentPost;
  };