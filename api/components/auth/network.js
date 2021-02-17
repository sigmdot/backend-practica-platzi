const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.post("/login", login);

function login(req, res) {
  Controller.login(req.body.username, req.body.password)
    .then((token) => {
      response.succes(req, res, token, 200);
    })
    .catch(error => {
      response.error(req, res, 'Invalido', 400);
    });
}

module.exports = router;
