const bcrypt = require("bcrypt");
const SALT_ROUND = 10;
exports.createBcryptHash = (text) => {
  const salt = bcrypt.genSaltSync(SALT_ROUND);
  console.log(salt, text);
  return bcrypt.hashSync(text, salt);
};
exports.compareBcryptHash = (text, hash) => {
  return bcrypt.compareSync(text, hash);
};
