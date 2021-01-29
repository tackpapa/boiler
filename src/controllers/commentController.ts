import db from 'db';
import { Controller } from './types';

const create: Controller = async (ctx) => {
  const { text, post, postmodel, target } = ctx.request.body;
  const author: any = await db.users.findOne({ _id: ctx.state.user._id });
  const expup = await db.users.findOneAndUpdate(
    { _id: author._id },
    { $inc: { exp: +1 } }
  );
  expup?.save();
  const comment = await db.comments.create({
    text,
    author: author,
    post,
    postmodel,
    target,
  });
  const map: {
    [key: string]: keyof typeof db;
  } = {
    Post: 'posts',
    Job: 'jobs',
    Market: 'markets',
  };
  try {
    const cmtpush = await db[map[postmodel]].findOne({ _id: post });
    await (cmtpush as any).comments.push(comment._id);
    cmtpush?.save();
  } catch (err) {}

  ctx.status = 200;
};

const update: Controller = async (ctx) => {
  const id = ctx.params.id;
  const { text } = ctx.request.body;
  const up = await db.comments.findOneAndUpdate(
    { _id: id },
    {
      text,
    }
  );
  ctx.status = 200;
};

const deleteone: Controller = async (ctx) => {
  const id = ctx.params.id;
  const del = await db.comments.findOneAndDelete({
    _id: id,
  });
  ctx.status = 200;
};

export default { create, deleteone, update };
