const response = require('./response');

function errors(e, req, res, next) {
    console.error('[ERROR] ',e);

    const message = e.message;
    const status = e.statusCode || 500;

    response.error(req,res,message,status);
}

module.exports = errors;