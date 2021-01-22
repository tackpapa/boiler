import socketio from 'socket.io';
import { Server } from 'http';

export let io: ReturnType<typeof socketio>;

const init = (server: Server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    console.log('connected', 'socket');

    socket.on('test', (dd) => {
      console.log(dd);
      socket.emit('test', { name: 'dddd', title: 'dddddd' });
    });
    socket.on('disconnect', () => {
      console.log('disconnected', socket);
    });
  });
};

export default init;
