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
  gender: {
    type: String,
    enum: ['male', 'female'],
    message: 'Gender is male or female',
  },
  dob: {
    type: String,
    required: [true, 'Date of birth is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  follower: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  accessToken: String,
  refreshToken: String,
}, {
  timestamps: true,
});

export const User = mongoose.model('User', UserSchema);
