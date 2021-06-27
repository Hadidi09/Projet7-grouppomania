module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
        
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "user" }
  );

  User.associate = (models) => {
    User.hasMany(models.Comment, {
      foreignKey: "UserId",
      constraints: false,
      onDelete: "cascade",
    });
  };

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "UserId",
      constraints: false,
      onDelete: "cascade",
    });
  };

  return User;
};
