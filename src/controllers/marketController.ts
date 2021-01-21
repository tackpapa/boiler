import db from 'db';
import { Controller } from './types';
import upload from '../utils/s3';
import fs from 'fs';

const viewCount: Controller = async (id) => {
  const viewUp = await db.markets.findByIdAndUpdate(
    { _id: id },
    { $inc: { views: +1 } }
  );
  await viewUp?.save();
};

const create: Controller = async (ctx) => {
  const { title, context, tags, price } = ctx.request.body;
  const author = ctx.state.user._id;
  const newtag = JSON.parse(tags);
  const item = await db.markets.create({
    title,
    context,
    author,
    price,
    tags: newtag,
  });
  const { path } = ctx.request.files.pic;
  const body = fs.createReadStream(path);
  const param = {
    Bucket: process.env.pjt_name,
    Key: `marketimage/${item._id}`,
    ACL: 'public-read',
    Body: body,
    ContentType: 'image/png',
  };
  const up = await upload(param);
  (item as any).pic = up.Location;
  item.save();
  ctx.status = 200;
};

const update: Controller = async (ctx) => {
  const { id } = ctx.params;
  const { context, title, tags } = ctx.request.body;
  const newtag = JSON.parse(tags);
  const author = ctx.state.user._id;
  const post = await db.markets.findOneAndUpdate(
    { _id: id },
    { context: context, tags: newtag, title: title }
  );
  ctx.status = 200;
};

const findone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post = await db.markets.findOne({ _id: id });
  viewCount(id);
  ctx.status = 200;
  ctx.body = post;
};

const latest: Controller = async (ctx) => {
  const posts = await db.markets.find().sort({ _id: -1 }).limit(20);
  ctx.status = 200;
  ctx.body = posts;
};

const deleteone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post = await db.markets.findOneAndRemove({ _id: id });
  ctx.status = 200;
};

export default { create, deleteone, update, findone, latest };
