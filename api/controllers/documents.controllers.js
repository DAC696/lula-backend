const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const DocumentModel = require("../models/documents.models");
const LocationModel = require("../models/locations.models");
const DepartmentModel = require("../models/departments.models");
const EmployeeModel = require("../models/employees.models");
const DocumentMedia = require("../schemas/documentMedia");
const { StatusCodes } = require("http-status-codes");
const fs = require('fs')

/**
 * @description let user add Document
 */

const addDocument = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    const {
      revisionNumber,
      comment,
      documentType,
      documentOwnerId,
      locationId,
      departmentId
    } = req.body


    let location = await LocationModel.getLocationById(locationId);

    if (isEmpty(location)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Location Not found of this id"]

      })

    }

    const documentOwner = await EmployeeModel.getEmployeeById(documentOwnerId);

    if (isEmpty(documentOwner)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee (document owner) Not found of this id"]

      })

    }

    const department = await DepartmentModel.getDepartmentById(departmentId);

    if (isEmpty(department)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Department Not found of this id"]

      })

    }


    const mainDocumentId = mongoose.Types.ObjectId();


    const files = req.files

    if (files) {
      const documentsPromiseArr = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const docId = mongoose.Types.ObjectId()

        const documentFullPath = `/${file.destination}/${file.filename}`;

        const documentName = file.originalname;

        const prepObj = {
          _id: docId,
          documentFullPath,
          documentName,
          _documentId: mainDocumentId,
          _created_by: user._id
        }

        const fileObj = new DocumentMedia(prepObj)

        const fileSaved = fileObj.save()

        documentsPromiseArr.push(fileSaved)
      }

      await Promise.all(documentsPromiseArr)
    }
    const prepObj = {
      _id: mainDocumentId,
      comment,
      revisionNumber,
      documentType,
      _locationId: locationId,
      _departmentId: departmentId,
      _documentOwnerId: documentOwnerId,
      _created_by: user._id
    }

    const documentSaved = await DocumentModel.addDocument(prepObj, {
      locName: location.locName,
      locId: location.locId,

      departmentName: department.departmentName,

      firstName: documentOwner.firstName,
      lastName: documentOwner.lastName
    });

    if (isEmpty(documentSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Document is not saved yet"]

      })

    }

    prepObj["_locationId"] = {
      locName: location.locName,
      locId: location.locId
    }

    prepObj["_documentOwnerId"] = {
      firstName: documentOwner.firstName,
      lastName: documentOwner.lastName
    }

    prepObj["_departmentId"] = {
      departmentName: department.departmentName
    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: prepObj

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

const updateDocumentById = async (req, res, next) => {
  try {
    const user = req.userData

    const { documentId } = req.params;

    const document = await DocumentModel.getDocumentById(documentId);

    if (isEmpty(document)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Document Not found of this id"]

      })

    }

    const {
      revisionNumber,
      comment,
      documentType,
      documentOwnerId,
      locationId,
      departmentId
    } = req.body

    //prepare object for storing user in db
    const updateData = {}

    if (locationId !== null && locationId !== undefined) {

      const location = await LocationModel.getLocationById(locationId);

      if (isEmpty(location)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Location Not found of this id"]

        })

      } else {

        updateData["_locationId"] = locationId

      }

    } else if (locationId === null) {

      updateData["_locationId"] = locationId

    }

    if (departmentId) {

      const department = await DepartmentModel.getDepartmentById(departmentId);

      if (isEmpty(department)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Department Not found of this id"]

        })

      } else {

        updateData["_departmentId"] = departmentId

      }

    }

    if (documentOwnerId) {

      const documentOwner = await EmployeeModel.getEmployeeById(documentOwnerId);

      if (isEmpty(documentOwner)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Document Owner(employee) Not found of this id"]

        })

      } else {

        updateData["_departmentId"] = departmentId

      }

    }

    if (revisionNumber) updateData["revisionNumber"] = revisionNumber;
    if (documentType) updateData["documentType"] = documentType;
    if (comment !== undefined) updateData["comment"] = comment;

    const documentsPromiseArr = []

    const files = req.files

    if (files && Array.isArray(files) && files.length) {

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const docId = mongoose.Types.ObjectId()

        const documentFullPath = `/${file.destination}/${file.filename}`;

        const documentName = file.originalname;

        const prepObj = {
          _id: docId,
          documentFullPath,
          documentName,
          _documentId: documentId,
          _created_by: user._id
        }

        const fileObj = new DocumentMedia(prepObj)

        const fileSaved = fileObj.save()

        documentsPromiseArr.push(fileSaved)
      }


    }
    await Promise.all(documentsPromiseArr)

    const updatedDocument = await DocumentModel.updateDocumentById(documentId, updateData);

    if (isEmpty(updatedDocument)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Document is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedDocument

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

const deleteDocumentById = async (req, res, next) => {
  try {

    const { isMedia } = req.query;

    const { documentId } = req.params;

    if (isMedia || isMedia == true || isMedia == "true") {

      const document = await DocumentMedia.findOne({ _id: documentId });

      if (isEmpty(document)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Document Not found of this id"]

        })

      }

      const deletedDocumentCount = await DocumentMedia.deleteOne({ _id: documentId });

      if (isEmpty(deletedDocumentCount.deletedCount)) {

        return res.status(StatusCodes.OK).json({

          success: false,
          hasError: true,
          error: ["No Document is deleted"]

        })

      }

      if (fs.existsSync(`.${document.documentFullPath}`)) {
        fs.unlinkSync(`.${document.documentFullPath}`)
      }

      return res.status(StatusCodes.OK).json({

        success: true,
        hasError: false,
        payload: {
          deletedCount: deletedDocumentCount.deletedCount
        }

      })

    } else { //delete main document

      const mediaDocumentsArr = await DocumentMedia.find({ _documentId: documentId });

      for (const media of mediaDocumentsArr) {
        const deletedDocumentMediaCount = await DocumentMedia.deleteOne({ _id: media._id });
       
        if (fs.existsSync(`.${media.documentFullPath}`)) {
          fs.unlinkSync(`.${media.documentFullPath}`)
        }

      }

      const documentDeletedCount = await DocumentModel.deleteDocumentById(documentId)

      return res.status(StatusCodes.OK).json({

        success: true,
        hasError: false,
        payload: {
          deletedCount: documentDeletedCount
        }

      })

    }

  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

      success: false,
      hasError: true,
      error: ["Internal Server Error"]

    })

  }
};

