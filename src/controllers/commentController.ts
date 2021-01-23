import db from 'db';
import { Controller } from './types';

const create: Controller = async (ctx) => {
  const { text, post } = ctx.request.body;
  const author = ctx.state.user._id;
  const user = await db.users.findOneAndUpdate(
    { _id: author },
    { $inc: { exp: +2 } }
  );
  user?.save();
  const comment = await db.comments.create({
    text,
    author,
    post,
  });
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
