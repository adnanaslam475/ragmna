"use strict";
const connectDb = require("../utilities/dbConnection");
const URL = require("url").URL;
const nodemailer = require("nodemailer");
const config = require("../config");
/**
 * @param {whereCon: [{field: "email", value: postData.email}], table: 'users', select: 'id, name'}
 */
module.exports.getRecords = function (params) {
  return new Promise((resolve, reject) => {
    connectDb.stablishedConnection().then((db) => {
      var whereStr = [];
      var whereStrOr = [];
      var joinStr = [];
      var str = "";
      var joinQuery = "";

      //Join condition
      if (params.join) {
        params.join.forEach((element) => {
          var con = "";
          con = `${element.joinType} ${element.joinWith} ON ${element.joinCondition}`;
          joinStr.push(con);
        });
        joinQuery = joinStr.join(" ");
        str = joinQuery;
      }

      //where condition
      if (params.whereCon && params.whereCon.length) {
        params.whereCon.forEach((element) => {
          var con = "";
          if (element.value == "NULL") {
            con = `${element.field} IS NULL`;
          } else {
            con = `${element.field} = '${element.value}'`;
          }
          if (element.extraCondition) {
            if (element.extraCondition == "IN") {
              con = `${element.field} ${element.extraCondition} ${element.value}`;
            } else if (element.extraCondition == "custom") {
              con = `${element.value}`;
            } else {
              con = `${element.field} ${element.extraCondition} '${element.value}'`;
            }
          }
          whereStr.push(con);
        });
        var str1 = whereStr.join(" AND ");
        if (params.whereConOr) {
          str = str + " WHERE (" + str1 + ") ";
        } else {
          str = str + " WHERE " + str1;
        }
      }

      //Where OR condition
      if (params.whereConOr && params.whereConOr.length) {
        params.whereConOr.forEach((element) => {
          var con = "";
          if (element.value == "NULL") {
            con = `${element.field} IS NULL`;
          } else {
            con = `${element.field} = '${element.value}'`;
          }
          if (element.extraCondition) {
            if (element.extraCondition == "IN") {
              con = `${element.field} ${element.extraCondition} ${element.value}`;
            } else if (element.extraCondition == "custom") {
              con = `${element.value}`;
            } else {
              con = `${element.field} ${element.extraCondition} '${element.value}'`;
            }
          }
          whereStrOr.push(con);
        });
        var str1 = "";
        if (params.isMainOrCon) {
          str1 = whereStrOr.join(" AND ");
        } else {
          str1 = whereStrOr.join(" OR ");
        }
        if (params.whereCon) {
          str = str + " OR (" + str1 + " )";
        } else {
          str = str + " WHERE " + str1;
        }
      }

      if (params.groupBy) {
        str = str + ` GROUP BY ${params.groupBy}`;
      }

      if (params.orderBy) {
        str = str + ` ORDER BY ${params.orderBy.field} ${params.orderBy.order}`;
        if (params.orderBy.limit && !params.pagination) {
          str = str + ` LIMIT ${params.orderBy.limit}`;
        }
      }

      //pagination
      if (params.pagination) {
        let offsetValue =
          params.pagination.page * params.pagination.pageSize -
          params.pagination.pageSize; //2 * 10 = 20 -10 = 10
        let limitSql = ` LIMIT ${params.pagination.pageSize} OFFSET ${offsetValue}`;
        str = str + limitSql;
      }
      const finalSql = `SELECT ${params.select} FROM ${params.table} ${str}`;
      console.log(finalSql);
      db.query(finalSql, function (err, result, fields) {
        if (err) {
          reject(err);
        } else {
          result = JSON.parse(JSON.stringify(result));
          connectDb.closeDbConnection(db);
          resolve(result);
        }
      });
    });
  });
};

module.exports.check_duplicate = function (
  key,
  value,
  tableName,
  getKeyfromObject
) {
  return new Promise((resolve, reject) => {
    if (getKeyfromObject) {
      value = value[getKeyfromObject];
      if (!value) {
        resolve("key_not_exist");
      }
    }
    var sql = `SELECT COUNT(${key}) as count FROM ${tableName} WHERE ${key} = ?`;
    connectDb.stablishedConnection().then((db) => {
      db.query(sql, [value], function (err, result, fields) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          result = JSON.parse(JSON.stringify(result));
          result = result[0].count;
          connectDb.closeDbConnection(db);
          resolve(result);
        }
      });
    });
  });
};

module.exports.insertData = function (insertData, tableName, callback) {
  var values = [],
    keys = [];

  if (isMultiple) {
    var keys1 = {};
    insertData.forEach((element) => {
      keys1 = Object.keys(element);
      keys1 = "(" + keys1.toString() + ")";
      keys = keys1;
      values.push(Object.values(element));
    });
    keys = [keys];
  } else {
    keys = Object.keys(insertData);
    keys = "(" + keys.toString() + ")";
    values = [Object.values(insertData)];
  }

  var sql = `INSERT INTO ${tableName} ${keys} VALUES ?`;
  connectDb.stablishedConnection().then((db) => {
    db.query(sql, [values], function (err, result, fields) {
      if (err) {
        console.log("Error: ", err);
        callback(err, null);
      } else {
        result = result.insertId;
        console.log("Record inserted successfully: ", result);
        connectDb.closeDbConnection(db);
        callback(null, result);
      }
    });
  });
};

