const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const ConfigSchema = new mongoose.Schema({
  _id: ObjectId,
  user_id: ObjectId,
  blog_name: String,
  author_name: String
},
{
  collection: 'config'
});

module.exports = mongoose.model('Config', ConfigSchema);
