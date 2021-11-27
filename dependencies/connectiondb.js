//db connection
const mongoose = require("mongoose");
const config = require("./config");
// const LULA_DASHBOARD_APP_ENV = process.env.LULA_DASHBOARD_APP_ENV.trim();
const LULA_DASHBOARD_APP_ENV = 'production';
console.log("SERVER === ", LULA_DASHBOARD_APP_ENV)
const connection = () => {

  let dbName;

  let dbConnectionString;

  if (LULA_DASHBOARD_APP_ENV === 'production') {

    dbName = "LulaDashboard";
    dbConnectionString = `mongodb+srv://hashmat:test1234@lula-cluster.tyqix.mongodb.net/${dbName}?retryWrites=true&w=majority`
    // dbConnectionString = `mongodb+srv://hashmat:${config.MONGODB_ATLAS_PASSWORD}@lula-cluster.tyqix.mongodb.net/${dbName}?retryWrites=true&w=majority`
    console.log('production connected');

  } else {

    dbName = "LulaDashboard";
    dbConnectionString = `mongodb+srv://hashmat:test1234@lula-cluster.tyqix.mongodb.net/LulaDashboard?retryWrites=true&w=majority`
    //dbConnectionString = `mongodb+srv://hashmat:${config.MONGODB_ATLAS_PASSWORD}@lula-cluster.tyqix.mongodb.net/${dbName}?retryWrites=true&w=majority`

  }

  //db for environment 
  mongoose
    .connect(
      `${dbConnectionString}`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
    .then(() => {
      console.log('db connected')
    })
    .catch(err => {
      console.log('error ... in db connection ')
      console.log(err);

    });
}

mongoose.connection.on('disconnected', () => {

  console.log('db disconnected ');


});

mongoose.connection.on('error', err => {

  const { connectedUsers } = require('../socket');

  console.error(err);

  for (let i = 0; i < connectedUsers.length; i++) {

    const userSockets = connectedUsers[i];

    for (const userSocket in userSockets) {

      const socketsArr = userSockets[`${userSocket}`];

      for (const sock of socketsArr) {

        sock.emit('dbConnection', 'error');

      }

    }

  }
})

mongoose.connection.on('open', () => {
});
// using mongoose promise
mongoose.Promise = global.Promise;

module.exports = connection;

