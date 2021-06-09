const express = require('express')
const router = express.Router()

const commentControllers = require("../controllers/comments")

router.post("/comments", commentControllers.commentaire)


module.exports = router;