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
      // socket.emit('message', {
      //   type: 'CREATE_CHAT#SUCCESS',
      //   payload: {
      //     _id: '1',
      //     from: '1',
      //     to: '2',
      //     msg: 'asdf',
      //   },
      // });
    });

    socket.on('disconnect', async () => {
      await db.sessions.deleteMany({ connectionId: socket.id });
    });
  });
};

export default init;
