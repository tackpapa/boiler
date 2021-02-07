import db from 'db';
import { Controller } from './types';
import upload from '../utils/s3';
import fs from 'fs';

const create: Controller = async (ctx) => {
  const { title, context, tags, category } = ctx.request.body;
  const author = ctx.state.user._id;
  const user = await db.users.findOneAndUpdate(
    { _id: author },
    { $inc: { exp: +10 } }
  );
  user?.save();
  const newtag = JSON.parse(tags);
  const item = await db.posts.create({
    title,
    context,
    author,
    tags: newtag,
    category,
  });

  []
    .concat(ctx.request.files.pic)
    .forEach(async ({ path }: { path: string }, i: number) => {
      var param = {
        Bucket: 'ridasprod',
        Key: `postimage/${item._id + i}`,
        ACL: 'public-read',
        Body: await fs.createReadStream(path),
        ContentType: 'image/png',
      };
      const lala = await upload(param);
      await (item as any).pics.push(lala.Location);
      item.save();
    });

  ctx.status = 200;
  ctx.body = item;
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
    }
  );
  (post as any).save();
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

const search: Controller = async (ctx) => {
  const { query } = ctx.params;
  const post = await db.posts.find({ $text: { $search: query } });
  ctx.status = 200;
  ctx.body = post;
};

const latest: Controller = async (ctx) => {
  const posts = await db.posts
    .find()
    .populate('comments')
    .sort({ _id: -1 })
    .limit(3);
  ctx.status = 200;
  ctx.body = posts;
};

const deleteone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post = await db.posts.findOneAndRemove({ _id: id });
  ctx.status = 200;
  ctx.body = 'deleted;';
};

export default { create, deleteone, update, findone, search, latest };
