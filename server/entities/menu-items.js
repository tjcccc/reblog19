const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const menuItemsSchema = new mongoose.Schema({
  _id: ObjectId,
  order_id: Number,
  label: String,
  link: String
},
{
  collection: 'menu_items'
});

module.exports = mongoose.model('MenuItems', menuItemsSchema);
