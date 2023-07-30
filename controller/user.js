const UserService = require("../services/user");
const { compareBcryptHash, createBcryptHash } = require("../utils/bcrypt");
const convertToCsv = require("../utils/csv");
// const { convertToCsv } = require("../utils/csv");
const { getPagination, getPagingData } = require("../utils/pagination");

const user = new UserService();
class UserController {
  async handleGetUserList(req, res) {
    try {
      // const
      const query = req.query;
      let page = query?.["page"] || 1;
      let size = query?.["size"] || 10;
      let query_search = query?.["search"] || "";
      let should_export = query["should_export"] || false;
      page = Number(page);
      size = Number(size);
      const { limit, skip } = getPagination(page, size);
      const { count, records } = await user.getUsersRecords(
        query_search,
        limit,
        skip,
        query?.["sort_by"],
        query?.["sort_on"]
      );
      // console.log(should_export)
      const response = getPagingData(count, page, limit, records);
      if (should_export !== false) {
        if (records.length < 1) throw new Error("Nothing to export");
        const csv = convertToCsv(records.map((a) => a.dataValues));
        const fileName = new Date().getTime();
        res.setHeader(
          "Content-disposition",
          `attachment; filename=${fileName}-users.csv`
        );
        res.set("Content-Type", "text/csv");
        return res.status(200).send(csv);
      } else {
        return res.jsonp(response);
      }
    } catch (e) {
      return res.status(400).jsonp({ error: true, message: e?.["message"] });
    }
  }
  async deleteUserAccount(req, res) {
    const userX = req.user;
    const user_id = userX?.["user_id"];
    if (!user_id) return res.status(403);
    // return res.jsonp(user);
    const response = await user.deleteUserById(user_id);
    return res.jsonp(response);
  }
  async changePassword(req, res) {
    try {
      const password = req.body["password"];
      const newPassword = req.body["newPassword"];
      if (password === newPassword)
        throw new Error("Both password is same not allowed");
      const userX = req.user;
      const user_id = userX?.["user_id"];
      const response = await user.getUserById(user_id);
      if (!response) return res.status(404).jsonp({ error: true });
      if (compareBcryptHash(password, response.user_password) === false) {
        return res
          .status(404)
          .jsonp({ error: true, message: "Password is incorrect" });
      }
      const update = await user.updateUser(
        { user_id },
        { user_password: createBcryptHash(newPassword) }
      );
      return res.jsonp({ update });
    } catch (e) {
      return res.status(400).jsonp({ error: true, message: e?.["message"] });
    }
  }

  async updateProfile(req, res) {
    try {
      const email = req.body["user_email"];
      const data = await user.getUserByEmail(email);
      const userX = req.user;
      const user_id = userX?.["user_id"];
      if (data && data.user_id !== user_id)
        return res
          .status(400)
          .jsonp({ error: true, message: "Email is already used" });
      const response = await user.updateUser({ user_id }, { ...req.body });
      return res.jsonp({ response });
    } catch (e) {
      return res.status(400).jsonp({ error: true, message: e?.["message"] });
    }
  }
}
module.exports = UserController;
