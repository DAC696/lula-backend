const mongoose = require("mongoose");
const { isEmpty } = require("../../utils/custom.validator")
const EmployeeModel = require("../models/employees.models");
const { StatusCodes } = require("http-status-codes");
const DepartmentModel = require("../models/departments.models");
const UnionModel = require("../models/unions.models");
const CourseModel = require("../models/courses.models");
const LocationModel = require("../models/locations.models");
const TrainingModel = require("../models/trainings.models");
const RoleModel = require("../models/roles.models");
const PpeModel = require("../models/ppes.models");
const NoteModel = require("../models/notes.models");
const WorkHistoryModel = require("../models/workHistories.models");
const AppraisalModel = require("../models/appraisals.models");
const bcrypt = require('bcryptjs');
const sendEmail = require("../misc/send-mail")
const _ = require("lodash")

/**
 * @description let user add Employee
 */

const addEmployee = async (req, res, next) => {
  try {

    //fetch used from token
    const user = req.userData;

    let {
       firstName, lastName, password, phoneNumber, email, address,
      homePhoneNumber,
      street,
      houseNumber,
      floorNumber,
      city,
      state,
      areaCode, profilePhoto,
      insurance, nationalID, passportNumber, dateOfBirth, gender, dateHired,
      dateReleased, cbu, status, employeeRole, roleId, locationId, departmentId, unionId,
      primaryFamilyMemberName, primaryFamilyMemberPhone, primaryFamilyMemberRelation,
      secondaryFamilyMemberName, secondaryFamilyMemberPhone, secondaryFamilyMemberRelation,
      tertiaryFamilyMemberName, tertiaryFamilyMemberPhone, tertiaryFamilyMemberRelation

    } = req.body;

    let empId;

    //EMPID must be unique
    const latestEmployeeInDb = await EmployeeModel.getLatestEmployee();
 
    if (latestEmployeeInDb) { 
      res.send(latestEmployeeInDb)
      empId = +latestEmployeeInDb.empId; 
      empId = _.padStart(++empId, 5, '0') 
    } else {
      empId = "000001";
    } 

    //check if employee exist by passport number or national id or insurance number
    const isEmployeeExists = await EmployeeModel.getEmployeeByPassportOrInsuranceOrNationalID(passportNumber, nationalID, insurance, email)

    if (!isEmpty(isEmployeeExists)) {

      return res.status(StatusCodes.CONFLICT).json({

        success: false,
        hasError: true,
        error: ["This Employee Passport | insurance | national ID already Exist"]

      })

    }

    const isLocationExists = await LocationModel.getLocationById(locationId);

    if (isEmpty(isLocationExists)) {

      return res.status(StatusCodes.CONFLICT).json({

        success: false,
        hasError: true,
        error: ["This Location Id does not Exist"]

      })

    }

    let isUnionExists

    if (unionId) {
      isUnionExists = await UnionModel.getUnionById(unionId);

      if (isEmpty(isUnionExists)) {

        return res.status(StatusCodes.CONFLICT).json({

          success: false,
          hasError: true,
          error: ["This Union Id does not Exist"]

        })

      }
    }

    const isDepartmentExists = await DepartmentModel.getDepartmentById(departmentId);

    if (isEmpty(isDepartmentExists)) {

      return res.status(StatusCodes.CONFLICT).json({

        success: false,
        hasError: true,
        error: ["This Department Id does not Exist"]

      })

    }

    const isRoleExists = await RoleModel.getRoleById(roleId);

    if (isEmpty(isRoleExists)) {

      return res.status(StatusCodes.CONFLICT).json({

        success: false,
        hasError: true,
        error: ["This Role Id does not Exist"]

      })

    }

    //generate employeeId prior so that it can be used in trainings
    const employeeId = mongoose.Types.ObjectId();

    const mandatoryCourses = await CourseModel.getMandatoryCoursesByEmployeeRole(employeeRole)

    for (let i = 0; i < mandatoryCourses.length; i++) {

      const course = mandatoryCourses[i];

      const courseId = course._id;

      const trainObj = {

        _id: mongoose.Types.ObjectId(),
        _courseId: courseId,
        trainingStatus: "Outstanding",
        _employeeId: employeeId,
        _created_by: user._id

      }

      const trainingSaved = await TrainingModel.addTraining(trainObj, {

        courseName: course.courseName,
        courseType: course.courseType,
        isMandatory: course.isMandatory,
        validDate: course.validDate,
        expiryDate: course.expiryDate

      });


    }

    const salt = await bcrypt.genSalt(10);

    let passwordHash = await bcrypt.hash(password, salt);

    //prepare object for storing employee in db
    const prepObj = {

      _id: employeeId,
      empId, firstName, lastName, password: passwordHash, phoneNumber, email, address,
      homePhoneNumber,
      street,
      houseNumber,
      floorNumber,
      city,
      state,
      areaCode, profilePhoto,
      insurance, nationalID, passportNumber, dateOfBirth, gender, dateHired,
      dateReleased, cbu, status, employeeRole, _roleId: roleId, _locationId: locationId, _departmentId: departmentId, _unionId: unionId,
      primaryFamilyMemberName, primaryFamilyMemberPhone, primaryFamilyMemberRelation,
      secondaryFamilyMemberName, secondaryFamilyMemberPhone, secondaryFamilyMemberRelation,
      tertiaryFamilyMemberName, tertiaryFamilyMemberPhone, tertiaryFamilyMemberRelation,
      _created_by: user._id

    }

    const prepObjForEvent = {

      //location for event
      locName: isLocationExists.locName,
      email: isLocationExists.email,
      locSign: isLocationExists.locSign,
      locStatus: isLocationExists.locStatus,
      //department for event
      departmentName: isDepartmentExists.departmentName,
      //union for event
      unionName: isUnionExists?isUnionExists.unionName:undefined,
      description: isUnionExists?isUnionExists.description:undefined,
      unionName: isUnionExists.unionName || '',
      description: isUnionExists.description || '',

      roleName: isRoleExists.roleName,
      permissionName: isRoleExists._permissionId.permissionName,
      permissions: isRoleExists._permissionId.permissions

    }

    let employeeSaved = await EmployeeModel.addEmployee(prepObj, prepObjForEvent);


    if (isEmpty(employeeSaved)) {

      return res.status(StatusCodes.BAD_GATEWAY).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Employee is not saved yet"]

      })

    }

    const respObj = {
      _id: employeeId,
      firstName: employeeSaved.firstName,
      lastName: employeeSaved.lastName,
      dateOfBirth: employeeSaved.dateOfBirth,
      phoneNumber: employeeSaved.phoneNumber,
      email: employeeSaved.email,
      address: employeeSaved.address,
      insurance: employeeSaved.insurance,
      nationalID: employeeSaved.nationalID,
      passportNumber: employeeSaved.passportNumber,
      gender: employeeSaved.gender,
      dateHired: employeeSaved.dateHired,
      dateReleased: employeeSaved.dateReleased,
      cbu: employeeSaved.cbu,
      status: employeeSaved.status,
      employeeRole: employeeSaved.employeeRole,
      primaryFamilyMemberName, primaryFamilyMemberPhone, primaryFamilyMemberRelation,
      secondaryFamilyMemberName, secondaryFamilyMemberPhone, secondaryFamilyMemberRelation,
      tertiaryFamilyMemberName, tertiaryFamilyMemberPhone, tertiaryFamilyMemberRelation,

    }

    if (unionId)
      respObj["_unionId"] = {

        unionName: prepObjForEvent.unionName,
        description: prepObjForEvent.description

      }

    respObj["_departmentId"] = {

      departmentName: prepObjForEvent.departmentName

    }

    respObj["_locationId"] = {

      locName: prepObjForEvent.locName,
      locId: prepObjForEvent.locId,
      email: prepObjForEvent.email,
      locSign: prepObjForEvent.locSign,
      locStatus: prepObjForEvent.locStatus

    }

    respObj["_roleId"] = {

      roleName: prepObjForEvent.roleName,
      _permissionId: {

        permissionName: prepObjForEvent.permissionName,
        permissions: prepObjForEvent.permissions

      }

    }

    const emailSent = await sendEmail(email, password, "newEmployeeTemplate")

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: respObj

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

