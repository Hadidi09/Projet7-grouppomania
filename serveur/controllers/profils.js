const db = require('../models/')



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

