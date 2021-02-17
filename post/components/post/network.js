const express = require("express");

const response = require("../../../network/response");
const secure = require("./secure");
const Controller = require("./index");

const router = express.Router();

//ROUTER

router.get("/", list);
router.get("/:id", get);
router.get("/user/:UserId", getByUser);
router.post("/", secure("post"), upsert);
router.put("/", secure("update"), upsert);

//Function

function list(req, res, next) {
  Controller.list()
    .then((posts) => {
      response.succes(req, res, posts, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((post) => {
      response.succes(req, res, post, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  Controller.upsert(req.user.id, req.body)
    .then((post) => {
      response.succes(req, res, post, 201);
    })
    .catch(next);
}

function getByUser(req, res, next) {
  Controller.getByUser(req.params.UserId)
    .then((post) => {
      response.succes(req, res, post, 200);
    })
    .catch(next);
}

module.exports = router;
