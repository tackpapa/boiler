import mongoose, { Schema } from 'mongoose';

const CommentSchema: Schema = new mongoose.Schema(
  {
    author: String,
    authorexp: Number,
    posting: mongoose.Schema.Types.ObjectId,
    text: String,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Comments', CommentSchema);

export default model;
