
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidlymovies')
         .then (() => console.log("Connect yo the mongoDB....."))
         .catch(err => console.log('Failed to connect to mongoDB....'));


app.use(express.json());  // adding the pice of midware
app.use('/api/genres',genres);
app.use('/api/customers',customers);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{   //port 
    console.log(`Listining to port ${port}.......`);

});
