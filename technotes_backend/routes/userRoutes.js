const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userControllers");
const verifyToken = require("../middleware/verifyToken");
router.use(verifyToken);
router
  .route("/")
  .get(usersController.getAllUser)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
router.route("/:userId").get(usersController.getUserId);

// .post().patch().delete()

module.exports = router;
