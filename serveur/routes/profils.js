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
router.get("/comments/:id", auth, profilControllers.OneComment)
router.put("/comments/:id/edit", auth, profilControllers.UpdateComment)
router.get("/profil/:id", auth, profilControllers.profils);
router.get("/", auth, profilControllers.AllImagesPost);
router.get("/allusers", auth, profilControllers.AllUsers)
router.delete("/profil/:id", auth, profilControllers.deleteUser);

module.exports = router;
