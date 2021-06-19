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
      
        const image = JSON.stringify(req.file)
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
   
        res.json({message: "image upload" + " " +image})
        } catch (error)
        {
            res.json({ status: 500, message: `Could not upload the file: ${req.file.originalname}. ${err}` })
        }
        

 }

   
