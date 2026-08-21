const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connection.db.js");
const userRouter = require("./routes/user.route.js");
const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/v1", userRouter);

app.listen(PORT, async () => {
  console.log(`🚀 Backend NodeJS đang chạy tại: http://localhost:${PORT}`);

  await connectDB();
});
