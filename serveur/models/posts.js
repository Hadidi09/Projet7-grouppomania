module.exports = (sequelize, DataTypes) =>
{
    const Post = sequelize.define("Post", {
        type: {
            type: DataTypes.STRING,
            
        },
        name: {
            type: DataTypes.STRING,
            
            } ,
        data: {
            type: DataTypes.STRING,
            
            } ,
        description: {
            type: DataTypes.STRING,
        },
        
    },{sequelize, modelName: 'post'})

   Post.associate = (models) =>
    {
       Post.belongsTo(models.User,{
        foreignKey: 'UserId',
        constraints: false,
       })
    }

    return Post;
}

// db.post.belongsTo(db.user, {
//     as: 'username', foreignKey: 'userId})
//  puis dans mon controller include: 'username' et dans vue.js 
//  en écrivant {{ post.username }},