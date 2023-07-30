const UserService = require("../services/user");
const { createBcryptHash, compareBcryptHash } = require("../utils/bcrypt");
const { createJWTToken } = require("../utils/jwt");

const user = new UserService();
class AuthController {
  async login(req, res) {
    try {
      const email = req.body["email"];
      const password = req.body["password"];
      /**
       * Step 1 : check is email exist or not
       */
      const data = await user.getUserByEmail(email);
      if (!data)
        return res.status(404).json({ error: true, message: "Auth failed" });
      // if(data.user_pas)
      if (compareBcryptHash(password, data.user_password) === false) {
        return res.status(404).json({ error: true, message: "Auth failed" });
      }
      const token = createJWTToken({
        email: email,
        user_id: data.user_id,
        name: data.user_name,
      });
      return res.json({ error: false, data, token });
    } catch (e) {
      return res
        .status(400)
        .json({ error: true, message: e?.["message"] || "Api error" });
    }
  }
  async register(req, res) {
    try {
      const body = req.body;
      const dataX = await user.getUserByEmail(body.user_email);
      if (dataX)
        return res
          .status(404)
          .json({ error: true, message: "Email already registered" });
      body.user_password = createBcryptHash(body.user_password);
      const data = await user.newUser(body);
      return res.json({ error: false, data });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ error: true, message: e?.["message"] || "Api error" });
    }
  }
}

module.exports = AuthController;
