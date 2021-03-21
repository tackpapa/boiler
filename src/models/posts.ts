import { boolean } from 'joi';
import mongoose, { Schema, Model, Document } from 'mongoose';

export interface Post {
  title: string;
  author: string;
  context: string;
  pics: string[];
  tags: string[];
  views: number;
  category: string;
  likes: number;
}

export interface PostDocument extends Post, Document {
  viewUp: () => void;
  likeDown: () => void;
  likeUp: () => void;
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
    likes: {
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
PostSchema.methods.likeUp = async function () {
  this.likes += 1;
  this.save();
};
PostSchema.methods.likeDown = async function () {
  this.likes -= 1;
  this.save();
};

const model = mongoose.model<PostDocument, PostModel>('Posts', PostSchema);

export default model;
