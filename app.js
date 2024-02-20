const cors = require("cors");
const express = require("express");
const path = require("path");
const errorHandle = require("./utils/errorHandler");
const port = 5000;
require("colors");
require("./config/db");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: "true" });
});

app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/bank", require("./routes/bankData"));
app.use("/api/v1/currency", require("./routes/currency"));
app.use(errorHandle);

const server = app.listen(port, () => {
  console.log(
    `the application is listening on http://localhost:${port}`.yellow.bold
  );
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`.red.bold.underline);
  server.close(() => {
    process.exit(1);
  });
});
module.exports = app;
