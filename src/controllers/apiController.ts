import db from 'db';
import { Controller } from './types';

const home: Controller = async (ctx) => {
  const posts = await db.posts.find().sort({ _id: -1 }).limit(20);
  ctx.body = posts;
};

const tag: Controller = async (ctx) => {
  const { tag } = ctx.params;
  const posts = await db.posts
    .find({ tags: { $in: [tag] } })
    .sort({ _id: -1 })
    .limit(20);
  ctx.body = posts;
};

const hotPost: Controller = async (ctx) => {
  const posts = await db.posts
    .find()
    .sort({ views: -1 })
    .sort({ _id: -1 })
    .limit(20);
  ctx.body = posts;
};

export default { home, tag, hotPost };
