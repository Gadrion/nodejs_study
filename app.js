// [LOAD PACKAGES]

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// [CONFIGURE APP]
app.use(express.json());

// [CONFIGURE SERVER PORT]
const port = process.env.PORT || 8080;

// [CONFIGURE mongoose]
// CONNECT TO MONGODB SERVER
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');

// DEFINE MODEL
const Book = require('./models/book');

// [CONFIGURE ROUTER]
const router = require('./routes')(app, Book);

// [RUN SERVER]
const server = app.listen(port, () => {
    console.log("Express server has started on port " + port);
});