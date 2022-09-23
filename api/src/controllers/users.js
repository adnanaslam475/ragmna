const CommonModel = require("../models/common");
const config = require("./../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

exports.signIn = async (req, res, next) => {
  try {
    const postData = req.body;
    if (!postData.email) {
      res.status(201).json({ success: false, message: "Email is required." });
      return;
    }

    if (!postData.password) {
      res
        .status(201)
        .json({ success: false, message: "Password is required." });
      return;
    }

    let getUser = await CommonModel.getRecords({
      whereCon: [{ field: "email", value: postData.email }],
      table: "users",
      select: "*",
    });

    if (getUser.length) {
      let isMatchedPassword = await bcrypt.compare(
        postData.password,
        getUser[0].pwd
      );
      if (isMatchedPassword) {
        delete getUser[0].pwd;

        const tokenUser = getUser[0];
        const token = jwt.sign(tokenUser, config.secret, {
          expiresIn: config.tokenLife,
        });
        var response = {
          success: true,
          message: "Login successfully",
          token: token,
        };
        res.status(201).json(response);
      } else {
        var response = {
          success: false,
          message: "Please enter correct password",
        };
        res.status(201).json(response);
      }
    } else {
      res
        .status(201)
        .json({ success: false, message: "Please enter correct email." });
    }
  } catch (error) {
    console.log(error);
    res.status(201).json({
      success: false,
      message: "There is some problem, please try again later.",
    });
  }
};

exports.demo = async (req, res, next) => {
  let getNextVal = await CommonModel.getNextVal("quote_number");
  res.status(200).json({
    success: true,
    data: getNextVal,
    message: "Success",
  });
};
exports.fobiddenRoute = function (req, res, next) {
  res.status(403).json({ message: "forbidden" });
};
