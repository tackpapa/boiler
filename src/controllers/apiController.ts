import db from 'db';
import { Controller } from './types';

const home: Controller = async (ctx) => {
  const posts = await db.posts.find().sort({ _id: -1 }).limit(5);
  const tips = await db.tips.find().sort({ _id: -1 }).limit(5);
  const questions = await db.questions.find().sort({ _id: -1 }).limit(5);
  ctx.body = { posts, tips, questions };
};

const hotsearch: Controller = async (ctx) => {
  const words = await db.searches
    .find({ views: { $gt: 1 } })
    .sort({ views: 'descending' })
    .limit(10);
  ctx.body = words;
};

const tag: Controller = async (ctx) => {
  const { tag } = ctx.params;
  const posts = await db.posts
    .find({ tags: { $in: [tag] } })
    .sort({ _id: -1 })
    .limit(20);
  ctx.body = posts;
};

const tips: Controller = async (ctx) => {
  const tips = await db.tips.find().sort({ date: -1 }).limit(20);
  ctx.body = tips;
};

const questions: Controller = async (ctx) => {
  const questions = await db.questions.find().sort({ _id: -1 }).limit(20);
  ctx.body = questions;
};

export default {
  home,
  tag,
  tips,
  hotsearch,
  questions,
};
