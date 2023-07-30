const { Sequelize } = require("sequelize");
const databaseConfig = require("../config/databaseConfig");
const db = {};
console.log(databaseConfig);
const sequelize = new Sequelize(
  databaseConfig.name,
  databaseConfig.user,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    port: databaseConfig.port,
    dialect: databaseConfig.dialect,
    // operatorsAliases:false ,
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;
