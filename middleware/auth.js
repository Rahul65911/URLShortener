const { getUser } = require("../services/auth");

function checkAuthentication(req, res, next) {
  const userId = req.cookies?.token;
  req.user = null;

  if (!userId) return next();

  const user = getUser(userId);
  req.user = user;

  next();
}

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.status(401).end("unAuthorized");
    next();
  };
}

module.exports = { checkAuthentication, restrictTo };
