const { verifyJWTToken } = require("../utils/jwt");

exports.checkValidSessionToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"] || req.headers["Authorization"];
    if (!token) throw new Error("Token not passed");
    const payload = verifyJWTToken(token);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).jsonp({ error: true, message: "Auth invalid" });
  }
};
