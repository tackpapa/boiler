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
    PostModel: postmodel,
    target,
  });
  const map: {
    [key: string]: keyof typeof db;
  } = {
    Post: 'posts',
    Tip: 'tips',
    Question: 'questions',
  };

  ctx.body = comment;
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

const getcomments: Controller = async (ctx) => {
  const { id } = ctx.params;
  const comments: any = await db.comments
    .find({ post: id })
    .populate('author')
    .sort({ _id: -1 });

  ctx.status = 200;
  ctx.body = comments;
};

const allcomment: Controller = async (ctx) => {
  const { last } = ctx.params;
  const comments = await db.comments
    .find({ createdAt: { $lt: last } })
    .populate('author')
    .sort({ _id: -1 })
    .limit(30);
  ctx.status = 200;
  ctx.body = comments;
};

export default { create, deleteone, update, getcomments, allcomment };
