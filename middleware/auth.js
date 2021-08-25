const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Error("You are not authorized");
    } else {
      req.user = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
      next();
    }
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

module.exports = {
  auth,
};
