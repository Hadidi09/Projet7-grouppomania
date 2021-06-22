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
        commentableId: DataTypes.INTEGER,
        commentableType: DataTypes.STRING
    }, {sequelize, modelName: 'user'});

    User.associate = (models) =>
    {
        User.hasMany(models.Comment, {
            foreignKey: 'commentableId',
            constraints: false,
            scope: {
                commentableType: 'user'
            }

        });
        
    }

    User.associate = (models) =>
    {
        User.hasMany(models.Post, {
            foreignKey: 'UserId',
            constraints: false,
            scope: {
                commentableType: 'user'
            }
        });
    }
    
    return User;
}