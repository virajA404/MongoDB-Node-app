//destructuring the client obj. MongoClient helps to connect to db 
import { MongoClient } from 'mongodb';

let dbConnection;

export const connectToDb = async (cb) => {
    try {
        //connecting to db
        const client = await MongoClient.connect('mongodb+srv://abeywardana21:<password>@cluster0.e6gjxfg.mongodb.net/?retryWrites=true&w=majority');
        dbConnection = client.db();
        await cb();
    } catch (err) {
        console.log(err);
        await cb(err);
    }
};
//return db connection after connecting
export const getDb = () => dbConnection;