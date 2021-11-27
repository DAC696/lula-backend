const connectedUsers = [];
const { isEmpty } = require("./utils/custom.validator");

const UserModel = require("./api/models/users.models");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const chalk = require("chalk");

let connection = null;
class Socket {
  constructor() {
    this.socket = null;
  }
  connect(server) {

    const io = require("socket.io")(server);

    io.set("origins", "*:*");

    //prior to connection
    io.use(async (socket, next) => {
      try {
        console.log("socket connected")
        connectedUsers.push(socket);

        next();
      } catch (err) { }
    });

    io.on("connection", (socket) => {

      console.log("********** connected  socket ", socket.id);

      socket.on("disconnect", function () {

        console.log("********* Disconnecting ..", socket.id);

        //delete the connected user from the connectedUser list maintained in server

        // delete connectedUsers[socket.userId]

        //loop for user Id sockets
        for (var i = 0; i < connectedUsers.length; i++) {

          if (connectedUsers[i] === socket) {

            connectedUsers.splice(i, 1);

          }

        }

      });

      this.socket = socket;
    });
  }
  emit(event, data) {
    this.socket.emit(event, data);
  }
  static init(server) {
    if (!connection) {
      connection = new Socket();
      connection.connect(server);
    }
  }
  static getConnection() {
    if (connection) {
      return connection;
    }
  }
}

module.exports = {
  connect: Socket.init,
  connection: Socket.getConnection,
  connectedUsers,
};
