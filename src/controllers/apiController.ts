import db from 'db';
import { Controller } from './types';
import { Noti } from '../models/notis';

const home: Controller = async (ctx) => {
  const posts = await db.posts.find().sort({ _id: -1 }).limit(5);
  const jobs = await db.jobs.find().sort({ _id: -1 }).limit(5);
  const markets = await db.markets.find().sort({ _id: -1 }).limit(5);
  ctx.body = { posts, jobs, markets };
};

const error: Controller = async (ctx) => {
  // throw new Error('error message');
  // ctx.body = products;
  ctx.status = 400;
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

const hotPosts: Controller = async (ctx) => {
  const { num } = ctx.params;
  var today = new Date();
  today.setDate(today.getDate() - 1);
  var week = new Date();
  week.setDate(today.getDate() - 7);
  var month = new Date();
  month.setDate(today.getDate() - 30);

  const numToAction: any = {
    today: today,
    week: week,
    month: month,
  };
  const numToType: any = {
    today: 'hot1',
    week: 'hot7',
    month: 'hot30',
  };

  const posts = await db.posts
    .find({
      createdAt: { $gte: numToAction[num as keyof typeof numToAction] },
    })
    .populate('author')
    .sort({ likes: -1 })
    .limit(15);

  ctx.body = { posts: posts, type: numToType[num as keyof typeof numToType] };
};

const jobs: Controller = async (ctx) => {
  const jobs = await db.jobs.find().sort({ date: -1 }).limit(20);
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

const createcate: Controller = async (ctx) => {
  const { name } = ctx.request.body;
  const item = await db.categorys.create({
    name: name,
  });

  ctx.status = 200;
};

const chatlist: Controller = async (ctx) => {
  const list = await Promise.all([
    db.chats.find({ to: ctx.state.user._id }).distinct('from'),
    db.chats.find({ from: ctx.state.user._id }).distinct('to'),
  ]).then((result: any) => [
    ...new Set(result.flat().map((id: any) => id.toString())),
  ]);
  const t = list.map((i) => db.users.findOne({ _id: i }));
  const item = await Promise.all(t);
  ctx.body = item;
  ctx.status = 202;
};

const stats: Controller = async (ctx) => {
  const products = await db.markets.find().countDocuments();
  const users = await db.users.find().countDocuments();
  const posts = await db.posts.find().countDocuments();
  const jobs = await db.jobs.find().countDocuments();
  const post1day = await db.posts.find().sort({ _id: -1 }).countDocuments();
  const user1day = await db.users.find().sort({ _id: -1 }).countDocuments();

  const product1day = await db.markets
    .find()
    .sort({ _id: -1 })
    .countDocuments();

  const job1day = await db.jobs.find().sort({ _id: -1 }).countDocuments();

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
  error,
  tag,
  hotPosts,
  jobs,
  hotsearch,
  hotJobs,
  products,
  hotProducts,
  createcate,
  chatlist,
};
