import db from 'db';
import { Controller } from './types';
import { io } from 'socket';

const send: Controller = async (ctx) => {
  const { msg, targetId } = ctx.request.body;
  await db.chats.create({ from: ctx.state.user._id, to: targetId, msg });
  const target = await db.sessions.findOne({ userId: targetId });
  if (target) {
    io.to(target.connectionId).emit('chat', msg);
  } else {
    console.error;
  }
  ctx.status = 200;
};

const bringchats: Controller = async (ctx) => {
  if (ctx.params.date) {
    const chats = await db.chats
      .find({
        $or: [{ to: ctx.state.user._id }, { from: ctx.state.user._id }],
        createdAt: { $gt: ctx.params.date },
      })
      .populate('to', 'name')
      .populate('from', 'name');

    ctx.body = chats;
    ctx.status = 200;
  } else {
    const chats = await db.chats
      .find({
        $or: [{ to: ctx.state.user._id }, { from: ctx.state.user._id }],
      })
      .populate('to', 'name')
      .populate('from', 'name');

    ctx.body = chats;
    ctx.status = 200;
  }
};

export default {
  send,
  bringchats,
};
