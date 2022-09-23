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

//-----------------------------------------------------------

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

    whenCondtion.push({ field: "isdeleted", value: 0 });

    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "region_master",
      select: "id, title,title_ar",
      pagination: pagination,
      orderBy: { field: "id", order: "asc" },
    });

    let resultCount = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "region_master",
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
      { field: "rm.isdeleted", value: 0 }
    );

    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "city_master cm",
      select:
        "cm.id, cm.title,cm.title_ar,cm.fk_region_id,rm.title as region,rm.title_ar as region_ar,cm.isrestricted",
      join: [
        {
          joinType: "INNER JOIN",
          joinWith: "region_master rm",
          joinCondition: "rm.id = cm.fk_region_id",
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
      ],
      orderBy: { field: "cm.id", order: "desc" },
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
      { field: "cm.isdeleted", value: 0 }
    );

    let result = await CommonModel.getRecords({
      whereCon: whenCondtion,
      table: "district_master dm",
      select:
        "dm.id, dm.title,dm.title_ar,cm.title as city,cm.title_ar as city_ar,dm.fk_city_id,dm.fk_region_id,rm.title region,rm.title_ar as region_ar",
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
      ],
      orderBy: { field: "dm.id", order: "desc" },
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

exports.fobiddenRoute = function (req, res, next) {
  res.status(403).json({ message: "forbidden" });
};
