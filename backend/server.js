"use strict";

const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(require("./routes"));

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Greetings from the backend!" });
});

app.listen(PORT, function () {
  console.info(`🌍 Listening on port ${PORT}`);
});
