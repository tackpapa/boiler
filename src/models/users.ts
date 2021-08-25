import mongoose, { Schema, Document, Model } from 'mongoose';

export interface User {
  email: string;
  name: string;
  exp: number;
  profilepic: string;
  cell: number;
  liked: string[];
  Noti: string[];
  lawyer: Boolean;
  reviews: string[];
}

export interface UserDocument extends Document, User {}

export interface UserModel extends Model<UserDocument> {}

const UserSchema: Schema<UserDocument> = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      index: true,
    },
    kakaoId: {
      type: Number,
      unique: true,
      index: true,
      required: [true, "can't be blank"],
    },
    name: {
      type: String,
      required: [true, "can't be blank"],
    },
    lawyer: {
      type: Boolean,
      index: true,
      default: false,
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
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions',
      },
    ],
    Noti: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notis',
      },
    ],
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

UserSchema.index({
  email: 'text',
  name: 'text',
  cell: 'text',
  lawyer: 'boolean',
  level: 'text',
  kakaoid: 'number',
});

const model: UserModel = mongoose.model<UserDocument>('Users', UserSchema);

export default model;
