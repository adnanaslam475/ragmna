var http = require("http");
const host = "0.0.0.0";
const port = process.env.PORT || 4000;
const app = require("./src/app");

const server = http.createServer(app);

server.listen(port, host, function () {
  console.log("Server started.......");
});
