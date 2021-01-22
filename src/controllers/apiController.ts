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

const hotPosts: Controller = async (ctx) => {
  const posts = await db.posts
    .find()
    .sort({ views: -1 })
    .sort({ _id: -1 })
    .limit(20);
  ctx.body = posts;
};

const jobs: Controller = async (ctx) => {
  const jobs = await db.jobs.find().sort({ _id: -1 }).limit(20);
  ctx.body = jobs;
};

const hotJobs: Controller = async (ctx) => {
  const jobs = await db.jobs
    .find()
    .sort({ views: -1 })
    .sort({ _id: -1 })
    .limit(20);
  ctx.body = jobs;
};

const products: Controller = async (ctx) => {
  const products = await db.markets.find().sort({ _id: -1 }).limit(20);
  ctx.body = products;
};

const hotProducts: Controller = async (ctx) => {
  const products = await db.markets
    .find()
    .sort({ views: -1 })
    .sort({ _id: -1 })
    .limit(20);
  ctx.body = products;
};

export default { home, tag, hotPosts, jobs, hotJobs, products, hotProducts };
