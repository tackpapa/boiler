import mongoose, { Schema } from 'mongoose';

const CommentSchema: Schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    target: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
    },
    recomments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
      },
    ],
    text: String,
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'PostModel',
    },
    PostModel: {
      type: String,
      required: true,
      enum: ['Question', 'Tip', 'Post'],
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Comments', CommentSchema);

export default model;
