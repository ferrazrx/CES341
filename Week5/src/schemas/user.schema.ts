import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { User } from '../models/User';

// Minimum eight characters, at least one letter and one number:
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const imageExtensionRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

export const userSchema = new mongoose.Schema<User>({
  firstName: {
    type: String,
    required: true,
    validator: (value: string) => {
      return validator.isAlpha(value);
    },
  },
  lastName: {
    type: String,
    required: true,
    validator: (value: string) => {
      return validator.isAlpha(value);
    },
  },
  password: {
    type: String,
    required: true,
    validator: (value: string) => {
      return value.match(passwordRegex);
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value: string) => {
      return validator.isEmail(value);
    },
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  thumbnail: {
    type: String,
    validate: (value: string) => {
      return value.match(imageExtensionRegex);
    },
  },
  phones: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Phone',
    },
  ],
});
export const UserModel = mongoose.model('User', userSchema);
