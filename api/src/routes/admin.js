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

//-------------------------------------------

/* Country List */

router.get(
  "/country/list",
  authUtil.ensureAuthenticated,
  adminController.getcountrylist
);

/* Country Add */
router.post(
  "/country/add",
  authUtil.ensureAuthenticated,
  adminController.addcountry
);

/* Country Update */
router.put(
  "/country/update",
  authUtil.ensureAuthenticated,
  adminController.updatecountry
);

/* Country Delete */

router.post(
  "/country/delete",
  authUtil.ensureAuthenticated,
  adminController.deletecountry
);

//----------------------------------------------------------------

/* Region List */

router.get(
  "/region/list",
  authUtil.ensureAuthenticated,
  adminController.getregionlist
);

/* Region Add */
router.post(
  "/region/add",
  authUtil.ensureAuthenticated,
  adminController.addregion
);

/* Region Update */
router.put(
  "/region/update",
  authUtil.ensureAuthenticated,
  adminController.updateregion
);

/* Region Delete */

router.post(
  "/region/delete",
  authUtil.ensureAuthenticated,
  adminController.deleteregion
);

//----------------------------------------------------------------

/* City List */

router.get(
  "/city/list",
  authUtil.ensureAuthenticated,
  adminController.getcitylist
);

/* City Add */
router.post(
  "/city/add",
  authUtil.ensureAuthenticated,
  adminController.addnewcity
);

/* City Update */
router.put(
  "/city/update",
  authUtil.ensureAuthenticated,
  adminController.updatecity
);

/* City Delete */

router.post(
  "/city/delete",
  authUtil.ensureAuthenticated,
  adminController.deletecity
);

//----------------------------------------------------------------

/* District List */

router.get(
  "/district/list",
  authUtil.ensureAuthenticated,
  adminController.getdistrictlist
);

/* District Add */
router.post(
  "/district/add",
  authUtil.ensureAuthenticated,
  adminController.addnewdistrict
);

/* District Update */
router.put(
  "/district/update",
  authUtil.ensureAuthenticated,
  adminController.updatedistrict
);

/* District Delete */

router.post(
  "/district/delete",
  authUtil.ensureAuthenticated,
  adminController.deletedistrict
);

/* GET Email Template List */

router.get(
  "/email-template",
  authUtil.ensureAuthenticated,
  adminController.getemailtemplatelist
);

/* UPDATE Email Template */
router.put(
  "/email-template",
  authUtil.ensureAuthenticated,
  adminController.updateemailtemplate
);

/* GET MESSAGE ON SCREEN */

router.get(
  "/msg-on-screen",
  authUtil.ensureAuthenticated,
  adminController.getmsgonscreen
);

/* UPDATE MESSAGE ON SCREEN */

router.put(
  "/msg-on-screen",
  authUtil.ensureAuthenticated,
  adminController.updatemsgonscreen
);
router.get(
  "/all-quotes",
  authUtil.ensureAuthenticated,
  adminController.getallquotes
);

router.post(
  "/upload-file",
  authUtil.ensureAuthenticated,
  adminController.fileupload
);

router.post(
  "/update-valuation-url",
  authUtil.ensureAuthenticated,
  adminController.updateFileToQuote
);
module.exports = router;
