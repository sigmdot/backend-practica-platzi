const express = require("express");

const secure = require("./secure");
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

//ROUTER

router.get("/", list);

router.post("/follow/:id", secure("follow"), follow);

router.get("/:id", get);

router.post("/", upsert);

router.get("/:id/following", following);

router.put("/", secure("update"), upsert);

//FUNCIONES

function list(req, res, next) {
  Controller.list()
    .then((lista) => {
      response.succes(req, res, lista, 200);
    })
    .catch((e) => {
      response.error(req, res, e, 500);
    });
}

function get(req, res) {
  Controller.get(req.params.id)
    .then((user) => {
      response.succes(req, res, user, 200);
    })
    .catch((e) => {
      response.error(req, res, e, 500);
    });
}

function upsert(req, res) {
  Controller.upsert(req.body)
    .then((user) => {
      response.succes(req, res, user, 201);
    })
    .catch((e) => {
      response.error(req, res, e, 500);
    });
}

function follow(req, res, next) {
  Controller.follow(req.user.id, req.params.id)
    .then((data) => {
      response.succes(req, res, data, 201);
    })
    .catch(next);
}

function following(req, res, next) {
  Controller.following(req.params.id)
    .then((data) => {
      response.succes(req, res, data, 200);
    })
    .catch(next);
}

module.exports = router;
