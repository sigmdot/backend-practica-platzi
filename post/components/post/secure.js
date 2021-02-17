const auth = require('../../../auth');

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        auth.check.logged(req);
        next();
        break;
      case "post":
        auth.check.logged(req);
        next();
        break;

      default:
        next();
    }
  }

  return middleware;
};
