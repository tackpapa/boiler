import db from 'db';
import { Controller } from './types';
import upload from '../utils/s3';
import fs from 'fs';
import sharp from 'sharp';

const { PassThrough } = require('stream');

const create: Controller = async (ctx) => {
  const { title, context, tags, category } = ctx.request.body;
  const author = ctx.state.user._id;
  const user = await db.users.findOneAndUpdate(
    { _id: author },
    { $inc: { exp: +10 } }
  );
  user?.save();

  const item = await db.posts.create({
    title,
    context,
    author,
    tags,
    category,
  });
  const post = await db.posts.findOne({ _id: item._id }).populate('author');
  if (ctx.request.files.pic === undefined) {
    return (ctx.status = 200), (ctx.body = post);
  }
  if (ctx.request.files.pic.length > 0) {
    const arr = ctx.request.files.pic;

    arr.forEach(async ({ path }: { path: string }, i: number) => {
      const body = sharp(path).resize(200, 200).png();
      var param = {
        Bucket: 'ridasprod',
        Key: `postimage/${item._id + i}`,
        ACL: 'public-read',
        Body: body.pipe(PassThrough()),
        ContentType: 'image/png',
      };
      const lala = await upload(param);
      await (item as any).pics.push(lala.Location); //문제있는 부분;
      if (i === arr.length - 1) {
        await item.save();
      }
    });
  } else {
    const arr = [ctx.request.files.pic];

    arr.forEach(async ({ path }: { path: string }, i: number) => {
      const body = sharp(path).resize(200, 200).png();
      var param = {
        Bucket: 'ridasprod',
        Key: `postimage/${item._id + i}`,
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
  }
  const post2 = await db.posts.findOne({ _id: item._id }).populate('author');
  ctx.status = 200;
  ctx.body = post2;
};

const update: Controller = async (ctx) => {
  const { id } = ctx.params;
  const { context, title, tags, category } = ctx.request.body;
  const newtag = JSON.parse(tags);
  const post = await db.posts.findOneAndUpdate(
    { _id: id },
    {
      context: context,
      tags: newtag,
      title: title,
      category: category,
    },
    { new: true }
  );

  ctx.status = 200;
  ctx.body = post;
};

const findone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post: any = await db.posts
    .findOne({ _id: id })
    .populate('author')
    .populate('comments');
  post?.viewUp();
  ctx.status = 200;
  ctx.body = post;
};

const likeone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post: any = await db.posts.findOne({ _id: id });
  const user: any = await db.users.findOne({ _id: ctx.state.user._id });
  await user.liked.push(post._id);
  user.save();
  post?.likeUp();
  ctx.body = id;
  ctx.status = 200;
};
const dislikeone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post: any = await db.posts.findOne({ _id: id });
  const user: any = await db.users.findOne({ _id: ctx.state.user._id });
  const index = user.liked.filter((item: string) =>
    item === id ? false : true
  );
  user.liked = index;
  user.save();
  post?.likeDown();
  ctx.body = id;
  ctx.status = 200;
};

const search: Controller = async (ctx) => {
  const { query } = ctx.params;
  const check = await db.searches.findOne({ query });
  if (check) {
    check.viewUp();
  } else {
    db.searches.create({ query });
  }
  const post = await db.posts
    .find({ $text: { $search: query } })
    .populate('author')
    .sort({ _id: 1 })
    .limit(10);
  ctx.status = 200;
  ctx.body = { data: post, type: 'result' };
};

const byCategory: Controller = async (ctx) => {
  const { query, last } = ctx.params;
  const post = await db.posts
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
  const posts = await db.posts
    .find({ createdAt: { $lt: last } })
    .populate('author')
    .sort({ _id: -1 })
    .limit(15);
  ctx.status = 200;
  ctx.body = posts;
};

const deleteone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const cola = await db.posts.findOneAndRemove({ _id: id });
  await db.comments.deleteMany({ post: id }).exec;
  ctx.status = 200;
  ctx.body = { id: id, category: cola?.category };
};

export default {
  create,
  deleteone,
  likeone,
  dislikeone,
  update,
  findone,
  search,
  byCategory,
  latest,
};
