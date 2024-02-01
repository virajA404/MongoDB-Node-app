//destructuring the client obj. MongoClient helps to connect to db 
import { MongoClient } from 'mongodb';

let dbConnection;

export const connectToDb = async (cb) => {
    try {
        //connecting to db
        const client = await MongoClient.connect('mongodb://localhost:27017/bookstore');
        dbConnection = client.db();
        await cb();
    } catch (err) {
        console.log(err);
        await cb(err);
    }
};
//return db connection after connecting
export const getDb = () => dbConnection;