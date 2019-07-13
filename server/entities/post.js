const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const postSchema = new mongoose.Schema({
  _id: { type: ObjectId, required: true },
  title: String,
  create_time: Date,
  post_time: Date,
  update_time: Date,
  content: String,
  status: Number,
  categories: [ObjectId],
  tags: [String],
  view_count: Number,
  like_count: Number
},
{
  collection: 'posts'
});

module.exports = mongoose.model('Post', postSchema);
