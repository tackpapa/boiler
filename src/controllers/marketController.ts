import db from 'db';
import { Controller } from './types';
import upload from '../utils/s3';
import fs from 'fs';
import sharp from 'sharp';

const { PassThrough } = require('stream');

const create: Controller = async (ctx) => {
  const { title, context, tags, price, location } = ctx.request.body;
  const author = ctx.state.user._id;
  const user = await db.users.findOneAndUpdate(
    { _id: author },
    { $inc: { exp: +10 } }
  );
  user?.save();

  const item = await db.markets.create({
    title,
    context,
    author,
    tags,
    price,
    location,
  });
  if (ctx.request.files.pic === undefined) {
    return (ctx.status = 200), (ctx.body = item);
  }
  if (ctx.request.files.pic.length > 0) {
    const arr = ctx.request.files.pic;

    arr.forEach(async ({ path }: { path: string }, i: number) => {
      const body = sharp(path).resize(200, 200).png();
      var param = {
        Bucket: 'ridasprod',
        Key: `marketimage/${item._id + i}`,
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
  } else {
    const arr = [ctx.request.files.pic];

    arr.forEach(async ({ path }: { path: string }, i: number) => {
      const body = sharp(path).resize(200, 200).png();
      var param = {
        Bucket: 'ridasprod',
        Key: `marketimage/${item._id + i}`,
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

  ctx.status = 200;
  ctx.body = item;
};

const update: Controller = async (ctx) => {
  const { id } = ctx.params;
  const { context, title, tags, price, location, category } = ctx.request.body;
  const newtag = JSON.parse(tags);
  const author = ctx.state.user._id;
  const post = await db.markets.findOneAndUpdate(
    { _id: id },
    {
      context: context,
      tags: newtag,
      title: title,
      price: price,
      cateogory: category,
      location: location,
    }
  );
  ctx.status = 200;
  ctx.body = post;
};

const findone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post = await db.markets.findOne({ _id: id }).populate('comments');
  post?.viewUp();
  ctx.status = 200;
  ctx.body = post;
};

const search: Controller = async (ctx) => {
  const { query } = ctx.params;
  const post = await db.markets
    .find({ $text: { $search: query } })
    .populate('author')
    .sort({ _id: -1 })
    .limit(10);
  ctx.status = 200;
  ctx.body = { data: post, type: 'result' };
};

const latest: Controller = async (ctx) => {
  const posts = await db.markets
    .find()
    .populate('comments')
    .sort({ _id: -1 })
    .limit(20);
  ctx.status = 200;
  ctx.body = posts;
};

const byCategory: Controller = async (ctx) => {
  const { query } = ctx.params;
  const post = await db.markets
    .find({ category: query })
    .populate('author')
    .sort({ _id: -1 })
    .limit(5);
  ctx.status = 200;
  ctx.body = { data: post, type: query };
};

const deleteone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post = await db.markets.findOneAndRemove({ _id: id });
  ctx.status = 200;
  ctx.body = 'deleted;';
};

export default {
  create,
  deleteone,
  update,
  search,
  byCategory,
  findone,
  latest,
};
