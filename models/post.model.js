import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  cover: {
    type: String,
    required: [true, 'Cover image is required'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  tags: {
    type: [String],
    required: true,
    minlength: [1, 'Tags is required to have at least 1 item']
  },
  status: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
}, {
  timestamps: true,
});

export const Post = mongoose.model('Post', PostSchema);
