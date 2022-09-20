const User = require("../models/common");
const jwt = require("jsonwebtoken");
const config = require("./../config");

module.exports.ensureAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    //console.log("token checking....", JSON.stringify(token))
    if (token) {
      jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
          if (err.name == "TokenExpiredError") {
            return res.status(401).json({
              status: "error",
              message: "Unauthorized access.",
              tokenExpired: true,
            });
          } else {
            console.log(err);
            return res
              .status(401)
              .json({ status: "error", message: "Unauthorized access." });
          }
        }
        req.decoded = decoded;
        const tableName = "users";

        let user = await User.getRecords({
          whereCon: [{ field: "id", value: decoded.id }],
          table: tableName,
          select: "*",
        });
        var currentUser = [];
        if (user.length > 0) {
          currentUser = {
            id: user[0].id,
            fname: user[0].fname,
            lname: user[0].lname,
            email: user[0].email
          };
        } else {
          return res.status(401).json({
            status: "error",
            message: "Token Expire OR Invalid Token.",
          });
        }
        req.user = currentUser;
        next();
      });
    } else {
      console.log("Failing here no token");
      res
        .status(401)
        .send({ status: "error", message: "Unauthorized access." });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized access." });
  }
};

module.exports.optionallyAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token) {
      jwt.verify(token, config.secret, async (err, decoded) => {
        if (err) {
          next();
        } else {
          req.decoded = decoded;
          if (req.decoded) {
            const tableName = "users";
            let user = await User.getRecords({
              whereCon: [{ field: "id", value: decoded.id }],
              table: tableName,
              select: "*",
            });
            var currentUser = [];
            if (user.length > 0) {
              currentUser = {
                id: user[0].id,
                fname: user[0].fname,
                lname: user[0].lname,
                email: user[0].email,
              };
            } else {
              return res.status(401).json({
                status: "error",
                message: "Token Expire OR Invalid Token.",
              });
            }
            req.user = currentUser;
            next();
          } else {
            next();
          }
        }
      });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized access." });
  }
};
