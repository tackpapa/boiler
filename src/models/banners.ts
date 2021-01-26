import mongoose, { Schema } from 'mongoose';

const BannerSchema: Schema = new mongoose.Schema(
  {
    title: String,
    pic: String,
    category: String,
    link: String,
    activated: Boolean,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Banners', BannerSchema);

export default model;
