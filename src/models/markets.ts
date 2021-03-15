import mongoose, { Schema, Model, Document } from 'mongoose';

export interface Market {
  title: string;
  author: string;
  context: string;
  pics: string[];
  tags: string[];
  views: number;
  price: number;
}

export interface MarketDocument extends Market, Document {
  //method를 넣는다
  viewUp: () => void;
}
export interface MarketModel extends Model<MarketDocument> {}

const MarketSchema: Schema<MarketDocument> = new mongoose.Schema(
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
    notice: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: 'free',
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
    price: {
      type: Number,
      default: 0,
    },
    location: String,
  },
  {
    timestamps: true,
  }
);
MarketSchema.index({
  title: 'text',
  author: 'text',
  tags: 'text',
  context: 'text',
  price: 'text',
});

MarketSchema.methods.viewUp = async function () {
  this.views += 1;
  this.save();
};
const model = mongoose.model<MarketDocument, MarketModel>(
  'Markets',
  MarketSchema
);

export default model;
