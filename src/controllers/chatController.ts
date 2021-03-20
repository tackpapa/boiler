import db from 'db';
import { Controller } from './types';
import { io } from 'socket';

const send: Controller = async (ctx) => {
  const { msg, to } = ctx.request.body;
  const item = await db.chats.create({
    from: ctx.state.user._id,
    to,
    msg,
  });
  await item
    .populate('to', 'name profilepic createdAt')
    .populate('from', 'name profilepic createdAt')
    .execPopulate();
  const target = await db.sessions.findOne({ userId: to });
  if (target) {
    io.to(target.connectionId).emit('chat', msg);
  } else {
    console.error;
  }

  ctx.body = item;
  ctx.status = 200;
};

const bringchats: Controller = async (ctx) => {
  if (ctx.params.date) {
    const chats = await db.chats
      .find({
        $or: [{ to: ctx.state.user._id }, { from: ctx.state.user._id }],
        createdAt: { $gt: ctx.params.date },
      })
      .populate('to', 'name profilepic createdAt')
      .populate('from', 'name profilepic createdAt');

    ctx.body = { chats: chats, id: ctx.state.user._id };
    ctx.status = 200;
  } else {
    const chats = await db.chats
      .find({
        $or: [{ to: ctx.state.user._id }, { from: ctx.state.user._id }],
      })
      .populate('to', 'name profilepic createdAt')
      .populate('from', 'name profilepic createdAt');

    ctx.body = { chats: chats, id: ctx.state.user._id };
    ctx.status = 200;
  }
};

export default {
  send,
  bringchats,
};
