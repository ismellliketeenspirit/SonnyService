const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const fs = require("fs");

const db = require('../database-mysql');

const app = express();
const PORT = 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const clientDistFolder = path.join(__dirname, '/..', '/client/dist');
const publicFolder = path.join(__dirname, '/..', '/public');
console.log("public " + publicFolder);
app.use(express.static(clientDistFolder));
app.use('/static', express.static(publicFolder));


app.get('/', (req, res) => {
  console.log('%s %s %s', req.method, req.url, req.path)
  res.status(200).send('Not Supported');
});

app.get('/product/:id', (req, res) => {
  console.log('%s %s %s', req.method, req.url, req.path)
  console.log(req.params.id);
  var requestedId = (req.params.id).replace(":", "");

  db.getProductDataById(requestedId, (err, results) => {
    if (err) {
      console.log(' server issue get selectId ');
      res.status(400).send(err);
    } else {
      res.status(200).send(JSON.stringify(results));
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
