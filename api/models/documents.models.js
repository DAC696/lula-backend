const Document = require('../schemas/document');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new document
 * @param {Object} document 
 */

const addDocument = async (document, eventObj) => {
    try {

        const newDocument = new Document(document);

        const documentCreated = await newDocument.save();

        //whenever new document is added then emit an event
        if (documentCreated) {

            document["_locationId"] = {
                locName: eventObj.locName,
                locId: eventObj.locId
            };

            document["_departmentId"] = {
                departmentName: eventObj.departmentName
            }

            document["_documentOwnerId"] = {
                firstName: eventObj.firstName,
                lastName: eventObj.lastName
            }
            //this object will be used to send events  and it contains populated location id and employee id
            sendCustomEvent("documentAdded", document)

        }

        return documentCreated;

    } catch (error) {

        console.log(error)

    }
}

const getDocumentById = async (documentId) => {
    try {

        const document = await Document.findOne({ _id: documentId })
            .populate('_locationId')
            .populate('_departmentId')
            .populate('_documentOwnerId', 'firstName lastName')
            .lean()

        return document;
    } catch (error) {
        console.log(error);
    }
}

const updateDocumentById = async (documentId, objToBeUpdated) => {
    try {

        const updatedDocument = await Document.findByIdAndUpdate({ _id: documentId }, objToBeUpdated, { upsert: true, new: true })
            .populate('_locationId')
            .populate('_departmentId')
            .populate('_documentOwnerId', 'firstName lastName')
            .lean()

        //whenever document is updated then emit an event
        if (updatedDocument) {

            sendCustomEvent("documentUpdated", updatedDocument)

        }

        return updatedDocument;
    } catch (error) {
        console.log(error);
    }
}

const deleteDocumentById = async (documentId) => {
    try {

        const deletedDocument = await Document.deleteOne({ _id: documentId })

        //whenever document is deleted then emit an event
        if (deletedDocument && deletedDocument.deletedCount) {

            sendCustomEvent("documentDeleted", { documentId })

        }

        return deletedDocument.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllDocuments = async (employeeId) => {
    try {

        const documents = await Document.find({ _employeeId: employeeId })
            .populate('_locationId')
            .populate('_departmentId')
            .populate('_documentOwnerId', 'firstName lastName')
            .lean()

        return documents;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllDocumentsByLocationId = async (locationId) => {
    try {

        const documents = await Document.find({ _locationId: locationId })
            .populate('_locationId')
            .populate('_departmentId')
            .populate('_documentOwnerId', 'firstName lastName')
            .lean()

        return documents;

    } catch (error) {
        console.log(error);
    }
}
module.exports = {

    addDocument,
    getDocumentById,
    updateDocumentById,
    deleteDocumentById,
    enlistAllDocuments,
    enlistAllDocumentsByLocationId

}