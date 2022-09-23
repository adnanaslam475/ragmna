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

//#region Quote Personal Information

exports.getPersonalInfo = async (req, res, next) => {
  try {
    if (!postData.quoteno) {
      res
        .status(201)
        .json({ success: false, message: "Quote Number is required." });
      return;
    }
    const whenCondtion = [];
    whenCondtion.push({ field: "q.quote_number", value: postData.quoteno });

    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "quote_personal_info qi",
      select: "qi.*",
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "quote_master q",
          joinCondition: "q.id = qi.fk_quote_id",
        },
      ],
    });

    res.status(201).json({
      success: true,
      items: result,
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};

exports.savePersonalInfo = async (req, res, next) => {
  try {
    const postData = req.body;

    if (!postData.quoteno) {
      res
        .status(201)
        .json({ success: false, message: "Quote Number is required." });
      return;
    }
    if (!postData.fname) {
      res
        .status(201)
        .json({ success: false, message: "First Name is required." });
      return;
    }
    if (!postData.email) {
      res.status(201).json({ success: false, message: "Email is required." });
      return;
    }
    if (!postData.phone) {
      res.status(201).json({ success: false, message: "Phone is required." });
      return;
    }
    const whenCondtion = [];
    whenCondtion.push({ field: "quote_number", value: postData.quoteno });

    let getQuoteId = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "quote_master",
      select: "id",
    });
    console.log(getQuoteId);

    let addData = await CommonModel.insertRecords(
      {
        fk_quote_id: getQuoteId[0]["id"],
        fname: postData.fname,
        lname: postData.lname,
        email: postData.email,
        contact_no: postData.phone,
      },
      "quote_personal_info"
    );

    if (addData) {
      res.status(201).json({
        success: true,
        message: "Data saved successfully.",
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

exports.updatePersonalInfo = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.fname) {
      res
        .status(201)
        .json({ success: false, message: "First Name is required." });
      return;
    }
    if (!postData.email) {
      res.status(201).json({ success: false, message: "Email is required." });
      return;
    }
    if (!postData.phone) {
      res.status(201).json({ success: false, message: "Phone is required." });
      return;
    }

    let updateData = {};
    if (postData.fname) {
      updateData.fname = postData.fname;
    }
    if (postData.lname) {
      updateData.lname = postData.lname;
    }
    if (postData.email) {
      updateData.email = postData.email;
    }
    if (postData.phone) {
      updateData.contact_no = postData.phone;
    }

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "quote_personal_info",
        whereCon: [{ field: "id", value: postData.id }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "Personal Info updated successfully.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Record are not available to update.",
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

//#region Quote Company Information
exports.getCompanyInfo = async (req, res, next) => {
  try {
    if (!postData.quoteno) {
      res
        .status(201)
        .json({ success: false, message: "Quote Number is required." });
      return;
    }
    const whenCondtion = [];
    whenCondtion.push({ field: "q.quote_number", value: postData.quoteno });

    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "quote_company_info qi",
      select: "qi.*",
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "quote_master q",
          joinCondition: "q.id = qi.fk_quote_id",
        },
      ],
    });

    res.status(201).json({
      success: true,
      items: result,
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};

exports.saveCompanyInfo = async (req, res, next) => {
  try {
    const postData = req.body;

    if (!postData.quoteno) {
      res
        .status(201)
        .json({ success: false, message: "Quote Number is required." });
      return;
    }
    if (!postData.companyname) {
      res
        .status(201)
        .json({ success: false, message: "Company Name is required." });
      return;
    }

    const whenCondtion = [];
    whenCondtion.push({ field: "quote_number", value: postData.quoteno });

    let getQuoteId = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "quote_master",
      select: "id",
    });

    let addData = await CommonModel.insertRecords(
      {
        fk_quote_id: getQuoteId[0]["id"],
        company_name: postData.companyname,
        company_address: postData.companyaddress,
        company_phone: postData.companyphone,
      },
      "quote_company_info"
    );

    if (addData) {
      res.status(201).json({
        success: true,
        message: "Data saved successfully.",
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

exports.updateCompanyInfo = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.companyname) {
      res
        .status(201)
        .json({ success: false, message: "Company Name is required." });
      return;
    }

    let updateData = {};
    if (postData.companyname) {
      updateData.company_name = postData.companyname;
    }
    if (postData.companyaddress) {
      updateData.company_address = postData.companyaddress;
    }
    if (postData.companyphone) {
      updateData.companyphone = postData.company_phone;
    }

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "quote_company_info",
        whereCon: [{ field: "id", value: postData.id }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "Company Info updated successfully.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Record are not available to update.",
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

//#region Quote Purpose Evalution
exports.getPurposeInfo = async (req, res, next) => {
  try {
    if (!postData.quoteno) {
      res
        .status(201)
        .json({ success: false, message: "Quote Number is required." });
      return;
    }
    const whenCondtion = [];
    whenCondtion.push({ field: "q.quote_number", value: postData.quoteno });

    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "quote_eve_purpose qi",
      select: "qi.*,pm.title as purposename, pm.title_ar as purposename_ar",
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "quote_master q",
          joinCondition: "q.id = qi.fk_quote_id",
        },
        {
          joinType: "INNER JOIN",
          joinWith: "purpose_master pm",
          joinCondition: "pm.id = qi.fk_purpose_id",
        },
      ],
    });

    res.status(201).json({
      success: true,
      items: result,
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};

exports.savePurposeInfo = async (req, res, next) => {
  try {
    const postData = req.body;

    if (!postData.purposeid) {
      res.status(201).json({ success: false, message: "Purpose is required." });
      return;
    }

    const whenCondtion = [];
    whenCondtion.push({ field: "quote_number", value: postData.quoteno });

    let getQuoteId = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "quote_master",
      select: "id",
    });

    let addData = await CommonModel.insertRecords(
      {
        fk_quote_id: getQuoteId[0]["id"],
        fk_purpose_id: postData.purposeid,
        total_properties: postData.totalprop,
        total_eva_need: postData.totalevalutor,
      },
      "quote_eve_purpose"
    );

    if (addData) {
      res.status(201).json({
        success: true,
        message: "Data saved successfully.",
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

exports.updatePurposeInfo = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.purposeid) {
      res.status(201).json({ success: false, message: "Purpose is required." });
      return;
    }

    let updateData = {};
    if (postData.purposeid) {
      updateData.fk_purpose_id = postData.purposeid;
    }
    if (postData.totalprop) {
      updateData.total_properties = postData.totalprop;
    }
    if (postData.totalevalutor) {
      updateData.total_eva_need = postData.totalevalutor;
    }

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "quote_eve_purpose",
        whereCon: [{ field: "id", value: postData.id }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "Data updated successfully.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Record are not available to update.",
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
