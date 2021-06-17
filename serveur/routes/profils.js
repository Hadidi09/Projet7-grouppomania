const express = require("express")
const router = express.Router()

const profilControllers = require("../controllers/profils")
const auth = require('../middlewares/jsonwebtoken')
const multer = require('../middlewares/multer-config')

router.post("/images" , multer,profilControllers.imagePost)
router.get("/profil/:id", auth,profilControllers.profils)


module.exports = router;