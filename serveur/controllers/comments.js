const db = require('../models')


exports.commentaire = (req, res, next) =>
{
    const comment = req.body.comment
  return  db.Comment.create({
        text: comment,
        
    }, {fields: ['text']})
        .then((comment) => res.json({ status: 201, message: comment}))
        .catch(error => res.json({ status: 400, message: error}))
}