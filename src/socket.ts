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
    const deleteSession = async () => {
      await db.sessions.deleteMany({ connectionId: socket.id });
    };
    socket.on('background', deleteSession);
    socket.on('disconnect', deleteSession);
  });
};

export default init;
