import {
  OnGatewayInit,
  SubscribeMessage,
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { logger } from '@animando/logger';
import { Server, Socket } from 'socket.io';
import { validateToken } from '@animando/clerk-auth';

const wsPort = Number(process.env['WEBSOCKET_PORT'] || '22201');

type JoinRoomRequestPayload = {
  room: string;
};

@WebSocketGateway(wsPort, {
  cors: {
    origin: '*',
  },
  allowRequest: async (req, callback) => {
    const token = req.headers['authorization']?.split(' ')?.[1];
    const success = await validateToken(token);
    callback(null, success);
  },
})
export class WebsocketEventsGateway
  implements
    OnGatewayInit<Server>,
    OnGatewayConnection<Socket>,
    OnGatewayDisconnect<Socket>
{
  @WebSocketServer()
  private server?: Server;

  afterInit(server: Server) {
    this.server = server;
    server.disconnectSockets();
    logger.info(`Websocket server initialized on port ${wsPort}`);
  }

  async handleConnection(client: Socket, ...args: unknown[]) {
    logger.info('client connected', { id: client.id, args });
    await client.join('connected');
  }

  handleDisconnect(client: Socket) {
    logger.info('client disconnected', { id: client.id });
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(
    @MessageBody() val: JoinRoomRequestPayload,
    @ConnectedSocket() socket: Socket
  ): Promise<void> {
    logger.info('client joined room', { clientId: socket.id, room: val.room });
    await socket.join(val.room);
  }

  async sendMessageToRoom(room: string, message: string, payload: unknown) {
    if (!this.server) {
      return false;
    }
    logger.info('num connected', {
      n: (await this.server.fetchSockets()).length,
    });
    return this.server.in(room).emit(message, payload);
  }

  async sendMessageToAllClients(message: string, payload: unknown) {
    if (!this.server) {
      return false;
    }
    return this.server.emit(message, payload);
  }
}
