const express = require("express");
const router = express.Router();

const commentControllers = require("../controllers/comments");
const auth = require("../middlewares/jsonwebtoken");

router.post("/comments", auth, commentControllers.commentaire);

module.exports = router;