/**
 * @description This will get Employee details by employee id
 * @param {ObjectId} employeeId
 */
const getEmployeeById = async (req, res, next) => {
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


    const trainings = await TrainingModel.getTrainingListByEmployeeId(employeeId)

    employee["trainings"] = trainings

    const ppes = await PpeModel.enlistAllPpess(employeeId)

    employee["ppes"] = ppes

    const notes = await NoteModel.enlistAllNotess(employeeId)

    employee["notes"] = notes

    const workHistories = await WorkHistoryModel.enlistAllWorkHistorys(employeeId)

    employee["workHistories"] = workHistories;

    const appraisals = await AppraisalModel.enlistAllAppraisals(employeeId)

    employee["appraisals"] = appraisals;

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: employee

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

const deleteEmployeeById = async (req, res, next) => {
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

    const deletedEmployeeCount = await EmployeeModel.deleteEmployeeById(employeeId);

    if (isEmpty(deletedEmployeeCount)) {

      return res.status(StatusCodes.OK).json({

        success: false,
        hasError: true,
        error: ["No Employee is deleted"]

      })

    }

    const trainingsDeleted = await TrainingModel.deleteTrainingsByEmployeeId(employeeId)

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      payload: {
        deletedCount: deletedEmployeeCount
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

const updateEmployeeById = async (req, res, next) => {
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

    let {   firstName, lastName, password, roleId, phoneNumber, email, address,
      homePhoneNumber,
      street,
      houseNumber,
      floorNumber,
      city,
      state,
      areaCode, profilePhoto,
      insurance, nationalID, passportNumber, dateOfBirth, gender, dateHired,
      dateReleased, cbu, status, locationId, departmentId, unionId,
      primaryFamilyMemberName, primaryFamilyMemberPhone, primaryFamilyMemberRelation,
      secondaryFamilyMemberName, secondaryFamilyMemberPhone, secondaryFamilyMemberRelation,
      tertiaryFamilyMemberName, tertiaryFamilyMemberPhone, tertiaryFamilyMemberRelation

    } = req.body;

    //prepare object for storing user in db
    const updateData = {}
 
    if (firstName) updateData["firstName"] = firstName;
    if (lastName) updateData["lastName"] = lastName;
    if (phoneNumber) updateData["phoneNumber"] = phoneNumber;

    if (email) {

      const employeeFoundByEmail = await EmployeeModel.getEmployeeByEmail(email)

      if (employeeFoundByEmail && employeeFoundByEmail._id.toString() !== employeeId.toString()) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Email already exist"]

        })

      }else{
        updateData["email"] = email
      }

    }

    if (address) updateData["address"] = address;
    if (profilePhoto) updateData["profilePhoto"] = profilePhoto;
    if (insurance !== undefined && insurance !== null && insurance !== "undefined" && insurance !== "null") updateData["insurance"] = insurance;
    if (nationalID !== undefined && nationalID !== null && nationalID !== "undefined" && nationalID !== "null") updateData["nationalID"] = nationalID;
    if (passportNumber !== undefined && passportNumber !== null && passportNumber !== "undefined" && passportNumber !== "null") updateData["passportNumber"] = passportNumber;
    if (dateOfBirth !== undefined && dateOfBirth !== null && dateOfBirth !== "undefined" && dateOfBirth !== "null") updateData["dateOfBirth"] = dateOfBirth;
    if (gender !== undefined && gender !== null && gender !== "undefined" && gender !== "null") updateData["gender"] = gender;
    if (dateHired !== undefined && dateHired !== null && dateHired !== "undefined" && dateHired !== "null") updateData["dateHired"] = dateHired;
    if (dateReleased !== undefined && dateReleased !== null && dateReleased !== "undefined" && dateReleased !== "null") updateData["dateReleased"] = dateReleased;
    if (cbu !== undefined && cbu !== null && cbu !== "undefined" && cbu !== "null") updateData["cbu"] = cbu;
    if (status !== undefined && status !== null && status !== "undefined" && status !== "null") updateData["status"] = status;
    if (street !== undefined && street !== null && street !== "undefined" && street !== "null") updateData["street"] = street;
    if (areaCode !== undefined && areaCode !== null && areaCode !== "undefined" && areaCode !== "null") updateData["areaCode"] = areaCode;
    if (floorNumber !== undefined && floorNumber !== null && floorNumber !== "undefined" && floorNumber !== "null") updateData["floorNumber"] = floorNumber;
    if (houseNumber !== undefined && houseNumber !== null && houseNumber !== "undefined" && houseNumber !== "null") updateData["houseNumber"] = houseNumber;
    if (homePhoneNumber !== undefined && homePhoneNumber !== null && homePhoneNumber !== "undefined" && homePhoneNumber !== "null") updateData["homePhoneNumber"] = homePhoneNumber;
    if (city !== undefined && city !== null && city !== "undefined" && city !== "null") updateData["city"] = city;
    if (state !== undefined && state !== null && state !== "undefined" && state !== "null") updateData["state"] = state;

    if (password) {

      const salt = await bcrypt.genSalt(10);

      let passwordHash = await bcrypt.hash(password, salt);

      updateData["password"] = passwordHash

    };

    if (primaryFamilyMemberName !== undefined && primaryFamilyMemberName !== null && primaryFamilyMemberName !== "undefined" && primaryFamilyMemberName !== "null") updateData["primaryFamilyMemberName"] = primaryFamilyMemberName;
    if (primaryFamilyMemberPhone !== undefined && primaryFamilyMemberPhone !== null && primaryFamilyMemberPhone !== "undefined" && primaryFamilyMemberPhone !== "null") updateData["primaryFamilyMemberPhone"] = primaryFamilyMemberPhone;
    if (primaryFamilyMemberRelation !== undefined && primaryFamilyMemberRelation !== null && primaryFamilyMemberRelation !== "undefined" && primaryFamilyMemberRelation !== "null") updateData["primaryFamilyMemberRelation"] = primaryFamilyMemberRelation;

    if (secondaryFamilyMemberName !== undefined && secondaryFamilyMemberName !== null && secondaryFamilyMemberName !== "undefined" && secondaryFamilyMemberName !== "null") updateData["secondaryFamilyMemberName"] = secondaryFamilyMemberName;
    if (secondaryFamilyMemberPhone !== undefined && secondaryFamilyMemberPhone !== null && secondaryFamilyMemberPhone !== "undefined" && secondaryFamilyMemberPhone !== "null") updateData["secondaryFamilyMemberPhone"] = secondaryFamilyMemberPhone;
    if (secondaryFamilyMemberRelation !== undefined && secondaryFamilyMemberRelation !== null && secondaryFamilyMemberRelation !== "undefined" && secondaryFamilyMemberRelation !== "null") updateData["secondaryFamilyMemberRelation"] = secondaryFamilyMemberRelation;

    if (tertiaryFamilyMemberName !== undefined && tertiaryFamilyMemberName !== null && tertiaryFamilyMemberName !== "undefined" && tertiaryFamilyMemberName !== "null") updateData["tertiaryFamilyMemberName"] = tertiaryFamilyMemberName;
    if (tertiaryFamilyMemberPhone !== undefined && tertiaryFamilyMemberPhone !== null && tertiaryFamilyMemberPhone !== "undefined" && tertiaryFamilyMemberPhone !== "null") updateData["tertiaryFamilyMemberPhone"] = tertiaryFamilyMemberPhone;
    if (tertiaryFamilyMemberRelation !== undefined && tertiaryFamilyMemberRelation !== null && tertiaryFamilyMemberRelation !== "undefined" && tertiaryFamilyMemberRelation !== "null") updateData["tertiaryFamilyMemberRelation"] = tertiaryFamilyMemberRelation;

    if (locationId) {

      const locationFound = await LocationModel.getLocationById(locationId)

      if (isEmpty(locationFound)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Location Id does not Exist"]

        })

      } else {

        updateData["_locationId"] = locationId;

      }
    }

    if (unionId !== null && unionId !== undefined) {

      const unionFound = await UnionModel.getUnionById(unionId)

      if (isEmpty(unionFound)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Union Id does not Exist"]

        })

      } else {

        updateData["_unionId"] = unionId;

      }
    } else if (unionId === null) {
      updateData["_unionId"] = unionId;
    }

    if (departmentId) {

      const departmentFound = await DepartmentModel.getDepartmentById(departmentId)

      if (isEmpty(departmentFound)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Department Id does not Exist"]

        })

      } else {

        updateData["_departmentId"] = departmentId;

      }
    }

    if (roleId) {

      const roleFound = await RoleModel.getRoleById(roleId)

      if (isEmpty(roleFound)) {

        return res.status(StatusCodes.NOT_FOUND).json({

          success: false,
          hasError: true,
          error: ["Role Id does not Exist"]

        })

      } else {

        updateData["_roleId"] = roleId;

      }
    }
    
    if (!Object.keys(updateData).length) {

      return res.status(StatusCodes.FORBIDDEN).json({

        success: false,
        hasError: true,
        error: ["Minimum One field is required to update"]

      })

    }

    const updatedEmployee = await EmployeeModel.updateEmployeeById(employeeId, updateData);

    if (isEmpty(updatedEmployee)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Something Went Wrong. Employee is not updated"]

      })

    }

    return res.status(StatusCodes.CREATED).json({

      success: true,
      hasError: false,
      payload: updatedEmployee

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

const enlistAllEmployees = async (req, res, next) => {
  try {

    const employees = await EmployeeModel.enlistAllEmployees();

    const tempArr = [];

    for (const employee of employees) {

      const employeeId = employee._id

      const trainings = await TrainingModel.getTrainingListByEmployeeId(employeeId);

      employee.trainings = trainings

      tempArr.push(employee)

    }

    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: tempArr ? tempArr.length : 0,
      payload: tempArr

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

const enlistAllEmployeesByLocationId = async (req, res, next) => {
  try {

    const { locationId } = req.params;

    const location = await LocationModel.getLocationById(locationId);

    if (isEmpty(location)) {

      return res.status(StatusCodes.NOT_FOUND).json({

        success: false,
        hasError: true,
        error: ["Location Not found of this id"]

      })

    }

    let employees = await EmployeeModel.enlistAllEmployeesByLocationId(locationId);

    const tempArr = [];

    for (const employee of employees) {

      const employeeId = employee._id

      const trainings = await TrainingModel.getTrainingListByEmployeeId(employeeId);

      employee.trainings = trainings

      tempArr.push(employee)

    }


    return res.status(StatusCodes.OK).json({

      success: true,
      hasError: false,
      total: tempArr ? tempArr.length : 0,
      payload: tempArr

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

  addEmployee,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployeeById,
  enlistAllEmployees,
  enlistAllEmployeesByLocationId

};
