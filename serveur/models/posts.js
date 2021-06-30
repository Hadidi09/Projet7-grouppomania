module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
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
    Post.hasMany(models.CommentPost, {
      foreignKey: "PostId",
      constraints: false,
      onDelete: "cascade",
      hooks: true,
      
    });
  };
  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: { allowNull: false },
      constraints: false,
      onDelete: "cascade",
      hooks: true,
      
    });
  };

  
 

  
  

  return Post;
};
