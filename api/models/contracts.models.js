const Contract = require('../schemas/contract');
const { sendCustomEvent } = require("../misc/helperFunctions")

/**
 * @description This will create new contract
 * @param {Object} contract 
 */

const addContract = async (contract, eventObj) => {
    try {

        const newContract = new Contract(contract);

        let contractCreated = await newContract.save();

        //whenever new contract is added then emit an event
        if (contractCreated && contractCreated) {

            sendCustomEvent("contractAdded", eventObj)

        }

        return contractCreated;

    } catch (error) {

        console.log(error)

    }
}

const getContractById = async (contractId) => {
    try {

        const contract = await Contract.findOne({ _id: contractId })
            .populate('_clientId')
            .populate('_services')
            .lean()

        return contract;
    } catch (error) {
        console.log(error);
    }
}

const updateContractById = async (contractId, objToBeUpdated) => {
    try {

        const updatedContract = await Contract.findByIdAndUpdate({ _id: contractId }, objToBeUpdated, { upsert: true, new: true })
            .populate('_clientId')
            .populate('_services')
            .lean()

        //whenever  contract is updated then emit an event
        if (updatedContract && updatedContract) {

            sendCustomEvent("contractUpdated", updatedContract)

        }

        return updatedContract;
    } catch (error) {
        console.log(error);
    }
}

const deleteContractById = async (contractId) => {
    try {

        const deletedContract = await Contract.deleteOne({ _id: contractId })

        //whenever  contract is deleted then emit an event
        if (deletedContract && deletedContract.deletedCount) {

            sendCustomEvent("contractDeleted", { contractId })

        }

        return deletedContract.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllContracts = async () => {
    try {

        const contracts = await Contract.find()
            .populate('_clientId')
            .populate('_services')
            .lean()

        return contracts;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllContractsByClientId = async (clientId) => {
    try {

        const contracts = await Contract.find({ _clientId: clientId })
            .populate('_clientId')
            .populate('_services')
            .lean()

        return contracts;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addContract,
    getContractById,
    updateContractById,
    deleteContractById,
    enlistAllContracts,
    enlistAllContractsByClientId

}