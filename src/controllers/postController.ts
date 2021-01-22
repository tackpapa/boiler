import db from 'db';
import { Controller } from './types';
import upload from '../utils/s3';
import fs from 'fs';

const create: Controller = async (ctx) => {
  const { title, context, tags, location } = ctx.request.body;
  const author = ctx.state.user._id;
  const newtag = JSON.parse(tags);
  const item = await db.posts.create({
    title,
    context,
    author,
    tags: newtag,
    location,
  });

  ctx.request.files.pic.forEach(
    async ({ path }: { path: string }, i: number) => {
      var param = {
        Bucket: 'ridasprod',
        Key: `postimage/${item._id + i}`,
        ACL: 'public-read',
        Body: await fs.createReadStream(path),
        ContentType: 'image/png',
      };
      const lala = await upload(param);
      await (item as any).pics.push(lala.Location);
    }
  );

  item.save();
  ctx.status = 200;
};

const update: Controller = async (ctx) => {
  const { id } = ctx.params;
  const { context, title, tags, isjob, location } = ctx.request.body;
  const newtag = JSON.parse(tags);
  const author = ctx.state.user._id;
  const post = await db.posts.findOneAndUpdate(
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
  const post = await db.posts.findOne({ _id: id });
  post?.viewUp();
  ctx.status = 200;
  ctx.body = post;
};

const latest: Controller = async (ctx) => {
  const posts = await db.posts.find().sort({ _id: -1 }).limit(20);
  ctx.status = 200;
  ctx.body = posts;
};

const deleteone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const post = await db.posts.findOneAndRemove({ _id: id });
  ctx.status = 200;
};

export default { create, deleteone, update, findone, latest };
