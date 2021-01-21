import mongoose, { Schema } from 'mongoose';

const CommentSchema: Schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts',
    },
    text: String,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Comments', CommentSchema);

export default model;
