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
    console.log('상대가 로그오프상태라서 디비에 저장해뜸');
  }
  ctx.status = 200;
};

export default {
  send,
};
