import mongoose, { Schema, Model, Document, ObjectId } from 'mongoose';

export interface Chat {
  msg: string;
  to: ObjectId;
  from: ObjectId;
  createdAt: Date;
}

export interface ChatDocument extends Document, Chat {}

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
