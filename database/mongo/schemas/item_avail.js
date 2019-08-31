const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvailabilitySchema = new Schema({
  // id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, 'a product name is required!']
  },
  itemKey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'item'
  },
  vendorKey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vendor'
  },
  // item_id: {
  //   type: Number,
  //   required: [true, 'please provide item_id']
  // },
  // vendor_id: {
  //   type: Number,
  //   required: [true, 'please provide vendor_id']
  // },
  items_condition: {
    type: String,
    required: [true, 'provide a condition of item']
  },
  price: {
    type: Number,
    required: [true, 'a price is required!']
  },
  quantity_avail: {
    type: Number,
    required: [true, 'quantity Available is required!']
  },
  amz_holds_stock: {
    type: Boolean,
    required: [true, 'holds stock is required!']
  },
  free_returns: {
    type: Boolean,
    required: [true, 'free returns is required!']
  },
  ship_from_zipcode: {
    type: Number,
    required: [true, 'holds stock is required!']
  },
});

const Availability = mongoose.model('Availability', AvailabilitySchema);

// Availability.findOne({})
// .populate('item_id')
// .exec((err, id) => {
//   if (err) {
//     console.log('populate ERRORRRRDE: ' + err)
//   } else{
//     console.log(id._id)
//   }
// })

// Availability.findOne({})
// .populate('vendor_id')
// .exec((err, id) => {
//   if (err) {
//     console.log('populate ERRORRRRDE: ' + err)
//   } else{
//     console.log(id._id)
//   }
// })



module.exports = Availability;