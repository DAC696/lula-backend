const InvestigationDocument = require('../schemas/investigationDocument');
const { sendCustomEvent } = require("../misc/helperFunctions");

/**
 * @description This will create new investigationDocument
 * @param {Object} investigationDocument 
 */

const addMultipleInvestigationDocuments = async (investigationDocuments) => {
    try {

        const investigationDocs = await InvestigationDocument.insertMany(investigationDocuments)

        return investigationDocs;

    } catch (error) {

        console.log(error)

    }
}

const getInvestigationDocumentById = async (investigationDocumentId) => {
    try {

        const investigationDocument = await InvestigationDocument.findOne({ _id: investigationDocumentId })
            .lean()

        return investigationDocument;
    } catch (error) {
        console.log(error);
    }
}

const getAllInvestigationDocumentsByIncidentId = async (incidentId) => {
    try {

        const investigationDocuments = await InvestigationDocument.find({ _incidentInvestigationId: incidentId })
            .lean()

        return investigationDocuments;
    } catch (error) {
        console.log(error);
    }
}

const deleteInvestigationDocumentById = async (investigationDocumentId) => {
    try {

        const deletedInvestigationDocument = await InvestigationDocument.deleteOne({ _id: investigationDocumentId })

        //whenever  investigationDocument is deleted then emit an event
        if (deletedInvestigationDocument && deletedInvestigationDocument.deletedCount) {

            sendCustomEvent("investigationDocumentDeleted", { investigationDocumentId })

        }

        return deletedInvestigationDocument.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const deleteAllInvestigationDocumentByDocsArr = async (docsIds) => {
    try {

        const deletedInvestigationDocument = await InvestigationDocument.deleteMany({ _id: { $in: docsIds } })

        return deletedInvestigationDocument.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const deleteAllInvestigationDocumentByIncidentId = async (incidentId) => {
    try {

        const deletedInvestigationDocument = await InvestigationDocument.deleteMany({ _incidentInvestigationId: incidentId })

        return deletedInvestigationDocument.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllInvestigationDocumentsByIncidentId = async (incidentInvestigationId) => {
    try {

        const investigationDocuments = await InvestigationDocument.find({ _incidentInvestigationId: incidentInvestigationId })
            .lean()

        return investigationDocuments;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addMultipleInvestigationDocuments,
    getInvestigationDocumentById,
    deleteInvestigationDocumentById,
    enlistAllInvestigationDocumentsByIncidentId,
    deleteAllInvestigationDocumentByDocsArr,
    deleteAllInvestigationDocumentByIncidentId,
    getAllInvestigationDocumentsByIncidentId

}