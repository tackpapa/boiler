import mongoose, { Schema } from 'mongoose';
import { isConstructSignatureDeclaration } from 'typescript';

const PostSchema: Schema = new mongoose.Schema(
  {
    title: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    context: String,
    pic: String,
    tags: {
      type: [String],
      default: [],
    },
    isjob: Boolean,
    location: String,
    views: Number,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Posts', PostSchema);

export default model;
