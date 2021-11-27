const Notes = require('../schemas/note');
const { sendCustomEvent } = require("../misc/helperFunctions");
const moment = require("moment")
/**
 * @description This will create new notes
 * @param {Object} notes 
 */

const addNote = async (note, noteEvent) => {
    try {

        const newNote = new Notes(note);

        const noteCreated = await newNote.save();

        //whenever new note is added then emit an event
        if (noteCreated) {

            note["_created_by"] = {
                ...noteEvent
            }

            //this object will be used to send events  and it contains populated location id and employee id
            sendCustomEvent("noteAdded", note)

        }

        return noteCreated;

    } catch (error) {

        console.log(error)

    }
}

const getNoteById = async (noteId) => {
    try {

        const notes = await Notes.findOne({ _id: noteId })
            .populate('_employeeId')
            .populate('_created_by', '-password')
            .lean()

        return notes;
    } catch (error) {
        console.log(error);
    }
}

const updateNoteById = async (notesId, objToBeUpdated) => {
    try {

        const updatedNotes = await Notes.findByIdAndUpdate({ _id: notesId }, objToBeUpdated, { upsert: true, new: true })
            .populate('_employeeId')
            .populate('_created_by', '-password')
            .lean()

        //whenever notes is updated then emit an event
        if (updatedNotes) {

            sendCustomEvent("notesUpdated", updatedNotes)

        }

        return updatedNotes;
    } catch (error) {
        console.log(error);
    }
}

const deleteNoteById = async (notesId) => {
    try {

        const deletedNote = await Notes.deleteOne({ _id: notesId })

        //whenever notes is deleted then emit an event
        if (deletedNote && deletedNote.deletedCount) {

            sendCustomEvent("notesDeleted", { notesId })

        }

        return deletedNote.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllNotess = async (employeeId) => {
    try {

        const notess = await Notes.find({ _employeeId: employeeId })
            .populate('_employeeId')
            .populate('_created_by', '-password')
            .lean()

        return notess;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addNote,
    getNoteById,
    updateNoteById,
    deleteNoteById,
    enlistAllNotess,

}