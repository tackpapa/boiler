import mongoose, { Schema } from 'mongoose';
import { isConstructSignatureDeclaration } from 'typescript';

const MarketSchema: Schema = new mongoose.Schema(
  {
    title: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    context: String,
    pics: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    views: Number,
    price: Number,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Markets', MarketSchema);

export default model;
