const CommonModel = require("../models/common");
const { BlobServiceClient } = require("@azure/storage-blob");
const connStr =
  "DefaultEndpointsProtocol=https;AccountName=gtiblob;AccountKey=S08K8SXJDEi43Ywal2NdbfrVn0TCHspNav6MOhWGsviHuAaPb7XLH+wPgnEwZNxS4al4wMzWw1w++AStJEBeGg==;EndpointSuffix=core.windows.net";
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);
const containerName = "h-t/upload";
const blobURL = "https://gtiblob.blob.core.windows.net/h-t/upload";
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

exports.addpurpose = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "Purpose name is required." });
      return;
    }

    if (!postData.title_ar) {
      res
        .status(201)
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

exports.updatepurpose = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "Purpose name is required." });
      return;
    }

    if (!postData.title_ar) {
      res
        .status(201)
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

    updateData.isrestricted = postData.isrestricted;

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
    res.status(201).json({
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
        .status(201)
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
        .status(201)
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
//---------------------------------------------------------------

//#region Condition
exports.getConditionlist = async (req, res, next) => {
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
      table: "condition_master",
      select: "code, title,title_ar,val",
      pagination: pagination,
    });

    let resultCount = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "condition_master",
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
    res.status(201).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};

exports.updateConditionList = async (req, res, next) => {
  try {
    const postData = req.body;
    if (postData.length == 0) {
      res.status(201).json({ success: false, message: "Data is required." });
      return;
    }

    postData.forEach(async (element) => {
      let updateData = {};
      if (element.val) {
        updateData.val = element.val;
      }
      updateData.code = element.code;
      await CommonModel.updateRecords(
        {
          table: "condition_master",
          whereCon: [{ field: "code", value: element.code }],
        },
        updateData
      );
    });
    res.status(201).json({
      success: true,
      message: "Condition updated successfully.",
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
//---------------------------------------------------------------

//#region BUILDING PRICING
exports.getbuildingpricinglist = async (req, res, next) => {
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
      table: "pricing_building_master",
      select: "id,	title,	title_ar,	area,	price",
      pagination: pagination,
      orderBy: { field: "id", order: "desc" },
    });

    let resultCount = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "pricing_building_master",
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

exports.addbuildingpricing = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "Pricing name is required." });
      return;
    }

    if (!postData.title_ar) {
      res
        .status(201)
        .json({ success: false, message: "Pricing in arabic is required." });
      return;
    }
    let addData = await CommonModel.insertRecords(
      {
        title: postData.title,
        title_ar: postData.title_ar,
        area: postData.area,
        price: postData.price,
        isdeleted: 0,
      },
      "pricing_building_master"
    );

    if (addData) {
      res.status(201).json({
        success: true,
        message: "pricing added successfully.",
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

exports.updatebuildingpricing = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "Pricing name is required." });
      return;
    }

    if (!postData.title_ar) {
      res
        .status(201)
        .json({ success: false, message: "Pricing in arabic is required." });
      return;
    }

    let updateData = {};
    if (postData.title) {
      updateData.title = postData.title;
    }

    if (postData.title_ar) {
      updateData.title_ar = postData.title_ar;
    }
    if (postData.area) {
      updateData.area = postData.area;
    }
    if (postData.price) {
      updateData.price = postData.price;
    }
    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "pricing_building_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "Building pricing updated successfully.",
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

exports.deletebuildingpricing = async (req, res, next) => {
  try {
    const postData = req.body;

    if (!postData.id) {
      return res
        .status(201)
        .json({ success: false, message: "ID is required." });
    }
    let getData = await CommonModel.getRecords({
      whereCon: [
        { field: "id", value: postData.id },
        { field: "isdeleted", value: 0 },
      ],
      table: "pricing_building_master",
      select: "*",
    });

    if (!getData.length) {
      return res
        .status(201)
        .json({ success: false, message: "Purpose already deleted." });
    }

    let deleteData = { isdeleted: 1 };

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "pricing_building_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      deleteData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "Bulding pricing deleted successfully.",
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

//------------------------------------------------------------
//#region LAND PRICING
exports.getlandpricinglist = async (req, res, next) => {
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
      table: "pricing_land_master",
      select: "id,	title,	title_ar,	area,	price",
      pagination: pagination,
      orderBy: { field: "id", order: "desc" },
    });

    let resultCount = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "pricing_land_master",
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

exports.addlandpricing = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "Pricing name is required." });
      return;
    }

    if (!postData.title_ar) {
      res
        .status(201)
        .json({ success: false, message: "Pricing in arabic is required." });
      return;
    }
    let addData = await CommonModel.insertRecords(
      {
        title: postData.title,
        title_ar: postData.title_ar,
        area: postData.area,
        price: postData.price,
        isdeleted: 0,
      },
      "pricing_land_master"
    );

    if (addData) {
      res.status(201).json({
        success: true,
        message: "pricing added successfully.",
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

exports.updatelandpricing = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "Pricing name is required." });
      return;
    }

    if (!postData.title_ar) {
      res
        .status(201)
        .json({ success: false, message: "Pricing in arabic is required." });
      return;
    }

    let updateData = {};
    if (postData.title) {
      updateData.title = postData.title;
    }

    if (postData.title_ar) {
      updateData.title_ar = postData.title_ar;
    }
    if (postData.area) {
      updateData.area = postData.area;
    }
    if (postData.price) {
      updateData.price = postData.price;
    }
    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "pricing_land_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "Building pricing updated successfully.",
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

