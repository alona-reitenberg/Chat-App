const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.36dsfij.mongodb.net/test`,
  () => {
    console.log("connected to mongodb");
  }
);
