import mongoose, { Schema } from 'mongoose';
import { isConstructSignatureDeclaration } from 'typescript';

const BannerSchema: Schema = new mongoose.Schema(
  {
    title: String,
    pic: String,
    category: String,
    link: String,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Banners', BannerSchema);

export default model;
