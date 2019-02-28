const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const userSchema = new mongoose.Schema({
  _id: ObjectId,
  username: String,
  mail: String,
  password: String,
  level: Number,
  create_time: Date,
  update_time: Date
},
{
  collection: 'users'
});

module.exports = mongoose.model('User', userSchema);
