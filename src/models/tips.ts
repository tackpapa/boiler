import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Tip {
  title: string;
  author: string;
  context: string;
  pics: string[];
  tags: string[];
  views: number;
  location: number;
  category: string;
}

export interface TipDocument extends Tip, Document {
  //method를 넣는다
  viewUp: () => void;
}
export interface TipModel extends Model<TipDocument> {}

const TipSchema: Schema<TipDocument> = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
      },
    ],
    context: String,
    category: {
      type: String,
      default: 'free',
    },
    notice: {
      type: Boolean,
      default: false,
    },
    pics: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    location: String,
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
TipSchema.index({
  title: 'text',
  author: 'text',
  tags: 'text',
  context: 'text',
  location: 'text',
});

TipSchema.methods.viewUp = async function () {
  this.views += 1;
  this.save();
};
const model = mongoose.model<TipDocument, TipModel>('Tips', TipSchema);

export default model;
