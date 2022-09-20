const express = require("express");
const router = express.Router();
const authUtil = require("../middlewares/authUtil.js");
const adminController = require("../controllers/admin");

/*Purpose List */
router.get(
  "/purpose/list",
  authUtil.ensureAuthenticated,
  adminController.getpurposelist
);

/*Purpose ADD */
router.post(
  "/purpose/save",
  authUtil.ensureAuthenticated,
  adminController.addpurpose
);

/*Purpose UPDATE */
router.put(
  "/purpose/update",
  authUtil.ensureAuthenticated,
  adminController.updatepurpose
);

/*Purpose DELETE */
router.post(
  "/purpose/delete",
  authUtil.ensureAuthenticated,
  adminController.deletepurpose
);

module.exports = router;
