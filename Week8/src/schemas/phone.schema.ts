import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { Phone } from '../models/Phone';

export const phoneNumberSchema = new mongoose.Schema<Phone>({
  name: {
    type: String,
    required: true,
    validator: (value: string) => {
      return validator.isAlpha(value);
    },
  },
  phone_number: {
    type: String,
    required: true,
    validator: (value: string) => {
      return validator.isNumeric(value);
    },
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
  updatedAt: {
    type: Date,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});
export const PhoneModel = mongoose.model('Phone', phoneNumberSchema);
