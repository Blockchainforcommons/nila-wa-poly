const { Server, Socket } = require('socket.io');

export let socketInstance: typeof Socket | undefined;
export const socketServer = (server: any) => {
  const io = new Server(server);
  io.on('connection', (socket: any) => {
    console.log('a user connected');
    socketInstance = socket;

    socket.on('messageFromClient', (data: any) => {
      console.log('Received message from client:', data);
    });

    socket.on('disconnect', () => {
      console.log('a user disconnected');
    });
  });
};
