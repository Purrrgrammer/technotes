const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, default: "Employee" }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);
userSchema.plugin(AutoIncrement, {
  //seperate name counter will be created => id inside
  inc_field: "ticket",
  id: "ticketNums",
  //   counter tracks sequential number and continue insert to note
  start_seq: 500,
});
module.exports = mongoose.model("User", userSchema);
