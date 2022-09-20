const express = require("express");
const router = express.Router();
const authUtil = require("../middlewares/authUtil.js");
const userController = require("../controllers/users");

/** Login api */
router.post("/login", userController.signIn);
router.get("/demo", userController.demo);
module.exports = router;