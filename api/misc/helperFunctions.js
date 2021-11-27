const { connectedUsers } = require("../../socket");

/**
 *@description -> This Function Takes event name and payload and send to all clients connected currently  
 *@param - eventName (Server will generate event by this name and client will listen event by this name)
 *@param - payload (This payload will be received by all clients connected by using this event name listener)

 */

const sendCustomEvent = async (eventName, payload) => {
    try {
        //iterate through connected users
        for (let index = 0; index < connectedUsers.length; index++) {

            //GET SOCKET and emit
            const socket = connectedUsers[index];
            socket.emit(`${eventName}`, payload)

        }

    } catch (error) {
        console.log("******@ERROR IN EVENTS*********", error)
    }
}

module.exports = {
    sendCustomEvent
}