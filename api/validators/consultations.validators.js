const { isEmpty, isString, isValidObjectId, isEmail, isNumber } = require('../../utils/custom.validator')

const { StatusCodes } = require('http-status-codes');

const addConsultationValidator = (req, res, next) => {
    try {

        const errors = {};

        const {

            consultationType,
            recordable,
            companyName,
            consultationDate,
            consultationTime,
            reportDate,
            locationId,
            personWithInjuryOrPathalogy,
            crewPosition, //role id
            phoneNumber,
            initialTreatmentProvidedBy,
            isEmployee,
            nonEmployeeAddressAndPhoneNumber,
            medicalRadioConsulation,
            time,
            treatmentDate,
            doctorName,
            didItOccurAtWorkingHours,
            disembarkmentDate,
            embarkmentDate,
            diseaseDetails,
            medicOrders,
            location,
            address,
            employeeId

        } = req.body;

        if (isEmpty(recordable)) {

            errors.recordable = 'recordable is required.';

        } else if (!isString(recordable)) {

            errors.recordable = 'recordable is not valid.';

        }

        if (isEmpty(companyName)) {

            errors.companyName = 'companyName is required.';

        } else if (!isString(companyName)) {

            errors.companyName = 'companyName is not valid.';

        }

        if (isEmpty(address)) {

            errors.address = 'address is required.';

        } else if (!isString(address)) {

            errors.address = 'address is not valid.';

        }

        if (isEmpty(consultationType)) {

            errors.consultationType = 'consultationType is required.';

        } else if (!isString(consultationType)) {

            errors.consultationType = 'consultationType is not valid.';

        }

        if (isEmpty(consultationDate)) {

            errors.consultationDate = 'consultationDate is required.';

        } else if (!isString(consultationDate)) {

            errors.consultationDate = 'consultationDate is not valid String.';

        }

        if (isEmpty(consultationTime)) {

            errors.consultationTime = 'consultationTime is required.';

        } else if (!isString(consultationTime)) {

            errors.consultationTime = 'consultationDate is not valid String.';

        }

        if (isEmpty(reportDate)) {

            errors.reportDate = 'reportDate is required.';

        } else if (!isString(reportDate)) {

            errors.reportDate = 'reportDate is not valid.';

        }

        if (isEmpty(locationId)) {

            errors.locationId = 'locationId is required.';

        } else if (!isValidObjectId(locationId)) {

            errors.locationId = 'locationId is not valid Object Id.';

        }

        if (isEmpty(personWithInjuryOrPathalogy)) {

            errors.personWithInjuryOrPathalogy = 'personWithInjuryOrPathalogy is required.';

        } else if (!isString(personWithInjuryOrPathalogy)) {

            errors.personWithInjuryOrPathalogy = 'personWithInjuryOrPathalogy is not valid string.';

        }

        if (isEmpty(crewPosition)) {

            errors.crewPosition = 'crewPosition required.';

        } else if (!isValidObjectId(crewPosition)) {

            errors.crewPosition = 'crewPosition not valid object id.';

        }

        if (isEmpty(phoneNumber)) {

            errors.phoneNumber = 'phoneNumber required.';

        } else if (!isString(phoneNumber)) {

            errors.phoneNumber = 'phoneNumber not valid.';

        }

        if (isEmpty(initialTreatmentProvidedBy)) {

            errors.initialTreatmentProvidedBy = 'initialTreatmentProvidedBy required.';

        } else if (!isString(initialTreatmentProvidedBy)) {

            errors.initialTreatmentProvidedBy = 'initialTreatmentProvidedBy not valid.';

        }

        if (isEmpty(isEmployee)) {

            errors.isEmployee = 'isEmployee required.';

        } else if (!isString(isEmployee)) {

            errors.isEmployee = 'isEmployee not valid.';

        }

        if (nonEmployeeAddressAndPhoneNumber && !isString(nonEmployeeAddressAndPhoneNumber)) {

            errors.nonEmployeeAddressAndPhoneNumber = 'nonEmployeeAddressAndPhoneNumber not valid.';

        }

        if (isEmpty(medicalRadioConsulation)) {

            errors.medicalRadioConsulation = 'medicalRadioConsulation required.';

        } else if (!isString(medicalRadioConsulation)) {

            errors.medicalRadioConsulation = 'medicalRadioConsulation not valid.';

        }

        if (isEmpty(time)) {

            errors.time = 'time required.';

        } else if (!isString(time)) {

            errors.time = 'time not valid.';

        }

        if (isEmpty(treatmentDate)) {

            errors.treatmentDate = 'treatmentDate required.';

        } else if (!isString(treatmentDate)) {

            errors.treatmentDate = 'treatmentDate not valid.';

        }

        if (isEmpty(doctorName)) {

            errors.doctorName = 'doctorName required.';

        } else if (!isString(doctorName)) {

            errors.doctorName = 'doctorName not valid.';

        }

        if (isEmpty(didItOccurAtWorkingHours)) {

            errors.didItOccurAtWorkingHours = 'didItOccurAtWorkingHours required.';

        } else if (!isString(didItOccurAtWorkingHours)) {

            errors.didItOccurAtWorkingHours = 'didItOccurAtWorkingHours not valid.';

        }

        if (disembarkmentDate !== undefined && disembarkmentDate !== null && !isString(disembarkmentDate)) {

            errors.disembarkmentDate = 'disembarkmentDate not valid.';

        }

        if (isEmpty(embarkmentDate)) {

            errors.embarkmentDate = 'embarkmentDate required.';

        } else if (!isString(embarkmentDate)) {

            errors.embarkmentDate = 'embarkmentDate not valid.';

        }

        if (isEmpty(diseaseDetails)) {

            errors.diseaseDetails = 'diseaseDetails required.';

        } else if (!isString(diseaseDetails)) {

            errors.diseaseDetails = 'diseaseDetails not valid.';

        }

        if (isEmpty(medicOrders)) {

            errors.medicOrders = 'medicOrders required.';

        } else if (!isString(medicOrders)) {

            errors.medicOrders = 'medicOrders not valid.';

        }

        if (employeeId && !isValidObjectId(employeeId)) {

            errors.employeeId = 'Employee Id is not valid object id.';

        }

        if (isEmpty(location)) {

            errors.location = 'Location is required.';

        } else if (!isString(location)) {

            errors.location = 'Location Id is not valid location.';

        }


        //check error object, if there's an error then it's length will not be zero
        if (Object.keys(errors).length > 0) {

            //return errors in array
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                hasError: true,
                error: [errors]
            })

        } else {

            //call next handler
            next();

        }

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

            message: 'Internal Server Error',
            success: false,
            hasError: true,
            error: [error]

        })
    }
}

