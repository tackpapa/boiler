import db from 'db';
import { Controller } from './types';
import upload from '../utils/s3';
import fs from 'fs';

const create: Controller = async (ctx) => {
  const { title, context, tags, price } = ctx.request.body;
  const author = ctx.state.user._id;
  const user = await db.users.findOneAndUpdate(
    { _id: author },
    { $inc: { exp: +10 } }
  );
  user?.save();
  const newtag = JSON.parse(tags);
  const item = await db.markets.create({
    title,
    context,
    author,
    tags: newtag,
    price,
  });

  []
    .concat(ctx.request.files.pic)
    .forEach(async ({ path }: { path: string }, i: number) => {
      var param = {
        Bucket: 'ridasprod',
        Key: `marketimage/${item._id + i}`,
        ACL: 'public-read',
        Body: await fs.createReadStream(path),
        ContentType: 'image/png',
      };
      const lala = await upload(param);
      await (item as any).pics.push(lala.Location);
      item.save();
    });

  ctx.status = 200;
};

const update: Controller = async (ctx) => {
  const { id } = ctx.params;
  const { context, title, tags, price } = ctx.request.body;
  const newtag = JSON.parse(tags);
  const author = ctx.state.user._id;
  const post = await db.markets.findOneAndUpdate(
    { _id: id },
    { context: context, tags: newtag, title: title, price: price }
  );
  ctx.status = 200;
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
  const post = await db.markets.find({ $text: { $search: query } });
  ctx.status = 200;
  ctx.body = post;
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

const deleteone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post = await db.markets.findOneAndRemove({ _id: id });
  ctx.status = 200;
};

export default { create, deleteone, update, search, findone, latest };
