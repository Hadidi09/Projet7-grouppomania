module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
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
    { sequelize, modelName: "comment" }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: { allowNull: false },
      onDelete: "cascade",
      hooks: true,
    });
  };

  

  return Comment;
};
