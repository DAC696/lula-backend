const Client = require('../schemas/client');
const { sendCustomEvent } = require("../misc/helperFunctions")

/**
 * @description This will create new client
 * @param {Object} client 
 */

const addClient = async (client) => {
    try {

        const newClient = new Client(client);

        const clientCreated = await newClient.save();

        //whenever new client is added then emit an event
        if (clientCreated && clientCreated) {

            sendCustomEvent("clientAdded", clientCreated)

        }

        return clientCreated;

    } catch (error) {

        console.log(error)

    }
}

const getClientById = async (clientId) => {
    try {

        const client = await Client.findOne({ _id: clientId })
            .lean()

        return client;
    } catch (error) {
        console.log(error);
    }
}

const getClientByEmail = async (email) => {
    try {
        const client = await Client.findOne({ email })
            .lean()

        return client;
    } catch (error) {
        console.log(error);
    }
}

const updateClientById = async (clientId, objToBeUpdated) => {
    try {

        const updatedClient = await Client.findByIdAndUpdate({ _id: clientId }, objToBeUpdated, { upsert: true, new: true })
            .lean()

        //whenever client is updated then emit an event
        if (updatedClient && updatedClient) {

            sendCustomEvent("clientUpdated", updatedClient)

        }

        return updatedClient;
    } catch (error) {
        console.log(error);
    }
}

const deleteClientById = async (clientId) => {
    try {

        const deletedClient = await Client.deleteOne({ _id: clientId })

        return deletedClient.deletedCount;

    } catch (error) {
        console.log(error);
    }
}

const enlistAllClients = async () => {
    try {

        const clients = await Client.find()
            .lean()

        return clients;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {

    addClient,
    getClientById,
    updateClientById,
    deleteClientById,
    enlistAllClients,
    getClientByEmail

}