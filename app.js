import express from "express";

//init and middleware
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

app.get('/books', (req, res) =>{
    res.json({message: 'Welcome to API!'})
});