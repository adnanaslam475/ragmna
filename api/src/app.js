const express = require("express");
const helmet = require("helmet");

var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet.frameguard());
app.use(helmet.hsts({ maxAge: 5184000 }));
app.use(helmet.noSniff());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  res.header("Access-Control-Expose-Headers", "x-access-token, Authorization");
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    return res.status(200).json({});
  }
  process.on("uncaughtException", function (err) {
    console.log("Main error: ", err);
  });
  next();
});

/**
 * Routes
 */
const users = require("./routes/users");
const admin = require("./routes/admin");

app.use("/users", users);
app.use("/admin", admin);
module.exports = app;
