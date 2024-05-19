const express = require("express");
const router = express.Router();
const path = require("path");
// const router = express.Router();
// recognise rejex => caret +> at the begining on the string only
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));

  //router

  console.log("Root Called");
});

module.exports = router;
