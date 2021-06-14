import socketio from 'socket.io';
import { Server } from 'http';
import db from 'db';
export let io: ReturnType<typeof socketio>;

const init = (server: Server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    socket.on('createSession', async (userId) => {
      await db.sessions.deleteMany({ userId });
<<<<<<< HEAD
=======

>>>>>>> 9c369d8c85d742c35f60cf09e45a40d83e494789
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
