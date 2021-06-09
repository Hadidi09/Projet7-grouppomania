const express = require("express")
const router = express.Router()

const profilControllers = require("../controllers/profils")

router.get("/profil/:id", profilControllers.profils)


module.exports = router;