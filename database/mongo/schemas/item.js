const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  // id: mongoose.Schema.Types.ObjectId,
  // item_id: {
  //   type: Number,
  //   required: [true, 'please use item_id']
  // },
  name: {
    type: String,
    required: [true, 'a product name is required!']
  }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = {Item, ItemSchema};
// module.exports = ItemSchema;