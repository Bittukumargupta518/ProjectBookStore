const express = require('express');
const app = express();
const cors = require('cors');
const connect = require('./connection');
const book = require('./routes/book');
const mobile = require('./routes/mobile');  

app.use(cors());
app.use(book);
app.use(mobile);   

// Connect DB
connect();

// Start server
app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is running on 3000");
    }
});
