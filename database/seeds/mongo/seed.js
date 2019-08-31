const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/amzn', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const faker = require('faker');
const User = require('../../mongo/schemas/user.js');
const Item = require('../../mongo/schemas/item').Item;
const ItemSchema = require('../../mongo/schemas/item').ItemSchema;
const VendorSchema = require('../../mongo/schemas/vendor').VendorSchema;
const Vendor = require('../../mongo/schemas/vendor').Vendor;
const Availability = require('../../mongo/schemas/item_avail.js');
const AvailabilitySchema = require('../../mongo/schemas/item_avail').AvailabilitySchema;


//Start Timer
let startTime = Date.now();
console.log('Started: ' + startTime);

const seedAvailability = () => {
  // Get the count of all users
  // let getItem = () => Item.count().exec(function (err, count) {
  //   // Get a random entry
  //   var random = Math.floor(Math.random() * count)
  //   // Again query all users but only fetch one offset by our random #
  //   Item.findOne().skip(random).exec(
  //     function (err, result) {
  //       // Tada! random user
  //       // console.log(result)
  //       return result;
  //     })
  // })
  // let getVendor = () => Vendor.count().exec(function (err, count) {
  //   // Get a random entry
  //   var random = Math.floor(Math.random() * count)
  //   // Again query all users but only fetch one offset by our random #
  //   Vendor.findOne().skip(random).exec(
  //     function (err, result) {
  //       // Tada! random user
  //       // console.log(result)
  //       return result;
  //     })
  // })
  //IIFE?
  // getVendor();

  // const itemModel = getItem();
  // const vendorModel = getVendor();

  const newAvail = new Availability( {
    // _id: new mongoose.Types.ObjectId(),
    name: faker.commerce.product(),
    // item_id: faker.random.number({'min': 1, 'max': 25}),
    // vendor_id: faker.random.number({'min': 1, 'max': 25}),
    // MAKE THIS ASYNC AND IT MIGHT WORK vvvvvvv
    // item_id: User.findOne({item_id: i}, function(err,obj) { console.log(obj); }),
    // vendor_id: ,
    // item_id: mongoose.Types.ObjectId(getItem()),
    // item_id: mongoose.Types.ObjectId(),
    // vendor_id: mongoose.Types.ObjectId(),
    // vendor_id: mongoose.Types.ObjectId(),
    // item_id: getItem(),
    // vendor_id: getVendor(),
    // item_id: User.findOne({_id: getItem()}, (err,obj) => obj._id),
    // vendor_id: Vendor.findOne({_id: getVendor()}, (err,obj) => obj._id),
    items_condition: faker.company.catchPhraseDescriptor(),
    price: faker.commerce.price(),
    quantity_avail: faker.random.number(),
    amz_holds_stock: faker.random.boolean(),
    free_returns: faker.random.boolean(),
    ship_from_zipcode: Number(faker.address.zipCode().slice(0,5))
  })
  newAvail.save()
  .then( () => {
    // const itemKey = mongoose.model( 'Item', ItemSchema);
    // const vendorKey = mongoose.model( 'Vendor', VendorSchema);

    Availability.findOne({})
    .populate('itemKey')
    .exec((err, id) => {
      if (err) {
        console.log('populate ERRORRRRDE: ' + err)
      } else{
        console.log(id._id)
      }
    })

    Availability.findOne({})
    .populate('vendorKey')
    .exec((err, id) => {
      if (err) {
        console.log('populate ERRORRRRDE: ' + err)
      } else{
        console.log(id._id)
      }
    })
  })

  .catch(err => {
    console.log(err)
  })

  // Availability.findOne({})
  //   .populate('itemKey')
  //   .exec((err, id) => {
  //     if (err) {
  //       console.log('populate ERRORRRRDE: ' + err)
  //     }
  //   })

  //   Availability.findOne({})
  //   .populate('vendorKey')
  //   .exec((err, id) => {
  //     if (err) {
  //       console.log('populate ERRORRRRDE: ' + err)
  //     }
  //   })


}

const seedVendor = () => {
  const newVendor = new Vendor( {
    // id: new mongoose.Types.ObjectId(),
    // vendor_id: i,
    name: faker.company.companyName(),
    holds_stock: faker.random.boolean(),
    free_returns: faker.random.boolean(),
    ships_sat: faker.random.boolean(),
    ships_sun: faker.random.boolean(),
    ships_zip: Number(faker.address.zipCode().slice(0,5)),
    status: faker.random.arrayElement(['Active', 'Pending Approval', 'Discontinued'])
  })
  newVendor.save()
  // .then( vendor => {
  //   console.log(vendor);
  // }
  .catch(err => {
    console.log(err);
  })
}

const seedUser = () => {

  const newUser = new User({
    // id: new mongoose.Types.ObjectId(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    address: Number(faker.address.zipCode().slice(0,5))
  })
  newUser.save()
  // .then( user => {
  //   console.log(user);
  // })
  .catch( err => {
    console.log(err);
  })
}

const seedItem = () => {
  for (var i = 0; i < 25; i++) {
    const newItem = new Item( {
      // id: new mongoose.Types.ObjectId(),
      // item_id: i,
      name: faker.commerce.product()
    })
    newItem.save()
    .then( () => {
      seedUser()
    })
    .then( () => {
      seedVendor()
    })
    .then( () => {
      seedAvailability()
    })
    .catch( err => {
      console.log(err);
    })
  };
}


// SEED'EM!

seedItem();



// Stop Timer and print
let stopTime = Date.now();
console.log('Stop Time: ' + stopTime);
let duration = Number(stopTime) - Number(startTime);
console.log('Seconds Elapsed: ' + Math.floor(duration / 1000));
console.log('[Complete]: 10,000,000 records inserted successfully')


// REFACTOR: maybe we could put each seed F in an async call to .then()