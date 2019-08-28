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
  category_ids: [ObjectId],
  tag_ids: [ObjectId],
  view_count: Number,
  like_count: Number
},
{
  collection: 'posts',
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

postSchema.virtual('categories', {
  ref: 'Category',
  localField: 'category_ids',
  foreignField: '_id'
});

postSchema.virtual('tags', {
  ref: 'Tag',
  localField: 'tag_ids',
  foreignField: '_id'
});

module.exports = mongoose.model('Post', postSchema);
