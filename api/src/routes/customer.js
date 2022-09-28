const express = require("express");
const router = express.Router();
const authUtil = require("../middlewares/authUtil.js");
const customerController = require("../controllers/customer");

/*New Quote ADD */
router.post("/new-quote", customerController.createUniqueQuote);

/* Get Personal Info */
router.get("/personal-info", customerController.getPersonalInfo);

/* Save Personal Info */
router.post("/personal-info", customerController.savePersonalInfo);

/* Update Personal Info */
router.put("/personal-info", customerController.updatePersonalInfo);

/* Get Company Info */
router.get("/company-info", customerController.getCompanyInfo);

/* Save Company Info */
router.post("/company-info", customerController.saveCompanyInfo);

/* Update Company Info */
router.put("/company-info", customerController.updateCompanyInfo);

/* Get Purpose Info */
router.get("/purpose-eve-info", customerController.getPurposeInfo);

/* Save Purpose Info */
router.post("/purpose-eve-info", customerController.savePurposeInfo);

/* Update Purpose Info */
router.put("/purpose-eve-info", customerController.updatePurposeInfo);

/* Get Purpose */
router.get("/purpose-list", customerController.getpurposelist);

/* Get Country */
router.get("/country-list", customerController.getcountrylist);

/* Get Region */
router.get("/region-list", customerController.getregionlist);

/* Get City */
router.get("/city-list", customerController.getcitylist);

/* Get District */
router.get("/district-list", customerController.getdistrictlist);

/* GET Property Info */
router.get("/property-list/:quoteid", customerController.getPropertyInfo);

/* SAVE Property Info */
router.post("/property-info", customerController.savePropertyInfo);

/* Update Property Info */
router.put("/property-info", customerController.updatePropertyInfo);

/* Get Price Amount */

router.get("/quote-price/:quoteid", customerController.getpriceCalculation);

/* Payment Init */

router.post("/quote-payment", customerController.savepaymentinit);

/* Payment Update */

router.put("/quote-payment-status", customerController.updatepaystatus);

module.exports = router;
