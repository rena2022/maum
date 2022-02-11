import io from 'socket.io-client';

export function connectSocket(
  socket: SocketIOClient.Socket | undefined,
): SocketIOClient.Socket {
  socket = io('http://127.0.0.1:8080', {
    path: '/v1/call',
    transports: ['websocket'],
  });
  return socket;
}

export function disconnectSocket(socket: SocketIOClient.Socket) {
  socket.close();
}
