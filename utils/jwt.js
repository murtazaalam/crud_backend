const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "KEY_1234567890PUK";
exports.createJWTToken = (payload) => {
  return jwt.sign(payload, PRIVATE_KEY, { expiresIn: "24h" });
};
exports.verifyJWTToken = (payload) => {
  return jwt.verify(payload, PRIVATE_KEY);
};
