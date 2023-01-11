import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
  },
  displayName: {
    type: String,
    required: [true, 'displayName is required'],
  },
  picture: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    message: 'Gender is male or female',
  },
  dob: {
    type: String,
    required: [true, 'Date of birth is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  posts: [
    { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post' 
    }
  ],
  accessToken: String,
  refreshToken: String,
}, {
  timestamps: true,
});

export const User = mongoose.model('User', UserSchema);