exports.deletelandpricing = async (req, res, next) => {
  try {
    const postData = req.body;

    if (!postData.id) {
      return res
        .status(201)
        .json({ success: false, message: "ID is required." });
    }
    let getData = await CommonModel.getRecords({
      whereCon: [
        { field: "id", value: postData.id },
        { field: "isdeleted", value: 0 },
      ],
      table: "pricing_land_master",
      select: "*",
    });

    if (!getData.length) {
      return res
        .status(201)
        .json({ success: false, message: "Purpose already deleted." });
    }

    let deleteData = { isdeleted: 1 };

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "pricing_land_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      deleteData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "Bulding pricing deleted successfully.",
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

//----------------------------------------------------------------

//#region COUNTRY MASTER

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

exports.addcountry = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "Country name is required." });
      return;
    }

    if (!postData.title_ar) {
      res
        .status(201)
        .json({ success: false, message: "Country in arabic is required." });
      return;
    }
    let addData = await CommonModel.insertRecords(
      {
        title: postData.title,
        title_ar: postData.title_ar,
        isdeleted: 0,
      },
      "country_master"
    );

    if (addData) {
      res.status(201).json({
        success: true,
        message: "country added successfully.",
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

exports.updatecountry = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "country name is required." });
      return;
    }

    if (!postData.title_ar) {
      res.status(201).json({
        success: false,
        message: "country name in arabic is required.",
      });
      return;
    }

    let updateData = {};
    if (postData.title) {
      updateData.title = postData.title;
    }

    if (postData.title_ar) {
      updateData.title_ar = postData.title_ar;
    }

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "country_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "country updated successfully.",
      });
    } else {
      res.status(201).json({
        success: true,
        message: "country are not available to update.",
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

exports.deletecountry = async (req, res, next) => {
  try {
    const postData = req.body;

    if (!postData.id) {
      return res
        .status(201)
        .json({ success: false, message: "ID is required." });
    }
    let getData = await CommonModel.getRecords({
      whereCon: [
        { field: "id", value: postData.id },
        { field: "isdeleted", value: 0 },
      ],
      table: "country_master",
      select: "*",
    });

    if (!getData.length) {
      return res
        .status(201)
        .json({ success: false, message: "country already deleted." });
    }

    let deleteData = { isdeleted: 1 };

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "country_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      deleteData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "country deleted successfully.",
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

//----------------------------------------------------------------

//#region REGION MASTER

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

exports.addregion = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "region name is required." });
      return;
    }

    if (!postData.title_ar) {
      res
        .status(201)
        .json({ success: false, message: "region in arabic is required." });
      return;
    }
    let addData = await CommonModel.insertRecords(
      {
        title: postData.title,
        title_ar: postData.title_ar,
        fk_country_id: postData.countryid,
        isdeleted: 0,
      },
      "region_master"
    );

    if (addData) {
      res.status(201).json({
        success: true,
        message: "region added successfully.",
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

exports.updateregion = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "region name is required." });
      return;
    }

    if (!postData.title_ar) {
      res.status(201).json({
        success: false,
        message: "region name in arabic is required.",
      });
      return;
    }

    let updateData = {};
    if (postData.title) {
      updateData.title = postData.title;
    }

    if (postData.title_ar) {
      updateData.title_ar = postData.title_ar;
    }
    if (postData.countryid) {
      updateData.fk_country_id = postData.countryid;
    }
    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "region_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "region updated successfully.",
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

exports.deleteregion = async (req, res, next) => {
  try {
    const postData = req.body;

    if (!postData.id) {
      return res
        .status(201)
        .json({ success: false, message: "ID is required." });
    }
    let getData = await CommonModel.getRecords({
      whereCon: [
        { field: "id", value: postData.id },
        { field: "isdeleted", value: 0 },
      ],
      table: "region_master",
      select: "*",
    });

    if (!getData.length) {
      return res
        .status(201)
        .json({ success: false, message: "region already deleted." });
    }

    let deleteData = { isdeleted: 1 };

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "region_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      deleteData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "region deleted successfully.",
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

//-----------------------------------------------

//#region CITY MASTER

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

exports.addnewcity = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "city name is required." });
      return;
    }

    if (!postData.title_ar) {
      res
        .status(201)
        .json({ success: false, message: "city in arabic is required." });
      return;
    }
    let addData = await CommonModel.insertRecords(
      {
        title: postData.title,
        title_ar: postData.title_ar,
        fk_region_id: postData.regionid,
        fk_country_id: postData.countryid,
        isrestricted: postData.isrestricted,
        isdeleted: 0,
      },
      "city_master"
    );

    if (addData) {
      res.status(201).json({
        success: true,
        message: "city added successfully.",
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

exports.updatecity = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "city name is required." });
      return;
    }

    if (!postData.title_ar) {
      res.status(201).json({
        success: false,
        message: "city name in arabic is required.",
      });
      return;
    }

    let updateData = {};
    if (postData.title) {
      updateData.title = postData.title;
    }

    if (postData.title_ar) {
      updateData.title_ar = postData.title_ar;
    }
    if (postData.countryid) {
      updateData.fk_country_id = postData.countryid;
    }

    if (postData.regionid) {
      updateData.fk_region_id = postData.regionid;
    }

    updateData.isrestricted = postData.isrestricted;

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "city_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "city updated successfully.",
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

exports.deletecity = async (req, res, next) => {
  try {
    const postData = req.body;

    if (!postData.id) {
      return res
        .status(201)
        .json({ success: false, message: "ID is required." });
    }
    let getData = await CommonModel.getRecords({
      whereCon: [
        { field: "id", value: postData.id },
        { field: "isdeleted", value: 0 },
      ],
      table: "city_master",
      select: "*",
    });

    if (!getData.length) {
      return res
        .status(201)
        .json({ success: false, message: "city already deleted." });
    }

    let deleteData = { isdeleted: 1 };

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "city_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      deleteData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "city deleted successfully.",
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

//----------------------------------------------------------------

//#region DISTRICT MASTER

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
        "dm.isrestricted,dm.fk_country_id, cmm.title as country, cmm.title_ar as country_ar,dm.id, dm.title,dm.title_ar,cm.title as city,cm.title_ar as city_ar,dm.fk_city_id,dm.fk_region_id,rm.title region,rm.title_ar as region_ar",
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

exports.addnewdistrict = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "district name is required." });
      return;
    }

    if (!postData.title_ar) {
      res
        .status(201)
        .json({ success: false, message: "district in arabic is required." });
      return;
    }
    let addData = await CommonModel.insertRecords(
      {
        title: postData.title,
        title_ar: postData.title_ar,
        fk_city_id: postData.cityid,
        fk_region_id: postData.regionid,
        fk_country_id: postData.countryid,
        isrestricted: postData.isrestricted,
        isdeleted: 0,
      },
      "district_master"
    );

    if (addData) {
      res.status(201).json({
        success: true,
        message: "district added successfully.",
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

exports.updatedistrict = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res
        .status(201)
        .json({ success: false, message: "district name is required." });
      return;
    }

    if (!postData.title_ar) {
      res.status(201).json({
        success: false,
        message: "district name in arabic is required.",
      });
      return;
    }

    let updateData = {};
    if (postData.title) {
      updateData.title = postData.title;
    }

    if (postData.title_ar) {
      updateData.title_ar = postData.title_ar;
    }
    if (postData.cityid) {
      updateData.fk_city_id = postData.cityid;
    }
    if (postData.regionid) {
      updateData.fk_region_id = postData.regionid;
    }
    if (postData.countryid) {
      updateData.fk_country_id = postData.countryid;
    }
    if (postData.isrestricted) {
      updateData.isrestricted = postData.isrestricted;
    }
    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "district_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "district updated successfully.",
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

exports.deletedistrict = async (req, res, next) => {
  try {
    const postData = req.body;

    if (!postData.id) {
      return res
        .status(201)
        .json({ success: false, message: "ID is required." });
    }
    let getData = await CommonModel.getRecords({
      whereCon: [
        { field: "id", value: postData.id },
        { field: "isdeleted", value: 0 },
      ],
      table: "district_master",
      select: "*",
    });

    if (!getData.length) {
      return res
        .status(201)
        .json({ success: false, message: "district already deleted." });
    }

    let deleteData = { isdeleted: 1 };

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "district_master",
        whereCon: [{ field: "id", value: postData.id }],
      },
      deleteData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "district deleted successfully.",
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

//----------------------------------------------------------------

//#region Email Template

exports.getemailtemplatelist = async (req, res) => {
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
    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "email_template_master cm",
      select: "id,code,title,email_body,email_subject_line",
      pagination: pagination,
      orderBy: { field: "cm.id", order: "asc" },
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

exports.updateemailtemplate = async (req, res) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res.status(201).json({ success: false, message: "title is required." });
      return;
    }
    if (!postData.emailbody) {
      res
        .status(201)
        .json({ success: false, message: "Email body is required." });
      return;
    }
    let updateData = {};
    if (postData.title) {
      updateData.title = postData.title;
    }

    if (postData.emailbody) {
      updateData.email_body = postData.emailbody;
    }
    if (postData.emailsubject) {
      updateData.email_subject_line = postData.emailsubject;
    }

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "email_template_master",
        whereCon: [{ field: "code", value: postData.code }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "email template updated successfully.",
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

exports.getallquotes = async (req, res) => {
  try {
    let resultquote = await CommonModel.getRecords({
      whereCon: [],
      table: "quote_master q",
      select:
        "q.*,qi.fname,qi.lname,qi.contact_no,qi.email",
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "quote_personal_info qi",
          joinCondition: "q.id = qi.fk_quote_id",
        },
      ],
      orderBy: { field: "q.id", order: "desc" },
    });
    res.status(201).json({
      success: true,
      items: resultquote,
      message: "data retrieve successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};
exports.getAllQuotesDoc = async (req, res) => {
  try {
    let resultquote = await CommonModel.getRecords({
      whereCon: [],
      table: "quote_upload_doc qi",
      select: "qi.*,q.quote_number as qno",
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "quote_master q",
          joinCondition: "q.id = qi.fk_quote_id",
        },
      ],
      orderBy: { field: "qi.id", order: "desc" },
    });
    res.status(201).json({
      success: true,
      items: resultquote,
      message: "data retrieve successfully",
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

//----------------------------------------------------------------

//#region Message On Screen
exports.getmsgonscreen = async (req, res) => {
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
    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "notification_configure cm",
      select: "id,code,title,msg",
      pagination: pagination,
      orderBy: { field: "cm.id", order: "asc" },
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

exports.updatemsgonscreen = async (req, res) => {
  try {
    const postData = req.body;
    if (!postData.title) {
      res.status(201).json({ success: false, message: "title is required." });
      return;
    }
    if (!postData.msg) {
      res
        .status(201)
        .json({ success: false, message: "Email body is required." });
      return;
    }
    let updateData = {};
    if (postData.title) {
      updateData.title = postData.title;
    }

    if (postData.msg) {
      updateData.msg = postData.msg;
    }

    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "notification_configure",
        whereCon: [{ field: "code", value: postData.code }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "message updated successfully.",
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
//#region File upload to customer
exports.updateFileToQuote = async (req, res) => {
  try {
    const postData = req.body;
    if (!postData.quoteno) {
      res.status(201).json({ success: false, message: "Quote is required." });
      return;
    }
    if (!postData.url) {
      res
        .status(201)
        .json({ success: false, message: "File URL is required." });
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
        fileurl: postData.url,
      },
      "quote_upload_doc"
    );

    if (addData) {
      res.status(201).json({
        success: true,
        message: "message updated successfully.",
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

//#region SMTP
exports.getSMTPConfig = async (req, res) => {
  try {
    let result = await CommonModel.getRecords({
      table: "smtp_configuration",
      select: "id,	host,	port,secure,	username,	pwd	,from_email,	from_name",
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

exports.updateSMTPConfig = async (req, res) => {
  try {
    const postData = req.body;
    if (!postData.host) {
      res.status(201).json({ success: false, message: "Host is required." });
      return;
    }
    if (!postData.port) {
      res.status(201).json({ success: false, message: "Port is required." });
      return;
    }
    let updateData = {};
    if (postData.host) {
      updateData.host = postData.host;
    }

    updateData.port = postData.port;

    if (postData.secure) {
      updateData.secure = postData.secure;
    }
    if (postData.username) {
      updateData.username = postData.username;
    }
    if (postData.pwd) {
      updateData.pwd = postData.pwd;
    }
    if (postData.fromemail) {
      updateData.from_email = postData.fromemail;
    }
    if (postData.from_name) {
      updateData.from_name = postData.from_name;
    }
    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "smtp_configuration",
        whereCon: [{ field: "id", value: postData.id }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "configuration updated successfully.",
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

//#region PG Config
exports.getPGConfig = async (req, res) => {
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
exports.updatePGConfig = async (req, res) => {
  try {
    const postData = req.body;
    let updateData = {};
    if (postData.publishkey) {
      updateData.publishkey = postData.publishkey;
    }
    let updatedDataResult = await CommonModel.updateRecords(
      {
        table: "pg_config",
        whereCon: [{ field: "pg_code", value: postData.code }],
      },
      updateData
    );

    if (updatedDataResult) {
      res.status(201).json({
        success: true,
        message: "configuration updated successfully.",
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

//#region DASHBOARD

exports.getDashboardData = async (req, res) => {
  try {
    let result = await CommonModel.getRecords({
      table: "sequence",
      select: `cycle,
      (SELECT COUNT(1) FROM quote_master) AS TotalQuote,
      (SELECT COUNT(1) FROM quote_master WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE()))
      As TotalCQuote,
      (SELECT COUNT(1) FROM quote_master WHERE valuation_url is null) As OpenOrder,
      (SELECT COUNT(1) FROM quote_master WHERE isrestricted = 1) As ManualQuotes,
      (SELECT COUNT(1) FROM quote_master WHERE isrestricted = 1 AND
      MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())) As ManualCQuotes,
      (SELECT SUM(total_amount) FROM quote_payment WHERE issuccess =1 ) As TotalPayment,
      (SELECT SUM(total_amount) FROM quote_payment
      WHERE issuccess = 1 AND MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())) As TotalCPayment`,

      orderBy: { field: "cycle", order: "asc", limit: "1" },
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
exports.fileupload = async (req, res) => {
  try {
    let _fileData = req.body.data;
    const buf = Buffer.from(_fileData, "base64");
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const content = buf;
    const blobName = req.body.filename;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(content, content.length);
    res.status(201).json({
      status: true,
      data: blobURL + "/" + blobName,
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};
exports.fobiddenRoute = function (req, res, next) {
  res.status(403).json({ message: "forbidden" });
};
