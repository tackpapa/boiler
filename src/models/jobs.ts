import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Job {
  title: string;
  author: string;
  context: string;
  pics: string[];
  tags: string[];
  views: number;
  location: number;
}

export interface JobDocument extends Job, Document {
  //method를 넣는다
  viewUp: () => void;
}
export interface JobModel extends Model<JobDocument> {}

const JobSchema: Schema<JobDocument> = new mongoose.Schema(
  {
    title: String,
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
JobSchema.methods.viewUp = async function () {
  this.views += 1;
  this.save();
};
const model = mongoose.model<JobDocument, JobModel>('Jobs', JobSchema);

export default model;
