const db = require('../models/')



exports.profils = (req, res, next) =>
{
    const id = req.params.id
    db.User.findOne({
        where: {
            
            id: id
            
        }
    }).then(user => res.json({ status: 200, message: user }))
    .catch(error => res.json({status: 400, message: "bad request" + error}))
       
}