const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const configSchema = new mongoose.Schema({
  _id: ObjectId,
  user_id: ObjectId,
  blog_name: String,
  author_name: String
},
{
  collection: 'configs'
});

module.exports = mongoose.model('Config', configSchema);
