const CommonModel = require("../models/common");

//#region CREATE QUOTE
exports.createUniqueQuote = async (req, res, next) => {
  try {
 
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "Service type is required." });
      return;
    }
    let getNextVal = await CommonModel.getNextVal("quote_number");
    let addData = await CommonModel.insertRecords(
      {
        quote_number: "Q" + getNextVal.toString(),
        service_type: postData.title,
      },
      "quote_master"
    );

    if (addData) {
      res.status(201).json({
        success: true,
        data: "Q" + getNextVal.toString(),
        message: "Quote created successfully.",
      });
    } else {
      res.status(201).json({
        success: false,
        message: "There is some problem, please try again later.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(201).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};
//#endregion
