const { query, validationResult, body } = require("express-validator");
const allowedSortKey = ["user_id", "user_email", "user_name"];
exports.getUserQueryValidator = [
  query("page").isNumeric(),
  query("size").isNumeric(),
  query("search").isString().optional(),
  query("sort_on").isString().optional().isIn(allowedSortKey),
  query("sort_by").isString().optional().isIn(["ASC", "DESC"]),
  query("should_export").isBoolean().optional(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).jsonp({ errors, error: true });
    }
    next();
  },
];

exports.updatePasswordValidator = [
  body("password").isString(),
  body("newPassword").isStrongPassword({
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
exports.updateProfileUser = [
  body("user_name").isString(),
  body("user_email").isEmail(),
  body("user_phone").isMobilePhone("en-IN"),
  body("user_profile_image").isURL(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).jsonp({ errors, error: true });
    }
    next();
  },
];
