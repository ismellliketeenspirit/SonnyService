const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const { User, user, Vendor, Availability } = require('../database/mongoSchema');
const User = require('../database/mongo/schemas/user.js');
const Item = require('../database/mongo/schemas/item').Item;
const Vendor = require('../database/mongo/schemas/vendor').Vendor;
const Availability = require('../database/mongo/schemas/item_avail.js');

const defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'content-type': 'application/json'
};


router.get('/users', (req, res, next) => {
  res.set(defaultCorsHeaders);
  User.find()
  // .exec()
  .then( user => {
    const response = {
      count: user.length,
      users: user.map( user => {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address
        }
      })
    }
    res.status(200).json(response);
  })
  .catch( err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
  // console.log(req);
  // res.status(200).send(req);
});

router.get('/items', (req, res, next) => {
  res.set(defaultCorsHeaders);
  Item.find()
  .then( items => {
    const response = {
      count: items.length,
      items: items.map( item => {
        return {
          _id: item._id,
          name: item.name,
        }
      })
    }
    res.status(200).json(response);
  })
  .catch( err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
  // console.log(req);
  // res.status(200).send(req);
});

router.get('/vendors', (req, res, next) => {
  res.set(defaultCorsHeaders);
  Vendor.find()
  .then( vendors => {
    const response = {
      count: vendors.length,
      vendors: vendors.map( vendor => {
        return {
          _id: vendor._id,
          name: vendor.name,
          holds_stock: vendor.holds_stock,
          free_returns: vendor.free_returns,
          ships_sat: vendor.ships_sat,
          ships_sun: vendor.ships_sun,
          ships_zip: vendor.ships_zip,
          status: vendor.status
        }
      })
    }
    res.status(200).json(response);
  })
  .catch( err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
  // console.log(req);
  // res.status(200).send(req);
});

router.get('/availability', (req, res, next) => {
  res.set(defaultCorsHeaders);
  Availability.find()
  .then( items => {
    const response = {
      count: items.length,
      items: items.map( item => {
        return {
          _id: item._id,
          // itemey: item.item_id,
          name: item.name,
          item_id: item.itemKey,
          vendor_id: item.vendorKey,
          condition: item.items_condition,
          price: item.price,
          quantity: item.quantity_avail,
          amzStock: item.amz_holds_stock,
          freeReturns: item.free_returns,
          shipsFrom: item.ship_from_zipcode
        }
      })
    }
    res.status(200).json(response);
  })
  .catch( err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
  // console.log(req);
  // res.status(200).send(req);
});

router.delete('/deleteall', (req, res, next) => {
  res.set(defaultCorsHeaders);
  User.find().deleteMany().exec();
  Item.find().deleteMany().exec();
  Vendor.find().deleteMany().exec();
  Availability.find().deleteMany().exec();
  res.status(200).send('ALL ENTRIES DELETED!');
})

// GET ONE
// router.get('/product/:id', (req, res, next) => {
//   res.set(defaultCorsHeaders);
//   let id = req.params.id;
//   console.log('this is the id: ' + id);
//   helper.getProductDataById(id)
//     .catch()

//   Item.findById(id)
//   .then()
// })

module.exports = router;