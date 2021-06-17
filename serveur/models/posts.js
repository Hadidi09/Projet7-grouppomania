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
            type: DataTypes.BLOB("long"),
            
            } 
           
        

    })

    return Post;
}