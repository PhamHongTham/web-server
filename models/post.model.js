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
  }
}, {
  timestamps: true,
});

export const Post = mongoose.model('Post', PostSchema);
