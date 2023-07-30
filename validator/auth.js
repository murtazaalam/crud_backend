const { body, validationResult } = require("express-validator");

exports.validateAuthLoginBody = [
  body("email").isEmail(),
  body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).jsonp({ errors, error: true });
    }
    next();
  },
];

exports.validateAuthRegisterBody = [
  body("user_email").isEmail(),
  body("user_password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  }),
  body("user_name").isString(),
  body("user_phone").isMobilePhone("en-IN"),
  body("user_gender").isString().isIn(["MALE", "FEMALE", "OTHER"]),
  async (req, res, next) => {
    // console.log(req);
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).jsonp({ errors, error: true });
    }
    next();
  },
];
