import express from "express";
import { connectToDb, getDb } from "./db.js";
import { ObjectId } from "mongodb";
import bodyParser from "body-parser";


//init app & middleware
const app = express();

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));


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

//fetch one document(book)
// app.get('/books/:id', (req,res) => {

//     if(ObjectId.isValid(req.params.id)){
//         db.collection('books')
//         .findOne({_id: new ObjectId(req.params.id)})
//         .then(doc => {
//             res.status(200).json(doc) 
//         })
//         .catch(err => {
//             res.status(500).json({error: 'Could not fetch the document'})
//         })
//     }else{
//         res.status(500).json({error: 'Not valid document id'})
//     }
// })

app.get('/books/:id', async (req, res) => {
    try {
        //checking if the id parameter is valid
        if (ObjectId.isValid(req.params.id)) {
            //getting the book matches with the id to doc variable
            const doc = await db.collection('books').findOne({ _id: new ObjectId(req.params.id) });
                res.status(200).json(doc);
        } else {
            res.status(500).json({ error: 'Not valid document id' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch the document' });
    }
});


//post request - adding a book to db
// app.post('/books', (req, res) => {
//     const book = req.body;

//     db.collection('books')
//         .insertOne(book)
//         .then(result => {
//             res.status(201).json(result)
//         })
//         .catch(err => {
//             res.status(500).json({err: 'Could not create a new document'})
//         })
// })
app.post('/books', async (req, res) => {

    try {
        const book = req.body;
        const newBook = await db.collection('books').insertOne(book);
        res.status(201).json(newBook);
    } catch {
        res.status(500).json({ err: 'Could not create a new document' })
    }

});


//delete request - deleting a book
//OLD SYNTAX
// app.delete('/books/:id', async (req, res) => {
//     if (ObjectId.isValid(req.params.id)) {
//         db.collection('books')
//             .deleteOne({ _id: new ObjectId(req.params.id) })
//             .then(doc => {
//                 res.status(200).json(doc)
//             })
//             .catch(err => {
//                 res.status(500).json({ error: 'Could not delete the document' })
//             })
//     } else {
//         res.status(500).json({ error: 'Not valid document id' })
//     }
// });

app.delete('/books/:id', async (req, res) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            const doc = await db.collection('books').deleteOne({ _id: new ObjectId(req.params.id) });
            res.status(200).json(doc);
        } else {
            res.status(500).json({ error: 'Not valid document id' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Could not delete the document' });
    }
});
