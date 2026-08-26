const express = require("express");
const cors = require("cors");
const path = require("path");
const dns = require("node:dns");
const connectDB = require("./config/connection.db.js");
const userRouter = require("./routes/user.route.js");

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "../public/uploads")),
);
app.use("/public", express.static(path.join(__dirname, "src/public")));

app.use("/api/v1", userRouter);

app.listen(PORT, async () => {
  console.log(`🚀 Backend NodeJS đang chạy tại: http://localhost:${PORT}`);
  await connectDB();
});
