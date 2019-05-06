const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const tagSchema = new mongoose.Schema({
  _id: ObjectId,
  label: String,
  count: Number
},
{
  collection: 'tags'
});

module.exports = mongoose.model('Tag', tagSchema);
