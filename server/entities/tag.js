const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const tagSchema = new mongoose.Schema({
  _id: ObjectId,
  label: String,
},
{
  collection: 'tags'
});

module.exports = mongoose.model('Tag', tagSchema);
