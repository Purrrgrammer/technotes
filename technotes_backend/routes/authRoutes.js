const express = require("express");
const authControllers = require("../controllers/authControllers");
const router = express.Router();
const loginLimiter = require("../middleware/loginLimiter");
// router.route("/").post(loginLimiter, authControllers.login); //publicly access
router.route("/").post(authControllers.login); //publicly access
router.route("/refresh").get(authControllers.refresh);
router.route("/logout").post(authControllers.logout);

module.exports = router;
