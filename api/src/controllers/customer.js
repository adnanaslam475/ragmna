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
        categorycode: postData.category,
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
    // if (!postData.companyname) {
    //   res
    //     .status(201)
    //     .json({ success: false, message: "Company Name is required." });
    //   return;
    // }

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

//#region Property Info
exports.savePropertyInfo = async (req, res, next) => {
  try {
    const postData = req.body;
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
        type_code: postData.typecd,
        region: postData.region,
        country: postData.country,
        city: postData.city,
        district: postData.district,
        land_size: postData.land_size,
        building_size: postData.building_size,
        isrestricted: postData.isrestricted,
        fk_purpose_id: postData.purposeid,
        total_properties: postData.totalprop,
        total_eva_need: postData.totalevalutor,
      },
      "quote_property_info"
    );

    if (addData) {
      if (postData.isrestricted) {
        let updateData = {};
        (updateData.isrestricted = postData.isrestricted),
          await CommonModel.updateRecords(
            {
              table: "quote_master",
              whereCon: [{ field: "quote_number", value: postData.quoteno }],
            },
            updateData
          );
      }
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

exports.updatePropertyInfo = async (req, res, next) => {
  try {
    const postData = req.body;

    let updateData = {};
    if (postData.typecd) {
      updateData.type_code = postData.typecd;
    }
    if (postData.region) {
      updateData.region = postData.region;
    }
    if (postData.country) {
      updateData.country = postData.country;
    }
    if (postData.city) {
      updateData.city = postData.city;
    }
    if (postData.district) {
      updateData.district = postData.district;
    }
    if (postData.land_size) {
      updateData.land_size = postData.land_size;
    }
    if (postData.building_size) {
      updateData.building_size = postData.building_size;
    }
    if (postData.isrestricted) {
      updateData.isrestricted = postData.isrestricted;
    }

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "quote_property_info",
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

exports.getPropertyInfo = async (req, res) => {
  try {
    const postData = req.params["quoteid"];
    console.log(postData);
    if (!postData) {
      res
        .status(201)
        .json({ success: false, message: "Quote Number is required." });
      return;
    }
    const whenCondtion = [];
    whenCondtion.push({ field: "q.quote_number", value: postData });

    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "quote_property_info qi",
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
//#endregion
//#region  Price Calculations
exports.getpriceCalculation = async (req, res) => {
  try {
    const postData = req.params;

    if (!postData.quoteid) {
      res
        .status(201)
        .json({ success: false, message: "Quote number is required." });
      return;
    }
    let _totalAmount = 0;
    const whenCondtion = [];
    whenCondtion.push({ field: "quote_number", value: postData.quoteid });
    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "quote_property_info qp",
      select:
        "qp.*,q.isrestricted as quoteres,q.quote_number,qi.fname,qi.lname,qi.email",
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "quote_master q",
          joinCondition: "q.id = qp.fk_quote_id",
        },
        {
          joinType: "INNER JOIN",
          joinWith: "quote_personal_info qi",
          joinCondition: "q.id = qi.fk_quote_id",
        },
      ],
    });

    if (result) {
      let i = 0;
      await result.forEach(async (ele) => {
        let _totalLandAmount = 0;
        let _totalBuildingAmount = 0;
        const whereCond2 = [];
        whereCond2.push(
          {
            field: "area",
            extraCondition: ">",
            value: ele.land_size,
          },
          {
            field: "isdeleted",
            value: "0",
          }
        );
        if (ele.type_code == "Land") {
          console.log(whereCond2);
          let _getAmount = await CommonModel.getRecords({
            whereCon: whereCond2,
            table: "pricing_land_master plm",
            select: "plm.*",
            orderBy: { field: "plm.area", order: "asc", limit: "1" },
          });
          if (_getAmount && _getAmount.length > 0) {
            _totalLandAmount = parseFloat(_getAmount[0]["price"]);
          }
        }

        if (ele.type_code == "Building") {
          let _getBuildingAmount = await CommonModel.getRecords({
            whereCon: whereCond2,
            table: "pricing_building_master plm",
            select: "plm.*",
            orderBy: { field: "plm.area", order: "asc", limit: "1" },
          });
          if (_getBuildingAmount && _getBuildingAmount.length > 0) {
            _totalBuildingAmount = parseFloat(_getBuildingAmount[0]["price"]);
          }
        }
        if (_totalBuildingAmount > _totalLandAmount) {
          _totalAmount =
            parseFloat(_totalAmount) + parseFloat(_totalBuildingAmount);
        } else {
          _totalAmount =
            parseFloat(_totalAmount) + parseFloat(_totalLandAmount);
        }

        _totalAmount = _totalAmount * parseFloat(ele["total_eva_need"]);
        i++;

        if (result.length == i) {
          let updateData = {};
          updateData.amount = _totalAmount;

          await CommonModel.updateRecords(
            {
              table: "quote_master",
              whereCon: [{ field: "quote_number", value: postData.quoteid }],
            },
            updateData
          );

          let notification = await CommonModel.getRecords({
            whereCon: [],
            table: "notification_configure plm",
            select: "plm.*",
          });

          let _manualNotifications = notification.find(
            (f) => f["code"] == "MANUALQUOTE"
          )["msg"];
          let _successNotifications = notification.find(
            (f) => f["code"] == "SUCCESSQUOTE"
          )["msg"];
          if (result[0]["quoteres"] == 1) {
            const whenCondtion2 = [];
            whenCondtion2.push({ field: "code", value: "MANUALQUOTE" });
            let tempresult = await CommonModel.getRecords({
              whereCon: whenCondtion2,
              table: "email_template_master qp",
              select: "qp.*",
            });

            let _emailbody = "";
            const encoder = new TextDecoder("utf-8");
            const bufferArray = new Uint8Array(
              tempresult[0]["email_body"].data
            );
            _emailbody = encoder.decode(bufferArray);
            _emailbody = _emailbody
              .replace("#quoteid#", result[0]["quote_number"])
              .replace("#amount#", _totalAmount)
              .replace(
                "#customername#",
                result[0]["fname"] + " " + result[0]["lname"]
              );
            var mailOptions = {
              from: "Quote <support@ragmna.com>",
              to: result[0]["email"],
              subject: tempresult[0]["email_subject_line"],
              html: _emailbody,
            };
            await CommonModel.sendEmail(mailOptions);
          }

          res.status(201).json({
            success: true,
            data: _totalAmount,
            isrestricted: result[0]["quoteres"] == 1 ? true : false,
            message:
              result[0]["quoteres"] == 1
                ? _manualNotifications
                : _successNotifications,
          });
        }
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

exports.savepaymentinit = async (req, res) => {
  try {
    const postData = req.body;

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
        total_amount: postData.amount,
        trans_id: postData.transId,
        pg_rescd: postData.statusCd,
        pg_res_msg: postData.respmsg,
        pg_res_data: postData.respData,
      },
      "quote_payment"
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

exports.updatepaystatus = async (req, res, next) => {
  try {
    const postData = req.body;
    let updateData = {};

    updateData.issuccess = postData.ispaid;
    updateData.pg_res_msg = postData.respMsg;
    if (postData.ispaid == 1) {
      updateData.pg_rescd = "SUCCESS";
    }

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "quote_payment",
        whereCon: [{ field: "trans_id", value: postData.transId }],
      },
      updateData
    );
    if (updatedDataResult) {
      if (postData.ispaid == 1) {
        console.log("I am paid");
        const whenCondtion1 = [];
        whenCondtion1.push({ field: "qp.trans_id", value: postData.transId });
        let quoteResult = await CommonModel.getRecords({
          whereCon: whenCondtion1,
          table: "quote_payment qp",
          select: "qi.email,q.quote_number,qp.total_amount,qi.fname,qi.lname",
          join: [
            {
              joinType: "INNER JOIN",
              joinWith: "quote_master q",
              joinCondition: "q.id = qp.fk_quote_id",
            },
            {
              joinType: "INNER JOIN",
              joinWith: "quote_personal_info qi",
              joinCondition: "q.id = qi.fk_quote_id",
            },
          ],
        });

        if (quoteResult && quoteResult.length > 0) {
          let updateDataQ = {};
          updateDataQ.ispaid = postData.ispaid;
          await CommonModel.updateRecords(
            {
              table: "quote_master",
              whereCon: [
                {
                  field: "quote_number",
                  value: quoteResult[0]["quote_number"],
                },
              ],
            },
            updateDataQ
          );

          const whenCondtion2 = [];
          whenCondtion2.push({ field: "code", value: "PAYMENTDONE" });
          let tempresult = await CommonModel.getRecords({
            whereCon: whenCondtion2,
            table: "email_template_master qp",
            select: "qp.*",
          });

          let _emailbody = "";
          const encoder = new TextDecoder("utf-8");
          const bufferArray = new Uint8Array(tempresult[0]["email_body"].data);
          _emailbody = encoder.decode(bufferArray);
          _emailbody = _emailbody
            .replace("#quoteid#", quoteResult[0]["quote_number"])
            .replace("#amount#", quoteResult[0]["total_amount"])
            .replace(
              "#customername#",
              quoteResult[0]["fname"] + " " + quoteResult[0]["lname"]
            );
          var mailOptions = {
            from: "Quote <support@ragmna.com>",
            to: quoteResult[0]["email"],
            subject: tempresult[0]["email_subject_line"],
            html: _emailbody,
          };
          await CommonModel.sendEmail(mailOptions);

          res.status(201).json({
            success: true,
            message: "Data updated successfully.",
          });
        }
      }

      res.status(201).json({
        success: true,
        message: "Data updated successfully.",
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

exports.updateCustomerByQuote = async (req, res) => {
  try {
    console.log(req.decoded);
    const postData = req.body;
    let updateData = {};
    updateData.fk_user_id = req.decoded.id;

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "quote_master",
        whereCon: [{ field: "quote_number", value: postData.quoteno }],
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

exports.getMyQuoteHistory = async (req, res) => {
  try {
    const whenCondtion = [];
    whenCondtion.push({ field: "fk_user_id", value: req.decoded.id });
    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "quote_master q",
      select: "q.*,qi.*",
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "quote_personal_info qi",
          joinCondition: "q.id = qi.fk_quote_id",
        },
      ],
    });
    if (result) {
      res.status(201).json({
        success: true,
        items: result,
        message: "Fetch data successfully",
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

exports.getAllConditions = async (req, res) => {
  try {
    let result = await CommonModel.getRecords({
      whereCon: [],
      table: "condition_master q",
      select: "q.*",
    });
    if (result) {
      res.status(201).json({
        success: true,
        items: result,
        message: "Fetch data successfully",
      });
    } else {
      res.status(201).json({
        success: false,
        message: "There is some problem, please try again later.",
      });
    }
  } catch (error) {}
};
//#region GetAll Lists
exports.getpurposelist = async (req, res, next) => {
  try {
    const getParams = req.query;
    const pagination = { page: 1, pageSize: 500 };
    const whenCondtion = [];

    if (getParams.page) {
      pagination.page = getParams.page;
    }
    if (getParams.pageSize) {
      pagination.pageSize = getParams.pageSize;
    }

    whenCondtion.push({ field: "isdeleted", value: 0 });

    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "purpose_master",
      select: "id, title,title_ar,isrestricted",
      pagination: pagination,
      orderBy: { field: "id", order: "desc" },
    });

    let resultCount = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "purpose_master",
      select: "count(1) as count",
      orderBy: { field: "id", order: "desc" },
    });
    resultCount = resultCount[0].count;
    const totalPages = resultCount / getParams.pageSize;

    res.status(201).json({
      success: true,
      items: result,
      totalRecords: resultCount,
      page: getParams.page,
      pageSize: getParams.pageSize,
      totalPages: resultCount ? Math.ceil(totalPages) : 0,
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};

exports.getcountrylist = async (req, res, next) => {
  try {
    const getParams = req.query;
    const pagination = { page: 1, pageSize: 500 };
    const whenCondtion = [];

    if (getParams.page) {
      pagination.page = getParams.page;
    }
    if (getParams.pageSize) {
      pagination.pageSize = getParams.pageSize;
    }

    whenCondtion.push({ field: "isdeleted", value: 0 });

    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "country_master",
      select: "id, title,title_ar",
      pagination: pagination,
      orderBy: { field: "id", order: "asc" },
    });

    let resultCount = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "country_master",
      select: "count(1) as count",
      orderBy: { field: "id", order: "desc" },
    });
    resultCount = resultCount[0].count;
    const totalPages = resultCount / getParams.pageSize;

    res.status(201).json({
      success: true,
      items: result,
      totalRecords: resultCount,
      page: getParams.page,
      pageSize: getParams.pageSize,
      totalPages: resultCount ? Math.ceil(totalPages) : 0,
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};

exports.getregionlist = async (req, res, next) => {
  try {
    const getParams = req.query;
    const pagination = { page: 1, pageSize: 500 };
    const whenCondtion = [];

    if (getParams.page) {
      pagination.page = getParams.page;
    }
    if (getParams.pageSize) {
      pagination.pageSize = getParams.pageSize;
    }

    whenCondtion.push(
      { field: "rm.isdeleted", value: 0 },
      { field: "cm.isdeleted", value: 0 }
    );

    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "region_master rm",
      select:
        "rm.id, rm.title,rm.title_ar,rm.fk_country_id,cm.title as country,cm.title_ar as country_ar",
      pagination: pagination,
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "country_master cm",
          joinCondition: "cm.id = rm.fk_country_id",
        },
      ],
      orderBy: { field: "rm.id", order: "asc" },
    });

    let resultCount = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "region_master rm",
      select: "count(1) as count",
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "country_master cm",
          joinCondition: "cm.id = rm.fk_country_id",
        },
      ],
    });
    resultCount = resultCount[0].count;
    const totalPages = resultCount / getParams.pageSize;

    res.status(201).json({
      success: true,
      items: result,
      totalRecords: resultCount,
      page: getParams.page,
      pageSize: getParams.pageSize,
      totalPages: resultCount ? Math.ceil(totalPages) : 0,
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};

exports.getcitylist = async (req, res, next) => {
  try {
    const getParams = req.query;
    const pagination = { page: 1, pageSize: 500 };
    const whenCondtion = [];

    if (getParams.page) {
      pagination.page = getParams.page;
    }
    if (getParams.pageSize) {
      pagination.pageSize = getParams.pageSize;
    }

    whenCondtion.push(
      { field: "cm.isdeleted", value: 0 },
      { field: "rm.isdeleted", value: 0 },
      { field: "cmm.isdeleted", value: 0 }
    );

    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "city_master cm",
      select:
        "cm.fk_country_id, cmm.title as country, cmm.title_ar as country_ar,cm.id, cm.title,cm.title_ar,cm.fk_region_id,rm.title as region,rm.title_ar as region_ar,cm.isrestricted",
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "region_master rm",
          joinCondition: "rm.id = cm.fk_region_id",
        },
        {
          joinType: "INNER JOIN",
          joinWith: "country_master cmm",
          joinCondition: "cmm.id = cm.fk_country_id",
        },
      ],
      pagination: pagination,
      orderBy: { field: "cm.id", order: "asc" },
    });

    let resultCount = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "city_master cm",
      select: "count(1) as count",
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "region_master rm",
          joinCondition: "rm.id = cm.fk_region_id",
        },
        {
          joinType: "INNER JOIN",
          joinWith: "country_master cmm",
          joinCondition: "cmm.id = cm.fk_country_id",
        },
      ],
    });
    resultCount = resultCount[0].count;
    const totalPages = resultCount / getParams.pageSize;

    res.status(201).json({
      success: true,
      items: result,
      totalRecords: resultCount,
      page: getParams.page,
      pageSize: getParams.pageSize,
      totalPages: resultCount ? Math.ceil(totalPages) : 0,
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};

exports.getdistrictlist = async (req, res, next) => {
  try {
    const getParams = req.query;
    const pagination = { page: 1, pageSize: 500 };
    const whenCondtion = [];

    if (getParams.page) {
      pagination.page = getParams.page;
    }
    if (getParams.pageSize) {
      pagination.pageSize = getParams.pageSize;
    }

    whenCondtion.push(
      { field: "dm.isdeleted", value: 0 },
      { field: "cm.isdeleted", value: 0 },
      { field: "cmm.isdeleted", value: 0 }
    );

    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "district_master dm",
      select:
        "dm.isrestricted, dm.fk_country_id, cmm.title as country, cmm.title_ar as country_ar,dm.id, dm.title,dm.title_ar,cm.title as city,cm.title_ar as city_ar,dm.fk_city_id,dm.fk_region_id,rm.title region,rm.title_ar as region_ar",
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "city_master cm",
          joinCondition: "cm.id = dm.fk_city_id",
        },
        {
          joinType: "INNER JOIN",
          joinWith: "region_master rm",
          joinCondition: "rm.id = dm.fk_region_id",
        },
        {
          joinType: "INNER JOIN",
          joinWith: "country_master cmm",
          joinCondition: "cmm.id = dm.fk_country_id",
        },
      ],
      pagination: pagination,
      orderBy: { field: "dm.id", order: "asc" },
    });

    let resultCount = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "district_master dm",
      select: "count(1) as count",
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "city_master cm",
          joinCondition: "cm.id = dm.fk_city_id",
        },
        {
          joinType: "INNER JOIN",
          joinWith: "country_master cmm",
          joinCondition: "cmm.id = dm.fk_country_id",
        },
      ],
    });
    resultCount = resultCount[0].count;
    const totalPages = resultCount / getParams.pageSize;

    res.status(201).json({
      success: true,
      items: result,
      totalRecords: resultCount,
      page: getParams.page,
      pageSize: getParams.pageSize,
      totalPages: resultCount ? Math.ceil(totalPages) : 0,
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};

exports.getPGCred = async (req, res) => {
  try {
    let result = await CommonModel.getRecords({
      table: "pg_config",
      select: "id,	pg_code,publishkey",
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
//#endregion
