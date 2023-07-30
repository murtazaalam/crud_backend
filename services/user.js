const { Op } = require("sequelize");
const users = require("../models/user");

class UserService {
  async getUserByEmail(email) {
    const result = await users.findOne({ where: { user_email: email } });
    return result;
  }
  async newUser(option) {
    const x = new users(option);
    return await x.save();
  }
  async getUsersRecords(query, limit, skip, sort_by, sort_on) {
    let filter = {
      ...(typeof query === "string" &&
        query.trim().length > 1 && {
          [Op.or]: [
            {
              user_email: {
                [Op.like]: `%${query}%`,
              },
            },
            {
              user_name: {
                [Op.like]: `%${query}%`,
              },
            },
          ],
        }),
    };
    // console.log(sort_on, sort_by);
    const c = users.count({
      where: { ...(typeof filter === "object" && { ...filter }) },
    });
    const r = users.findAll({
      where: { ...(typeof filter === "object" && { ...filter }) },
      attributes: { exclude: ["user_password"] },
      limit: limit,
      offset: skip,
      ...(sort_by && sort_on && { order: [[sort_on, sort_by]] }),
    });
    const [count, records] = await Promise.all([c, r]);
    return { count, records };
  }

  async deleteUserById(id) {
    return await users.destroy({ where: { user_id: id } });
  }
  async getUserById(id) {
    return await users.findByPk(id);
  }

  async updateUser(filter, option) {
    if (typeof filter !== "object") throw new Error("Invalid request");
    return await users.update({ ...option }, { where: { ...filter } });
  }
}

module.exports = UserService;
