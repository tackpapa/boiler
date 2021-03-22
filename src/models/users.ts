import mongoose, { ObjectId, Schema, Document, Model } from 'mongoose';

export interface User {
  email: string;
  name: string;
  exp: number;
  profilepic: string;
  cell: number;
  liked: string[];
  expotoken: string;
}

export interface UserDocument extends Document, User {}

export interface UserModel extends Model<UserDocument> {}

const UserSchema: Schema<UserDocument> = new mongoose.Schema(
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
    liked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts',
      },
    ],
    Noti: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notis',
      },
    ],
    expotoken: String,
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

const model: UserModel = mongoose.model<UserDocument>('Users', UserSchema);

export default model;