/**
 * @description This will get Document details by document id
 * @param {ObjectId} documentId
 */
const getDocumentById = async (req, res, next) => {
  try {

    const { documentId } = req.params;

    let document = await DocumentModel.getDocumentById(documentId);

    if (isEmpty(document)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Document Not found of this id"]

      })

    }

    const files = await DocumentMedia.find({ _documentId: documentId })
    console.log(files.length)
    document.files = files
    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: document

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

const enlistAllDocuments = async (req, res, next) => {
  try {

    let documents = await DocumentModel.enlistAllDocuments();

    documents = await Promise.all(documents.map(async doc => {
      console.log(doc._id)
      doc.files = await DocumentMedia.find({ _documentId: doc._id })
      console.log(doc.files.length)
      return doc
    }))

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: documents ? documents.length : 0,
      payload: documents

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

const enlistAllDocumentsByLocationId = async (req, res, next) => {
  try {

    const { locationId } = req.params;

    let location = await LocationModel.getLocationById(locationId);

    if (isEmpty(location)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Location Not found of this id"]

      })

    }

    let documents = await DocumentModel.enlistAllDocumentsByLocationId(locationId);

    documents = await Promise.all(documents.map(async doc => {
      console.log(doc._id)
      doc.files = await DocumentMedia.find({ _documentId: doc._id })
      console.log(doc.files.length)
      return doc
    }))

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: documents ? documents.length : 0,
      payload: documents

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

  addDocument,
  updateDocumentById,
  deleteDocumentById,
  getDocumentById,
  enlistAllDocuments,
  enlistAllDocumentsByLocationId

};
