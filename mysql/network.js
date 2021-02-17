const express = require("express");

const response = require("../network/response");
const Store = require('../store/mysql');

const Controller = require("./index");


const router = express.Router();

router.get('/:tabla', list);
router.get('/:tabla/:id', get);
router.post('/:tabla',insert);
router.put('/:tabla',upsert);

async function list(req, res, next) {
    const datos = await Store.list(req.params.tabla);
    response.succes(req,res,datos,200);
}

async function get(req, res, next) {
    const dato = await Store.get(req.params.tabla,req.params.id);
    response.succes(req,res,dato,200);
}

async function insert(req, res, next) {
    const dato = await Store.insert(req.params.tabla, req.body);
    response.succes(req,res,dato,200);
}

async function upsert(req, res, next) {
    const dato = await Store.upsert(req.params.tabla, req.body);
    response.succes(req,res,dato,200);
}

module.exports = router;