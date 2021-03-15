import mongoose, { Schema, Model, Document } from 'mongoose';

export interface Search {
  query: string;
}

export interface SearchDocument extends Search, Document {
  views: number;
  query: string;
  viewUp: () => void;
}

export interface SearchModel extends Model<SearchDocument> {}

const SearchSchema: Schema<SearchDocument> = new mongoose.Schema(
  {
    query: String,
    expireAt: {
      type: Date,
      default: new Date(),
      expires: 604800,
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

SearchSchema.methods.viewUp = async function () {
  this.views += 1;
  this.save();
};

const model = mongoose.model<SearchDocument, SearchModel>(
  'Searches',
  SearchSchema
);

export default model;
