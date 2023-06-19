const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['blog', 'vlog'],
    required: true,
  },
  developer: {
    type: Schema.Types.ObjectId,
    ref: 'Developer',
    required: true,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
