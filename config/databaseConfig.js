const dotenv = require("dotenv");
dotenv.config();
module.exports = databaseConfig = {
  name: process.env.DATABASE_NAME || "database",
  password: process.env.DATABASE_PASSWORD || "",
  user: process.env.DATABASE_USER || "root",
  port: process.env.DATABASE_PORT || 5432,
  host: process.env.DATABASE_HOST || "localhost",
  dialect: process.env.DATABASE_DIALECT || "mysql",
};
