const db = require('../models/')
const fs = require('fs')




exports.profils = async (req, res, next) =>
{
    const id = req.params.id
   await db.User.findOne({
        where: {
            
            id: id
            
        }
    }).then(user => res.json({ status: 200, message: user }))
    .catch(error => res.json({status: 400, message: "bad request" + error}))
       
}



exports.imagePost = async (req, res, next) =>  {
      
        const image = req.file
     await    console.log(image)
        console.log(req.file);
        try
        {
            if (req.file == undefined)
                    {
                        return res.json({ status: 400, message:"upload plaese file correctly"})
                    }
                    console.log(req.file);
            console.log(req.body);
            db.Post.create({
                type: image.mimetype,
                name: image.originalname,
                data:  `${req.protocol}://${req.get("host")}/uploads/${
                    image.filename
                    }`,
                description: req.body.description,
                UserId: req.body.UserId
               
                  
            },{})
   
        res.json({ status: 200, image })
        } catch (error)
        {
            res.json({ status: 500, message: `Could not upload the file: ${req.file.originalname}. ${err}` })
        }
}
 


exports.AllImagesPost = async (req, res, next) =>
{
    
    db.Post.findAll({
        attributes: ["type", "name", "data", "description"]
    }).then(listImages => res.json({ status: 200, message: listImages}))
      .catch(error => res.json({ status: 400, message: error}))
}

   
