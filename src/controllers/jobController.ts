import db from 'db';
import { Controller } from './types';
import upload from '../utils/s3';
import fs from 'fs';

const create: Controller = async (ctx) => {
  const { title, context, tags, location } = ctx.request.body;
  const author = ctx.state.user._id;
  const user = await db.users.findOneAndUpdate(
    { _id: author },
    { $inc: { exp: +10 } }
  );
  user?.save();
  const newtag = JSON.parse(tags);
  const item = await db.jobs.create({
    title,
    context,
    author,
    tags: newtag,
    location,
  });

  []
    .concat(ctx.request.files.pic)
    .forEach(async ({ path }: { path: string }, i: number) => {
      var param = {
        Bucket: 'ridasprod',
        Key: `jobimage/${item._id + i}`,
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
  const { context, title, tags, location } = ctx.request.body;
  const newtag = JSON.parse(tags);
  const author = ctx.state.user._id;
  const post = await db.jobs.findOneAndUpdate(
    { _id: id },
    {
      context: context,
      tags: newtag,
      title: title,
      location: location,
    }
  );
  (post as any).save();
  ctx.status = 200;
};

const findone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post = await db.jobs
    .findOne({ _id: id })
    .populate('author')
    .populate('comments');
  post?.viewUp();
  ctx.status = 200;
  ctx.body = post;
};

const latest: Controller = async (ctx) => {
  const posts = await db.jobs
    .find()
    .populate('comments')
    .sort({ _id: -1 })
    .limit(20);
  ctx.status = 200;
  ctx.body = posts;
};

const search: Controller = async (ctx) => {
  const { query } = ctx.params;
  const post = await db.jobs.find({ $text: { $search: query } });
  ctx.status = 200;
  ctx.body = post;
};

const deleteone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post = await db.jobs.findOneAndRemove({ _id: id });
  ctx.status = 200;
};

export default { create, deleteone, update, findone, search, latest };
