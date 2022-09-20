const CommonModel = require("../models/common");

//#region PURPOSE
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
    });

    let resultCount = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "purpose_master",
      select: "count(1) as count",
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
    res.status(401).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};

exports.addpurpose = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(401)
        .json({ success: false, message: "Purpose name is required." });
      return;
    }

    if (!postData.title_ar) {
      res
        .status(401)
        .json({ success: false, message: "Purpose in arabic is required." });
      return;
    }
    let addData = await CommonModel.insertRecords(
      {
        title: postData.title,
        title_ar: postData.title_ar,
        isrestricted: postData.isrestricted,
        isdeleted: 0,
      },
      "purpose_master"
    );

    if (addData) {
      res.status(201).json({
        success: true,
        message: "purpose added successfully.",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "There is some problem, please try again later.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};

exports.updatepurpose = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(401)
        .json({ success: false, message: "Purpose name is required." });
      return;
    }

    if (!postData.title_ar) {
      res
        .status(401)
        .json({ success: false, message: "Purpose in arabic is required." });
      return;
    }

    let updateData = {};
    if (postData.title) {
      updateData.title = postData.title;
    }

    if (postData.title_ar) {
      updateData.title_ar = postData.title_ar;
    }
    if (postData.isrestricted) {
      updateData.isrestricted = postData.isrestricted;
    }

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "purpose_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "Purpose updated successfully.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Record are not available to update.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};

exports.deletepurpose = async (req, res, next) => {
  try {
    const postData = req.body;

    if (!postData.id) {
      return res
        .status(401)
        .json({ success: false, message: "ID is required." });
    }
    let getData = await CommonModel.getRecords({
      whereCon: [
        { field: "id", value: postData.id },
        { field: "isdeleted", value: 0 },
      ],
      table: "purpose_master",
      select: "*",
    });

    if (!getData.length) {
      return res
        .status(401)
        .json({ success: false, message: "Purpose already deleted." });
    }

    let deleteData = { isdeleted: 1 };

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "purpose_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      deleteData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "Purpose deleted successfully.",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "There is some problem, please try again later.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};
//#endregion
exports.fobiddenRoute = function (req, res, next) {
  res.status(403).json({ message: "forbidden" });
};
