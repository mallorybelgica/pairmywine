"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(
  cors({
    origin: ["https://pairmywine-app.netlify.app", "http://localhost:3000"],
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(require("./routes"));

app.get("/", async (req, res) => {
  res.status(200).json({ message: "Greetings from the backend!" });
});

app.listen(PORT, "0.0.0.0", function () {
  console.info(`🌍 Listening on port ${PORT}`);
});
