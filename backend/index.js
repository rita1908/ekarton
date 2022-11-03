const express = require("express");
const index = express();
const mongoose = require("mongoose");
const PORT = 4000;
const { MONGOURI } = require("./keys");
const cors = require("cors");
index.use(cors());

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb");
});
mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});
require("./models/patient");
require("./models/user");
require("./models/diagnose");
index.use(express.json());
index.use(require("./routes/authRoutes"));
index.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
