import mongoose, { Schema, Model, Document, ObjectId } from 'mongoose';

export interface Noti {
  from: ObjectId;
  target: ObjectId[];
  isNotice: boolean;
  isRead: boolean;
  type: string;
  title: string;
  text: string;
  url: string;
  post: string;
  PostModel: string;
}

export interface NotiDocument extends Document, Noti {}

export interface NotiModel extends Model<NotiDocument> {}

const NotiSchema: Schema<NotiDocument> = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    target: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    isNotice: Boolean,
    isRead: Boolean,
    type: String,
    title: String,
    text: String,
    url: String,
    post: {
      type: Schema.Types.ObjectId,
      refPath: 'PostModel',
    },
    PostModel: {
      type: String,
      enum: ['Question', 'Tip', 'Post'],
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model<NotiDocument, NotiModel>('Notis', NotiSchema);

export default model;
