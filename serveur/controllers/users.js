const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/");
const { User } = require("../models");

exports.signup = (req, res, next) =>
{
 
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        role: req.body.role
      })

        .then(() => res.json({ status: 201, message: "Utilisateur crée !!" }))
        .catch((error) => res.json({ status: 400, error: error }));
    })

    .catch((error) => res.json({ status: 500, error: error }));
};

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((resUser) => {
      console.log(resUser);
      if (!resUser) {
        return res.json({ status: 401, error: "Email non valide !!" });
      }

      bcrypt
        .compare(req.body.password, resUser.password)
        .then(async (valid) => {
          if (!valid) {
            return res.jon({ status: 401, error: "Mot de passe incorrect !!" });
          }
          await res.json({
            status: 200,
            id: resUser.id,
            role: resUser.role,
           
            token: jwt.sign({ id: resUser.id, role: resUser.role}, `${process.env.CLE_SECRETE}`, {
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => res.json({ status: 401, message: error }));
    })
    .catch((error) => res.json({ status: 401, error: error }));
};
