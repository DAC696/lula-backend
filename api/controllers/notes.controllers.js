const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const NoteModel = require("../models/notes.models");
const EmployeeModel = require("../models/employees.models");
const { StatusCodes } = require("http-status-codes");

/**
 * @description let user add Note
 */

const addNote = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    const { employeeId } = req.params;

    const employee = await EmployeeModel.getEmployeeById(employeeId);


    if (isEmpty(employee)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee Not found of this id"]

      })

    }

    const { comment } = req.body;

    //prepare object for storing note in db

    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      comment,
      _employeeId: employeeId,
      _created_by: user._id
    }

    const noteSaved = await NoteModel.addNote(prepObj, {
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
      createdAt: moment().toDate()
    });

    if (isEmpty(noteSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Note is not saved yet"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: noteSaved

    })

  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      success: false,
      hasError: true,
      error: ["Internal Server Error"]

    })

  }
};

const updateNoteById = async (req, res, next) => {
  try {

    const { noteId } = req.params;

    const note = await NoteModel.getNoteById(noteId);

    if (isEmpty(note)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Note Not found of this id"]

      })

    }

    const { comment } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (comment) updateData["comment"] = comment;

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedNote = await NoteModel.updateNoteById(noteId, updateData);

    if (isEmpty(updatedNote)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Note is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedNote

    })

  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      success: false,
      hasError: true,
      error: ["Internal Server Error"]

    })

  }
};

const getNoteListByEmployeeId = async (req, res, next) => {
  try {

    const { employeeId } = req.params;

    const employee = EmployeeModel.getEmployeeById(employeeId);

    if (isEmpty(employee)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee Not found of this id"]

      })

    }

    const notes = await NoteModel.getNoteListByEmployeeId(employeeId);

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: notes ? notes.length : 0,
      payload: notes

    })

  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      success: false,
      hasError: true,
      error: ["Internal Server Error"]

    })

  }
};

const deleteNoteById = async (req, res, next) => {
  try {

    const { noteId } = req.params;

    const note = await NoteModel.getNoteById(noteId);

    if (isEmpty(note)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["note Not found of this id"]

      })

    }

    const deletedNoteCount = await NoteModel.deleteNoteById(noteId);

    if (isEmpty(deletedNoteCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Note is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedNoteCount
      }

    })

  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      success: false,
      hasError: true,
      error: ["Internal Server Error"]

    })

  }
};

module.exports = {

  addNote,
  updateNoteById,
  getNoteListByEmployeeId,
  deleteNoteById

};
