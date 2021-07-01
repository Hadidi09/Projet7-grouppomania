const db = require("../models/");


//trouver un utilisateur
exports.profils = async (req, res, next) => {
  const id = req.params.id;
  await db.User.findOne({
    where: {
      id: id,
    },
  })
    .then((user) => res.json({ status: 200, message: user }))
    .catch((error) =>
      res.json({ status: 400, message: "bad request" + error })
    );
};
// stocker une image dans la base de données
exports.imagePost = async (req, res, next) => {
  const image = req.file;
  await console.log(image);
  console.log(req.file);
  try {
    if (req.file == undefined) {
      return res.json({ status: 400, message: "Veuillez charger une image correctement" });
    }
    console.log(req.file);
    console.log(req.body);
    db.Post.create(
      {
        userName: req.body.userName,
        type: image.mimetype,
        name: image.originalname,
        data: `${req.protocol}://${req.get("host")}/uploads/${image.filename}`,
        description: req.body.description,
        UserId: req.body.UserId,
      },
      {}
    );

    res.json({ status: 200, image });
  } catch (error) {
    res.json({
      status: 500,
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};
// recupérer toutes les images dans la base de données
exports.AllImagesPost = async (req, res, next) => {
  const postUser = await db.Post.findAll({
    include: db.User,
  });

  
  res.json({ status: 200, message: postUser });
};
// supprimer un profil user
exports.deleteUser = async (req, res, next) => {
  try {
    const userDestroy = req.params.id;
    await db.User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ status: 200, userDestroy });
  } catch (error) {
    res.json({ status: 400, message: "impossible to destroy user" });
  }
};

// supprimer un post 

exports.deletePost = async (req, res, next) =>
{
  try
  {
    const id = req.params.id

    await db.Post.destroy({
      where: {
        
           id: id 
        
      }
    })
    res.json({ status: 200, message: id})
  } catch (error)
  {
    res.json({ status: 400, message: "impossible to destroy Post !!" });
  }
}

//Ajouter un message sur le mur de la page
exports.commentaire = (req, res, next) => {
  const comment = req.body.comment;
  return db.Comment.create(
    {
      text: comment,
    },
    { fields: ["text"] }
  )
    .then((comment) => res.json({ status: 201, message: comment }))
    .catch((error) => res.json({ status: 400, message: error }));
};

// recupérer un commentaire 

exports.OneComment = async (req, res, next) =>
{
  const commentUser = await db.Comment.findOne({
    include: db.User
  })
  res.json({ status: 200, message: commentUser})
}
// modifier un commentaire

exports.UpdateComment = async (req, res, next) =>
{
  const id = req.body.id
  await db.Comment.update(
    {
      username: req.body.username,
      message: req.body.message,
      id: req.params.id
    }, {
       where: {id : id}
    }
      
  
   
  ).then(result => res.json({ status: 200, message: result }))
  .catch(err => res.json({status: 400, message: err}))
  
}
// récupérer tous users 

exports.AllUsers = async (req, res, next) =>
{
  const users = await db.User.findAll({
    
  })

  res.json({status: 200, message: users})
}

// Modifier un post 

exports.findPost = async (req, res, next) =>
{
  const id = req.params.id
  const postUser = await db.Post.findByPk(
    id);

  
  res.json({ status: 200, message: postUser });
}
//
exports.UpdatePost = async (req, res, next) =>
{
  const postUser = await db.Post.update({
    include: db.User,
  });

  
  res.json({ status: 200, message: postUser });
}


// Commentaire post

exports.PostComment = async (req, res, next) =>
{
  return await db.CommentPost.create(
    {
      userName: req.body.userName,
      message: req.body.message,
      PostId: req.body.PostId
     
    },
    {}
  )
  .then((comment) => res.json({ status: 201, message: comment }))
  .catch((error) => res.json({ status: 400, message: error }));
}

// récupérer tous les commentaires

exports.AllCommentsPost = async (req, res, next) =>
{
  const id = req.params.id
  const allComment = await db.CommentPost.findAll({
          where :{PostId : id}
  })
  res.json({status: 200, message:allComment})
}



