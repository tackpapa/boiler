import mongoose, { Schema } from 'mongoose';

const CategorySchema: Schema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Categorys', CategorySchema);

export default model;
