module.exports = (sequelize, DataTypes) =>
{

    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        
    }, {});

    User.associate = (models) =>
    {
        User.hasMany(models.Comment, {
            foreignKey: "UserId"
        })
   }
    

    return User;
}