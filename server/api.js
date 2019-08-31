const express = require('express');
const router = express.Router();
const db = require('../database/mysql');

const defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'content-type': 'application/json'
};


router.get('/product/:id', (req, res) => {
  res.set(defaultCorsHeaders);
  // console.log('%s %s %s', req.method, req.url, req.path)
  // console.log(req.params.id);
  var requestedId = (req.params.id).replace(":", "");
  // console.log('HIT')
  db.getProductDataById(requestedId, (err, results) => {
    if (err) {
      console.log(' server issue get selectId ');
      res.status(400).send(err);
    } else {
      res.status(200).send(JSON.stringify(results));
    }

  });
});

router.post('/product/:id', (req, res) => {
  res.set(defaultCorsHeaders);
  console.log(req.params.id);
  var requestedId = (req.params.id).replace(":", "");

  db.insertOne(record, (err, results) => {
    if(err) {
      console.log('insertOne messed up');
      res.status(400).send(err);
    } else {
      res.status(200).send()
    }
  })
});

router.delete('/product/:id', (req, res, next) => {
  res.set(defaultCorsHeaders);
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


// module.exports = router;