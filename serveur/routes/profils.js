const express = require("express")
const router = express.Router()

const profilControllers = require("../controllers/profils")
const auth = require('../middlewares/jsonwebtoken')

router.get("/profil/:id", auth,profilControllers.profils)


module.exports = router;