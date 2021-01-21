import mongoose, { Schema } from 'mongoose';

const JobSchema: Schema = new mongoose.Schema(
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
    location: String,
    views: Number,
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Jobs', JobSchema);

export default model;
