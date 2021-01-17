import mongoose, { Schema } from 'mongoose';

const CommentSchema: Schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types,
      Object,
      ref: 'Users',
    },
    post: {
      type: mongoose.Schema.Types,
      Object,
      ref: 'Posts',
    },
    context: String,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Comments', CommentSchema);

export default model;
