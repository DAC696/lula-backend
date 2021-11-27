/* IMPORTING MODULES */
const express = require("express");

const NoteController = require("../controllers/notes.controllers");

/* Validations */
const NoteValidator = require('../validators/notes.validators');

const checkAuth = require('../middlewares/checkAuth');

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Note
router.post('/addNote/:employeeId', checkAuth, NoteValidator.addNoteValidator, NoteController.addNote)

//update note details
router.post("/update/:noteId", checkAuth, NoteValidator.updateNoteByIdValidator, NoteController.updateNoteById);

//delte note by id
router.delete("/delete/:noteId", checkAuth, NoteValidator.getNoteByIdValidator, NoteController.deleteNoteById);

module.exports = router;