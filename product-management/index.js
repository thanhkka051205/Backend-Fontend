const express = require("express");
require("dotenv").config();
const router = require("./router/client/index.route");

const database = require("./config/database");
database.connect();

const app = express();
const port = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));
router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
