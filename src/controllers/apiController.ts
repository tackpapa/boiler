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

const stats: Controller = async (ctx) => {
  const products = await db.markets.find().countDocuments();
  const users = await db.users.find().countDocuments();
  const posts = await db.posts.find().countDocuments();
  const jobs = await db.jobs.find().countDocuments();
  const post1day = await db.posts
    .find()
    .sort({ datefield: -1 })
    .countDocuments();
  const user1day = await db.users
    .find()
    .sort({ datefield: -1 })
    .countDocuments();

  const product1day = await db.markets
    .find()
    .sort({ datefield: -1 })
    .countDocuments();

  const job1day = await db.jobs.find().sort({ datefield: -1 }).countDocuments();

  ctx.body = {
    users,
    user1day,
    products,
    product1day,
    posts,
    post1day,
    jobs,
    job1day,
  };
};

export default {
  stats,
  home,
  tag,
  hotPosts,
  jobs,
  hotJobs,
  products,
  hotProducts,
};
