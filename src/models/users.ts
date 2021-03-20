import mongoose, { ObjectId, Schema } from 'mongoose';

export interface User {
  email: string;
  name: string;
  exp: number;
  profilepic: string;
  cell: number;
  _id: ObjectId;
}

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
    memo: {
      type: String,
      default: '유저특이사항',
    },
    exp: {
      type: Number,
      default: 0,
    },

    cell: String,

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
