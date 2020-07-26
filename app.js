const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("."));

app.get("/", (req, res) => {
  return res.sendFile(path.resolve("./abc.html"));
});

app.listen(process.env.PORT || 9000);
