const express = require("express");
require("dotenv").config();

const routeAdmin = require("./router/admin/index.route");
const router = require("./router/client/index.route");

const systemConfig = require("./config/system");

const database = require("./config/database");
database.connect();

const app = express();
const port = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

// App Locals VVariables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static("public"));
routeAdmin(app);
router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
