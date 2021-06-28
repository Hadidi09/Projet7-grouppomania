const express = require("express");
const router = express.Router();

const profilControllers = require("../controllers/profils");

const auth = require("../middlewares/jsonwebtoken");
const upload = require("../middlewares/multer-config");


router.post(
  "/uploads",
  auth,
  upload.single("image"),
  profilControllers.imagePost
);
router.post("/comments", auth, profilControllers.commentaire);
router.get("/profil/:id", auth, profilControllers.profils);
router.get("/", auth, profilControllers.AllImagesPost);
router.delete("/profil/:id", auth, profilControllers.deleteUser);

module.exports = router;
