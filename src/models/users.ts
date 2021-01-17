import mongoose, { Schema } from 'mongoose';
import { createTextChangeRange } from 'typescript';
import jwt from 'utils/jwt';

const UserSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    password: String,
    cell: Number,
    kakaoid: String,
    accessToken: String,
    profilepic: String,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Users', UserSchema);

export default model;
