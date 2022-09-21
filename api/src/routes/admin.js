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

/* Condition List */
router.get(
  "/condition/list",
  authUtil.ensureAuthenticated,
  adminController.getConditionlist
);

/* Condition update */
router.put(
  "/condition/update",
  authUtil.ensureAuthenticated,
  adminController.updateConditionList
);

/* Building Pricing  List*/
router.get(
  "/build-pricing/list",
  authUtil.ensureAuthenticated,
  adminController.getbuildingpricinglist
);

/* Building Pricing Add */
router.post(
  "/build-pricing/add",
  authUtil.ensureAuthenticated,
  adminController.addbuildingpricing
);

/* Building Pricing Update */
router.put(
  "/build-pricing/update",
  authUtil.ensureAuthenticated,
  adminController.updatebuildingpricing
);

/* Building Pricing Delete */

router.post(
  "/build-pricing/delete",
  authUtil.ensureAuthenticated,
  adminController.deletebuildingpricing
);

/* Land Pricing  List*/
router.get(
  "/land-pricing/list",
  authUtil.ensureAuthenticated,
  adminController.getlandpricinglist
);

/* Land Pricing Add */
router.post(
  "/land-pricing/add",
  authUtil.ensureAuthenticated,
  adminController.addlandpricing
);

/* Land Pricing Update */
router.put(
  "/land-pricing/update",
  authUtil.ensureAuthenticated,
  adminController.updatelandpricing
);

/* Land Pricing Delete */

router.post(
  "/land-pricing/delete",
  authUtil.ensureAuthenticated,
  adminController.deletelandpricing
);

module.exports = router;
