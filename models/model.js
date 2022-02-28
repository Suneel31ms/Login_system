const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const scehma = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,

  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: "InActive",
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

scehma.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const UserDb = mongoose.model("log_table", scehma);

module.exports = UserDb;
