const express = require("express");
const router = require("./router");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", router);

const server = app.listen("18083", function () {
  const { address, port } = server.address();
  console.log(address, port);
  // console.log(`Http Server is running on http://%s:%s',address,port);
});
