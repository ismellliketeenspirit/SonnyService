const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
  // id: Schema.Types.ObjectId,
  // vendor_id: {
  //   type: Number,
  //   required: [true, 'please use vendor_id']
  // },
  name: {
    type: String,
    required: [true, 'please use a name for your vendor']
  },
  holds_stock: {
    type: Boolean,
    required: [true, 'please use holds_stock']
  },
  free_returns: {
    type: Boolean,
    required: [true, 'please use free returns']
  },
  ships_sat: {
    type: Boolean,
    required: [true, 'please use ships sat']
  },
  ships_sun: {
    type: Boolean,
    required: [true, 'please use ships sun']
  },
  ships_zip: {
    type: Number,
    required: [true, 'please use ships zip']
  },
  status: {
    type: String,
    required: [true, 'please use status'],
    enum: ['Active', 'Pending Approval', 'Discontinued'],
    default: 'Active'
  }
});

const Vendor = mongoose.model('Vendor', VendorSchema);

module.exports = {Vendor, VendorSchema};