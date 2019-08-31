const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require('mongoose');
// const fs = require("fs");
const cors = require("cors");
// const db = require('../database-mysql');
const routes = require('./mongoApi.js');

// CREATE APP INSTANCE
const app = express();
app.use(
  cors(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json()
);

const clientDistFolder = path.join(__dirname, '/..', '/client/dist');
const publicFolder = path.join(__dirname, '/..', '/public');
app.use('/static', express.static(publicFolder));
const PORT = 3030;


// MIDDLEWARE
app.use(routes);
app.use(express.static(clientDistFolder));
app.use('/products/', express.static(clientDistFolder));


// LISTEN
app.listen(PORT, () => {
  console.log(`Open http://localhost:${PORT}`);
});


// CONNECT TO MONGOdb
mongoose.connect('mongodb://localhost/amzn', { useNewUrlParser: true });
mongoose.Promise = global.Promise;