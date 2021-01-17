import mongoose, { Schema } from 'mongoose';
import { isConstructSignatureDeclaration } from 'typescript';

const PostSchema: Schema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Posts', PostSchema);

export default model;
