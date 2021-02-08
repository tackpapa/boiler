import { boolean } from 'joi';
import mongoose, { Schema, Model, Document } from 'mongoose';

export interface Post {
  title: string;
  author: string;
  context: string;
  pics: string[];
  tags: string[];
  views: number;
}

export interface PostDocument extends Post, Document {
  viewUp: () => void;
  comments: string;
  push: () => void;
}

export interface PostModel extends Model<PostDocument> {}

const PostSchema: Schema<PostDocument> = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    context: String,
    category: {
      type: String,
      default: 'free',
    },
    notice: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
      },
    ],
    pics: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
PostSchema.index({
  title: 'text',
  author: 'text',
  tags: 'text',
  context: 'text',
});
PostSchema.methods.viewUp = async function () {
  this.views += 1;
  this.save();
};

const model = mongoose.model<PostDocument, PostModel>('Posts', PostSchema);

export default model;
