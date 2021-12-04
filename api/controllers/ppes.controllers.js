const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const PpeModel = require("../models/ppes.models");
const EmployeeModel = require("../models/employees.models");
const { StatusCodes } = require("http-status-codes");
const pdf = require('pdf-creator-node');
const fs = require('fs');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");


const storageEngine = multer.diskStorage({
  destination: './public/uploads/',
  // filename: function (req, file, fn) {
  //   fn(null, req.body.title + path.extname(file.originalname)); //+'-'+file.fieldname
  // },
});
const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 20000000 },
  fileFilter: function (req, file, callback)
  {
    validateFile(file, callback);
  },
}).single('file');

//cloudianry
cloudinary.config({
  cloud_name: 'dkf8mfcra',
  api_key: '934243125143259',
  api_secret: 'y-i2CniEEzeWNt7BUYjDMApfu24',
});

/**
 * @description let user add Ppe
 */

const addPpe = async (req, res, next) => {
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

    const { ppe, description } = req.body;

    //prepare object for storing ppe in db

    const prepObj = {
      _id: mongoose.Types.ObjectId(),
      ppe,
      description,
      _employeeId: employeeId,
      _created_by: user._id
    }

    const ppeSaved = await PpeModel.addPpes(prepObj);

    if (isEmpty(ppeSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Ppe is not saved yet"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: ppeSaved

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

const updatePpeById = async (req, res, next) => {
  try {

    const { ppeId } = req.params;

    const ppeFound = await PpeModel.getPpesById(ppeId);

    if (isEmpty(ppeFound)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Ppe Not found of this id"]

      })

    }

    const { ppe, description } = req.body;

    //prepare object for storing user in db
    const updateData = {}

    if (ppe) updateData["ppe"] = ppe;
    if (description) updateData["description"] = description;

    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedPpe = await PpeModel.updatePpesById(ppeId, updateData);

    if (isEmpty(updatedPpe)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Ppe is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedPpe

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

const getPpeListByEmployeeId = async (req, res, next) => {
  try {

    const { employeeId } = req.params;

    const employee = await EmployeeModel.getEmployeeById(employeeId);

    if (isEmpty(employee)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee Not found of this id"]

      })

    }

    const ppes = await PpeModel.getPpeListByEmployeeId(employeeId);

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: ppes ? ppes.length : 0,
      payload: ppes

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

const deletePpeById = async (req, res, next) => {
  try {

    const { ppeId } = req.params;

    const ppe = await PpeModel.getPpesById(ppeId);

    if (isEmpty(ppe)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["ppe Not found of this id"]

      })

    }

    const deletedPpeCount = await PpeModel.deletePpesById(ppeId);

    if (isEmpty(deletedPpeCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Ppe is deleted"]

      })

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedPpeCount
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

const exportPpe = async (req, res, next) => {
  try {

    const { employeeId } = req.params;

    const employee = await EmployeeModel.getEmployeeById(employeeId);
    if (isEmpty(employee)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Employee Not found of this id"]

      })

    };
    const ppes = await PpeModel.enlistAllPpess(employeeId);
    let result = [];
    const onlyPpes = ppes.map((p, i, ppes) =>
    {
     
      let newArray = p.ppe.split(',');
      result = result.concat(newArray);
    });

    // const uniquePpe = [...new Set(result)];
        
    const newArrayPPe = result.map((p,i) =>
    {
    
      return { name: p,id:i+1 };
    })
    console.log(newArrayPPe);
    const html = fs.readFileSync(__dirname+'/pdf.html', 'utf8');
           const options = {
  format: 'A3',
  orientation: 'portrait',
             border: '10mm',
   footer: {
            height: "40mm",
            contents: {
                first: '<div style="text-align: center;"><span>Note: MGS</span><br /><span>Distribution: Original: Company / Copy: Digita</span><br /><span>FORM SM-05 - ORIGINAL DOCUMENT</span><br /><span>Revision No.: 9</span><br /><span>Date: 01/14/2021</span><br /><span style="color: #444;">Reviewed: Designated Person (DP)</span><br /><span>Approved: CEO</span ><br /><span>page {{page}} of {{pages}}</span>',
                2: '<div style="text-align: center;"><span style="color: #444;">Reviewed: Designated Person (DP)</span><br /><span>Approved: CEO</span ><br /><span>page {{page}} of {{pages}}</span>', // Any page number is working. 1-based index
                default: '<div style="text-align: center;"><span style="color: #444;">Reviewed: Designated Person (DP)</span><br /><span>Approved: CEO</span ><br /><span>page {{page}} of {{pages}}</span>',
                last: 'Last Page'
            }
        }
};
    const document = {
      html: html,
      data: {
        employee: employee,
        ppe:newArrayPPe
      },
      path: __dirname+'/ppe.pdf',
      type: "",
    };
    pdf.create(document, options).then(async response =>
    {
      await cloudinary.uploader.upload(
        response.filename,
        {
          resource_type: 'auto',
          public_id: 'ppeUplaoder/' + uuidv4(),
          chunk_size: 6000000,
        },
        function (error, result)
        {
          if (error)
          {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              success: false,
              hasError: true,
              error: ["Internal Server Error"]

            });
             
          }
          return res.status(StatusCodes.OK).json({

            success: true,
            hasError: false,
            payload: result.url
          });
        }
      );


    }).catch(err =>
    {
      console.log(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        hasError: true,
        error: ["Internal Server Error"]

      });

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

  addPpe,
  updatePpeById,
  getPpeListByEmployeeId,
  deletePpeById,
  exportPpe

};
