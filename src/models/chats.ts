import mongoose, { Schema, Model, Document } from 'mongoose';

export interface Chat {
  msg: string;
}

export interface ChatDocument extends Chat, Document {
  msg: string;
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
    expireAt: {
      type: Date,
      default: new Date(),
      expires: 604800,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model<ChatDocument, ChatModel>('Chats', ChatSchema);

export default model;
