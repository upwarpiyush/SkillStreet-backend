const express  = require("express");
const router = express.Router();

//import controller
const {createNote} = require("../controllers/createNote");
const {getNote, getNoteById} = require("../controllers/getNote");
const {updateNote} = require("../controllers/updateNote");
const {deleteNote} =  require("../controllers/deleteNote");

//define APi routes
router.post("/createNote", createNote);
router.get("/getNotes", getNote);
router.get("/getNotes/:id", getNoteById);
router.put("/updateNote/:id", updateNote);
router.delete("/deleteNote/:id", deleteNote);

module.exports = router;