const express = require("express");
const noteControllers = require("../controllers/noteControllers");
const router = express.Router();

router
  .route("/")
  .get(noteControllers.getAllNotes)
  .post(noteControllers.addNewNote);

router.route("/new");
//   .patch(notesController.updateNote)
//   .delete(notesController.deleteNote);

module.exports = router;
