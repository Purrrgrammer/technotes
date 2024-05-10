const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: { type: String, required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: true },
});
module.exports = mongoose.model("Note", noteSchema);
