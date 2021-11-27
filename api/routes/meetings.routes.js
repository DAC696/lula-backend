/* IMPORTING MODULES */
const express = require("express");

const MeetingController = require("../controllers/meetings.controllers");

/* Validations */
const MeetingValidator = require('../validators/meetings.validators');

const checkAuth = require('../middlewares/checkAuth');

//import meeting Access Control
const meetingAccess = require("../middlewares/meetingAccess");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */

//Add new Meeting
router.post('/addMeeting', checkAuth, MeetingValidator.addMeetingValidator, MeetingController.addMeeting)

//Get Meeting Details
router.get('/meeting/:meetingId', checkAuth, MeetingValidator.getMeetingByIdValidator, MeetingController.getMeetingById);

//update meeting details
router.post("/update/:meetingId", checkAuth, MeetingValidator.updateMeetingByIdValidator, MeetingController.updateMeetingById);

//delte meeting by id
router.delete("/delete/:meetingId", checkAuth, MeetingValidator.getMeetingByIdValidator, MeetingController.deleteMeetingById);

//get All details
router.get("/list", checkAuth, MeetingController.enlistAllMeetings)

module.exports = router;