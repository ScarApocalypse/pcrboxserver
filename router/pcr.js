const express = require("express");
const Result = require("../models/Result");
const {
  getRoles,
  getList,
  addBox,
  boxExist,
  deleteBox,
  editBox,
} = require("../services/pcr");
const boom = require("boom");
const router = express.Router();

router.get("/roles", function (req, res) {
  getRoles().then((data) => {
    data.forEach((item, index) => {
      data[
        index
      ].icon = `https://gitee.com/sinep/pcricon/raw/master/${item.icon}.png`;
    });
    new Result(data, "获取角色信息成功").success(res);
  });
});

router.get("/list", function (req, res) {
  getList().then((data) => {
    // console.log(data);
    new Result(data, "获取列表信息成功").success(res);
  });
});

router.post("/addbox", async function (req, res) {
  const result = await boxExist(req.body[0].owner);
  if (result.length > 0) {
    return new Result("该Id的box已存在").fail(res);
  }
  addBox(req.body).then((data) => {
    // console.log(data);
    new Result(data, "添加box成功").success(res);
  });
});

router.post("/deletebox", function (req, res) {
  console.log(req.body);
  deleteBox(req.body.owner).then((data) => {
    new Result("成功删除box").success(res);
  });
});

router.post("/editbox", function (req, res) {
  console.log(req.body);
  editBox(req.body).then((data) => {
    new Result(data, "成功").success(res);
  });
});

module.exports = router;
