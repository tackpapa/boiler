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
    socket.on('bringchats', async (userId) => {
      const savedchats = await db.chats.find({ to: userId }).sort({ _id: 1 });
      savedchats.forEach((i) => {
        io.emit(userId.connectionId).emit('chat', i.msg);
      });
    });
    socket.on('disconnect', async () => {
      await db.sessions.deleteMany({ connectionId: socket.id });
    });
  });
};

export default init;