/** 
* @Description : This handler will be used for both, get Consultation by id and delete Consultation
* @params {mongodb generated ObjectId} ConsultationId
*/

const getConsultationByIdValidator = (req, res, next) => {
    try {

        const errors = {};

        const { consultationId } = req.params;

        if (isEmpty(consultationId)) {

            errors.consultationId = 'consultation Id is required.';

        } else if (!isValidObjectId(consultationId)) {

            errors.consultationId = 'consultation Id is not valid object id.';

        }

        //check error object, if there's an error then it's length will not be zero
        if (Object.keys(errors).length > 0) {

            //return errors in array
            return res.status(StatusCodes.BAD_REQUEST).json({

                success: false,
                hasError: true,
                error: [errors]

            })

        } else {

            //call next handler
            next();

        }

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

            message: 'Internal Server Error',
            success: false,
            hasError: true,
            error: [error]

        })
    }
}

const updateConsultationByIdValidator = (req, res, next) => {
    try {
        const errors = {};

        const { consultationId } = req.params;

        if (isEmpty(consultationId)) {

            errors.consultationId = 'consultationId is required.';

        } else if (!isValidObjectId(consultationId)) {

            errors.consultationId = 'consultationId is not valid object id.';

        }

        const {

            recordable,
            consultationType,
            companyName,
            consultationDate,
            consultationTime,
            reportDate,
            locationId,
            personWithInjuryOrPathalogy,
            crewPosition,
            phoneNumber,
            initialTreatmentProvidedBy,
            isEmployee,
            nonEmployeeAddressAndPhoneNumber,
            medicalRadioConsulation,
            time,
            treatmentDate,
            doctorName,
            didItOccurAtWorkingHours,
            disembarkmentDate,
            embarkmentDate,
            diseaseDetails,
            medicOrders,
            location,
            address,
            employeeId

        } = req.body;

        if (recordable && !isString(recordable)) {

            errors.recordable = 'recordable is not valid.';

        }

        if (companyName && !isString(companyName)) {

            errors.companyName = 'companyName is not valid.';

        }

        if (address && !isString(address)) {

            errors.address = 'address is not valid.';

        }

        if (consultationType && !isString(consultationType)) {

            errors.consultationType = 'consultationType is not valid.';

        }

        if (consultationDate && !isString(consultationDate)) {

            errors.consultationDate = 'consultationDate is not valid String.';

        }

        if (consultationTime && !isString(consultationTime)) {

            errors.consultationTime = 'consultationDate is not valid String.';

        }

        if (reportDate && !isString(reportDate)) {

            errors.reportDate = 'reportDate is not valid.';

        }

        if (locationId && !isValidObjectId(locationId)) {

            errors.locationId = 'locationId is not valid Object Id';

        }

        if (personWithInjuryOrPathalogy && !isString(personWithInjuryOrPathalogy)) {

            errors.personWithInjuryOrPathalogy = 'personWithInjuryOrPathalogy is not valid string.';

        }

        if (crewPosition && !isValidObjectId(crewPosition)) {

            errors.crewPosition = 'crewPosition not valid object id.';

        }

        if (phoneNumber && !isString(phoneNumber)) {

            errors.phoneNumber = 'phoneNumber not valid.';

        }

        if (initialTreatmentProvidedBy && !isString(initialTreatmentProvidedBy)) {

            errors.initialTreatmentProvidedBy = 'initialTreatmentProvidedBy not valid.';

        }

        if (isEmployee && !isString(isEmployee)) {

            errors.isEmployee = 'isEmployee not valid.';

        }

        if (nonEmployeeAddressAndPhoneNumber && !isString(nonEmployeeAddressAndPhoneNumber)) {

            errors.nonEmployeeAddressAndPhoneNumber = 'nonEmployeeAddressAndPhoneNumber not valid.';

        }

        if (medicalRadioConsulation && !isString(medicalRadioConsulation)) {

            errors.medicalRadioConsulation = 'medicalRadioConsulation not valid.';

        }

        if (time && !isString(time)) {

            errors.time = 'time not valid.';

        }

        if (treatmentDate && !isString(treatmentDate)) {

            errors.treatmentDate = 'treatmentDate not valid.';

        }

        if (doctorName && !isString(doctorName)) {

            errors.doctorName = 'doctorName not valid.';

        }

        if (didItOccurAtWorkingHours && !isString(didItOccurAtWorkingHours)) {

            errors.didItOccurAtWorkingHours = 'didItOccurAtWorkingHours not valid.';

        }

        if (disembarkmentDate !== null && disembarkmentDate !== undefined && !isString(disembarkmentDate)) {

            errors.disembarkmentDate = 'disembarkmentDate not valid.';

        }

        if (embarkmentDate && !isString(embarkmentDate)) {

            errors.embarkmentDate = 'embarkmentDate not valid.';

        }

        if (diseaseDetails && !isString(diseaseDetails)) {

            errors.diseaseDetails = 'diseaseDetails not valid.';

        }

        if (medicOrders && !isString(medicOrders)) {

            errors.medicOrders = 'medicOrders not valid.';

        }

        if (employeeId && !isValidObjectId(employeeId)) {

            errors.employeeId = 'Employee Id is not valid objecd.';

        }

        if (location && !isString(location)) {

            errors.location = 'Location is not valid string.';

        }


        //check error object, if there's an error then it's length will not be zero
        if (Object.keys(errors).length > 0) {

            //return errors in array
            return res.status(StatusCodes.BAD_REQUEST).json({

                success: false,
                hasError: true,
                error: [errors]

            })

        } else {

            //call next handler
            next();

        }

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

            message: 'Internal Server Error',
            success: false,
            hasError: true,
            error: [error]

        })
    }
}

module.exports = {

    addConsultationValidator,
    getConsultationByIdValidator,
    updateConsultationByIdValidator

}