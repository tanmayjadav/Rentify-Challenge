import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password : {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ['buyer', 'seller'],
  },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

// module.exports = User;