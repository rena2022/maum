import io from 'socket.io-client';
import { IP } from '../../Constants/keys';

export function connectSocket(
  socket: SocketIOClient.Socket | undefined,
): SocketIOClient.Socket {
  socket = io(`http://${IP}:8080`, {
    path: '/v1/call',
    transports: ['websocket'],
  });
  return socket;
}

export function disconnectSocket(socket: SocketIOClient.Socket) {
  socket.disconnect();
}