module.exports.insertRecords = function (insertData, tableName, isMultiple) {
  return new Promise((resolve, reject) => {
    var values = [],
      keys = [];

    if (isMultiple) {
      var keys1 = {};
      insertData.forEach((element) => {
        keys1 = Object.keys(element);
        keys1 = "(" + keys1.toString() + ")";
        keys = keys1;
        values.push(Object.values(element));
      });
      keys = [keys];
    } else {
      keys = Object.keys(insertData);
      keys = "(" + keys.toString() + ")";
      values = [Object.values(insertData)];
    }

    var sql = `INSERT INTO ${tableName} ${keys} VALUES ?`;
    connectDb.stablishedConnection().then((db) => {
      db.query(sql, [values], function (err, result, fields) {
        if (err) {
          console.log("Error: ", err);
          reject(err);
        } else {
          result = result.insertId;
          console.log("Record inserted successfully: ", result);
          connectDb.closeDbConnection(db);
          resolve(result);
        }
      });
    });
  });
};

/**Generate random number for OTP */
module.exports.generateNumber = function (length) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
};

/**
 * @param {whereCon: [{field: "email", value: postData.email}], table: 'users'}
 */
module.exports.deleteRecords = function (params) {
  return new Promise((resolve, reject) => {
    connectDb.stablishedConnection().then((db) => {
      var whereStr = [];
      var str = "";
      //where condition
      if (params.whereCon) {
        params.whereCon.forEach((element) => {
          var con = `${element.field} = '${element.value}'`;
          if (element.extraCondition) {
            if (element.extraCondition == "IN") {
              con = `${element.field} ${element.extraCondition} (${element.value})`;
            } else {
              con = `${element.field} ${element.extraCondition} '${element.value}'`;
            }
          }
          whereStr.push(con);
        });
        str = whereStr.join(" AND ");
        str = " WHERE " + str;
      }

      db.query(
        `DELETE FROM ${params.table} ${str}`,
        function (err, result, fields) {
          if (err) {
            reject(err);
          } else {
            result = JSON.parse(JSON.stringify(result));
            connectDb.closeDbConnection(db);
            resolve(result.affectedRows);
          }
        }
      );
    });
  });
};

/**
 * Update records
 */
module.exports.updateRecords = function (keys, params) {
  return new Promise((resolve, reject) => {
    var updateValue = [];
    var i = 0;
    var whereStr = [];
    var str = "";
    if (keys.whereCon) {
      keys.whereCon.forEach((element) => {
        var con = `${element.field} = '${element.value}'`;
        whereStr.push(con);
      });
      str = whereStr.join(" AND ");
      str = " WHERE " + str;
    }

    Object.keys(params).forEach(function (key, i) {
      if (typeof params[key] != "undefined") {
        if (
          params[key] == undefined ||
          params[key] == "null" ||
          params[key] == "" ||
          params[key] == "NULL"
        ) {
          updateValue.push(`${key}  = NULL`);
        } else {
          if (key == "otp") {
            updateValue.push(key + " = " + params[key]);
          } else {
            updateValue.push(key + " = '" + params[key] + "'");
          }
        }
      }
    });

    updateValue = updateValue.toString();
    console.log(`UPDATE ${keys.table} SET ${updateValue} ${str}`);
    connectDb.stablishedConnection().then((db) => {
      db.query(
        `UPDATE ${keys.table} SET ${updateValue} ${str}`,
        function (err, result, fields) {
          if (err) {
            reject(err);
          } else {
            result = result.affectedRows;
            console.log(result + " record(s) updated");
            connectDb.closeDbConnection(db);
            resolve(result);
          }
        }
      );
    });
  });
};

module.exports.isEmailValid = function (email) {
  return new Promise((resolve, reject) => {
    try {
      let isFailed = false;
      const emailRegex =
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

      if (!email) {
        isFailed = true;
      }

      if (email.length > 254) {
        isFailed = true;
      }

      var valid = emailRegex.test(email);
      if (!valid) {
        isFailed = true;
      }

      // Further checking of some things regex can't handle
      var parts = email.split("@");
      if (parts[0].length > 64) {
        isFailed = true;
      }

      if (parts[1]) {
        var domainParts = parts[1].split(".");
        if (
          domainParts.some(function (part) {
            return part.length > 63;
          })
        ) {
          isFailed = true;
        }
      } else {
        isFailed = true;
      }

      if (isFailed) {
        resolve(false);
      } else {
        resolve(true);
      }
    } catch (error) {
      reject("Something went wrong!!");
    }
  });
};

/**Check URL is valid or not */
module.exports.stringIsAValidUrl = function (urlVal) {
  return new Promise((resolve, reject) => {
    try {
      new URL(urlVal);
      resolve(true);
    } catch (err) {
      resolve(false);
    }
  });
};

/**
 * Send Email
 */
module.exports.sendEmail = function (mailOptions) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: config.SMTP_USERNAME,
        pass: config.SMTP_PASSWORD,
      },
    });
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log("Error in email send: ", err);
        reject(err);
      } else {
        console.log("email sent successfully");
        resolve(true);
      }
    });
  });
};

module.exports.getNextVal = function (seq_name) {
  return new Promise(async (resolve, reject) => {

    let result = await this.getRecords({
      whereCon: { field: "name", value: seq_name },
      table: "sequence",
      select: "cur_value,increment",
    });
    console.log(result);
    let current_val = result[0]["cur_value"];

    if (result) {
      current_val =
        parseInt(result[0]["cur_value"]) + parseInt(result[0]["increment"]);

      let updateData = {};
      updateData.cur_value = current_val;

      let updatedDataResult = await this.updateRecords(
        {
          table: "sequence",
          whereCon: [{ field: "name", value: seq_name }],
        },
        updateData
      );

      if (updatedDataResult) {
        resolve(current_val);
      }
    }
    resolve(current_val);
  });
};
