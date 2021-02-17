const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const encrypt = config.jwt.secret;

function sign(data) {
    return jwt.sign(JSON.parse(JSON.stringify(data)), encrypt); 
}

function verify(token) {
    return jwt.verify(token,encrypt)
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        if(decoded.id !== owner){
            throw error('No puedes hacer esto',401);
        }
    },
    logged: function (req) {
        const decoded = decodeHeader(req);
    }
}

function getToken(auth) {
    if(!auth){
        throw error('No viene token', 401);
    }

    if(auth.indexOf('Bearer ')=== -1){
        throw error('Formato inválido', 500);
    }

    let token = auth.replace('Bearer ','');

    return token
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
}