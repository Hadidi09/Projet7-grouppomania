const express = require("express")
const router = express.Router()
const profilControllers = require("../controllers/profils")
const auth = require('../middlewares/jsonwebtoken')
const upload = require('../middlewares/multer-config')
// console.log(upload);


router.post("/uploads" , upload.single('image'),  profilControllers.imagePost )
router.get("/profil/:id", auth,profilControllers.profils)


module.exports = router;  