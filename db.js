//destructuring the client obj. MongoClient helps to connect to db 
const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    //connect to a db
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/bookstore')
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err);
                return cb(err)
            })
    },
    //retrieve db connection after connecting
    getDb: () => dbConnection
}