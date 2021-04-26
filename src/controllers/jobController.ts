import db from 'db';
import { Controller } from './types';
import upload from '../utils/s3';
import fs from 'fs';
import sharp from 'sharp';

const { PassThrough } = require('stream');

const create: Controller = async (ctx) => {
  const { title, context, tags, location, category } = ctx.request.body;
  const author = ctx.state.user._id;
  const user = await db.users.findOneAndUpdate(
    { _id: author },
    { $inc: { exp: +10 } }
  );
  user?.save();

  const item = await db.jobs.create({
    title,
    context,
    author,
    tags,
    location,
    category,
  });
  const post = await db.jobs.findOne({ _id: item._id }).populate('author');
  if (ctx.request.files.pic === undefined) {
    return (ctx.status = 200), (ctx.body = post);
  }
  if (ctx.request.files.pic.length > 0) {
    const arr = ctx.request.files.pic;

    const promises = arr.map(async ({ path }: { path: string }, i: number) => {
      const body = sharp(path).resize(200, 200).png();
      var param = {
        Bucket: 'ridasprod',
        Key: `jobimage/${item._id + i}`,
        ACL: 'public-read',
        Body: body.pipe(PassThrough()),
        ContentType: 'image/png',
      };
      const lala = await upload(param);
      await (item as any).pics.push(lala.Location);
      if (i === arr.length - 1) {
        await item.save();
      }
    });
    await Promise.all(promises);
  } else {
    const arr = [ctx.request.files.pic];

    const promises = arr.map(async ({ path }: { path: string }, i: number) => {
      const body = sharp(path).resize(200, 200).png();
      var param = {
        Bucket: 'ridasprod',
        Key: `jobimage/${item._id + i}`,
        ACL: 'public-read',
        Body: body.pipe(PassThrough()),
        ContentType: 'image/png',
      };
      const lala = await upload(param);
      await (item as any).pics.push(lala.Location);
      if (i === arr.length - 1) {
        await item.save();
      }
    });
    await Promise.all(promises);
  }
  const post2 = await db.jobs.findOne({ _id: item._id }).populate('author');
  ctx.status = 200;
  ctx.body = post2;
};

const update: Controller = async (ctx) => {
  const { id } = ctx.params;
  const { context, title, tags, location, category } = ctx.request.body;
  const newtag = JSON.parse(tags);
  const post = await db.jobs.findOneAndUpdate(
    { _id: id },
    {
      context: context,
      tags: newtag,
      title: title,
      location: location,
      category: category,
    },
    { new: true }
  );

  ctx.status = 200;
  ctx.body = post;
};

const findone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post = await db.jobs
    .findOne({ _id: id })
    .populate('author')
    .populate('comments');
  if (post) {
    post?.viewUp();
    ctx.status = 200;
    ctx.body = post;
  } else {
    ctx.status = 404;
    ctx.body = { id };
  }
};

const byCategory: Controller = async (ctx) => {
  const { query, last } = ctx.params;

  const post = await db.jobs
    .find({ category: query })
    .where('createdAt')
    .lt(last)
    .populate('author')
    .sort({ _id: -1 })
    .limit(10);
  ctx.status = 200;
  ctx.body = { data: post, type: query };
};

const latest: Controller = async (ctx) => {
  const { last } = ctx.params;
  const posts = await db.jobs
    .find({ createdAt: { $lt: last } })
    .populate('author')
    .sort({ _id: -1 })
    .limit(15);
  ctx.status = 200;
  ctx.body = posts;
};

const alljob: Controller = async (ctx) => {
  const { last } = ctx.params;
  const posts = await db.jobs
    .find({ createdAt: { $lt: last } })
    .populate('author')
    .sort({ _id: -1 })
    .limit(15);
  ctx.status = 200;
  ctx.body = posts;
};

const jobpage: Controller = async (ctx) => {
  const { page } = ctx.params;
  const row = 15;
  const skip = (parseInt(page, 10) - 1) * row;
  const allpost = await db.jobs.countDocuments({});
  const posts = await db.jobs
    .find({})
    .skip(skip)
    .populate('author')
    .sort({ _id: -1 })
    .limit(row);
  ctx.status = 200;
  ctx.body = { allpost, posts, page };
};

const newones: Controller = async (ctx) => {
  const { last } = ctx.params;
  const posts = await db.jobs
    .find({ createdAt: { $gt: last } })
    .populate('author')
    .sort({ _id: -1 });

  ctx.status = 200;
  ctx.body = posts;
};

const search: Controller = async (ctx) => {
  const { query } = ctx.params;
  const check = await db.searches.findOne({ query });
  if (check) {
    check.viewUp();
  } else {
    db.searches.create({ query });
  }
  const post = await db.jobs
    .find({ $text: { $search: query } })
    .populate('author')
    .sort({ _id: -1 })
    .limit(20);
  ctx.status = 200;
  ctx.body = { data: post, type: 'result' };
};

const deleteone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const item = await db.jobs.findOneAndRemove({ _id: id });
  if (!item) {
    ctx.status = 400;
    ctx.body = { id };
    return;
  }
  await db.comments.deleteMany({ post: id }).exec;
  ctx.status = 200;
  ctx.body = { id: id, category: item?.category };
};

export default {
  create,
  deleteone,
  alljob,
  jobpage,
  update,
  newones,
  byCategory,
  findone,
  search,
  latest,
};
