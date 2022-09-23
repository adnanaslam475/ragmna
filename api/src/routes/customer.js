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

module.exports = router;
