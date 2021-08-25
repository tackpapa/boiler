import mongoose, { Schema, Model, Document } from 'mongoose';

export interface Question {
  title: string;
  author: string;
  context: string;
  pics: string[];
  tags: string[];
  views: number;
  price: number;
  category: string;
}

export interface QuestionDocument extends Question, Document {
  //method를 넣는다
  viewUp: () => void;
}
export interface QuestionModel extends Model<QuestionDocument> {}

const QuestionSchema: Schema<QuestionDocument> = new mongoose.Schema(
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
QuestionSchema.index({
  title: 'text',
  author: 'text',
  tags: 'text',
  context: 'text',
  price: 'text',
});

QuestionSchema.methods.viewUp = async function () {
  this.views += 1;
  this.save();
};
const model = mongoose.model<QuestionDocument, QuestionModel>(
  'Questions',
  QuestionSchema
);

export default model;
