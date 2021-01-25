import mongoose, { Schema } from 'mongoose';
import { createTextChangeRange } from 'typescript';

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
    memo: String,
    exp: Number,
    password: String,
    cell: Number,
    kakaoid: String,
    accessToken: String,
    profilepic: String,
    level: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Users', UserSchema);

export default model;
