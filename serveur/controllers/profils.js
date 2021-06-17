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



    exports.imagePost =  (req, res, next) =>  {
      
       
        console.log(req.files);
        console.log(req.body);
   
        res.json({message: "image upload"})

 }

   
