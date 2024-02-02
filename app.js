import express from "express";
import { connectToDb, getDb } from "./db.js";
import { ObjectId } from "mongodb";


//init app & middleware
const app = express();

//connecting to db
let db;

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log("app listening on port 3000");
        });
        db = getDb();
    }
});

//Fetch all the books
app.get("/books", async (req, res) => {
    let books = [];

    try {
        const cursor = await db.collection("books").find().sort({ author: 1 });

        await cursor.forEach((book) => {
            books.push(book);
        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: "Could not fetch the documents" });
    }

    //OLD SYNTAX
    // let books = [];
    // db.collection('books')
    //     .find() //cursor toArray forEach
    //     .sort({author: 1})
    //     .forEach(book => books.push(book))
    //     .then(() => {
    //         res.status(200).json(books)
    //     })
    //     .catch(() => {
    //         res.status(500).json({error:'Could not fetch the documents'})
    //     })
});


