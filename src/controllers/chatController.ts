import db from 'db';
import { Controller } from './types';
import { io } from 'socket';
import push from '../utils/expo';
import { User } from 'models/users';

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
    io.to(target.connectionId).emit('message', {
      type: 'GET_CHAT',
      payload: item,
    });
  } else {
    const userto = await db.users.findById(to);
    if (userto) {
      push(
        [userto],
        `[채팅] ${((item.from as unknown) as User).name} : ${msg}`
      );
    }
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
        createdAt: {
          $gt: new Date(parseInt(ctx.params.date, 10)),
        },
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

const delchat: Controller = async (ctx) => {
  const { _id } = ctx.request.body;

  ctx.body = _id;
  ctx.status = 200;
};

export default {
  send,
  delchat,
  bringchats,
};
