const express = require("express");
const router = express.Router();
const authUtil = require("../middlewares/authUtil.js");
const customerController = require("../controllers/customer");

/*Purpose ADD */
router.post("/new-quote", customerController.createUniqueQuote);
module.exports = router;