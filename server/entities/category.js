const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const categorySchema = new mongoose.Schema({
  _id: ObjectId,
  order_id: Number,
  label: String,
},
{
  collection: 'categories'
});

module.exports = mongoose.model('Category', categorySchema);
