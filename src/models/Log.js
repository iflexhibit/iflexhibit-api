const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
  timestamp: Date,
  level: String,
  message: String,
});

module.exports =
  mongoose.models.Log || mongoose.model("Log", LogSchema, "logs");
