import socketio from 'socket.io';
import { Server } from 'http';
import db from 'db';
export let io: ReturnType<typeof socketio>;

const init = (server: Server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    socket.on('createSession', async (userId) => {
      await db.sessions.deleteMany({ userId });
      await db.sessions.create({ userId, connectionId: socket.id });
    });
    // socket.on('background', () => {
    //   // session 삭제
    // })
    socket.on('disconnect', async () => {
      await db.sessions.deleteMany({ connectionId: socket.id });
    });
  });
};

export default init;
