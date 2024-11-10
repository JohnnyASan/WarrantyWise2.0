const mongoClient = require('mongodb').MongoClient;
const dotenv = require("dotenv");

dotenv.config();
const connStr = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5rwti.mongodb.net/`;

let _db;


const initDb = callback => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    mongoClient.connect(connStr)
    .then(client => {
        _db = client;
        callback(null, _db);
    })
    .catch(err => {
        throw new MongoError(err);
    });
};
  
const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb
}
