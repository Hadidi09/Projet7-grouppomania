module.exports = (sequelize, DataTypes) =>
{

    const Comment = sequelize.define("Comment", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
       },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
    }, {});

    Comment.associate = (models) =>
    {
        Comment.belongsTo(models.User, {
            through: 'user_comments',
            foreignKey: "UserId",
            onDelete: 'cascade'
       })
   }
    
   

    return Comment;
}