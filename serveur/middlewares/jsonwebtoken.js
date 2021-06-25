const jwt = require("jsonwebtoken");
//middlware d'authentification avec l'utilisation du package jsonwebtoken
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[0];
    const decodedToken = jwt.verify(token, `${process.env.CLE_SECRETE}`);
    const userId = decodedToken.id;

    if (req.body.UserId && req.body.UserId !== userId) {
      console.log(token, decodedToken, userId);
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.json({ status: 401, error: new Error("Invalid request!") });
  }
};
