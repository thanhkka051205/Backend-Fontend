const express = require("express");

const app = express();

app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    tittle: "Trang chu",
    message: "Xin chao cac ban",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    tittle: "Trang chu",
    message: "Xin chao cac ban",
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
