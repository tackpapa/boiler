import mongoose, { Schema, Model, Document } from 'mongoose';

export interface Chat {
  _id: string;
  msg: string;
  createdAt: string;
}

export interface ChatDocument extends Chat, Document {
  msg: string;
  _id: string;
  createdAt: string;
}

export interface ChatModel extends Model<ChatDocument> {}

const ChatSchema: Schema<ChatDocument> = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    msg: String,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model<ChatDocument, ChatModel>('Chats', ChatSchema);

export default model;
