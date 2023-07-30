const express = require("express");
const db = require("./database/connection");
const V1Router = require("./routes");
const app = express();
const PORT = 8081;
const cors = require("cors");
app.use(express.json())
app.get("/", (req, res) => {
  return res.send("Server is up");
});
async function testDatabaseConnection() {
  try {
    const a = await db.sequelize.sync();
    // console.log(a);
    console.log("SQL data base connection is OK");
  } catch (e) {
    console.log("Error", e);
  }
}
app.use(cors());
app.use("/v1", V1Router);
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
  testDatabaseConnection();
});
