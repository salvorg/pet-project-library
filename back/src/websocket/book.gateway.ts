// import {
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
//
// @WebSocketGateway()
// export class BookGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;
//
//   handleConnection(client: Socket) {
//     // Действия при подключении клиента к WebSocket
//   }
//
//   handleDisconnect(client: Socket) {
//     // Действия при отключении клиента от WebSocket
//   }
//
//   @SubscribeMessage('updateAvailableCopies')
//   handleUpdateAvailableCopies(client: Socket, data: any) {
//     // Обработка обновления доступных копий и отправка обновления всем клиентам
//     // Пример:
//     const bookId = data.bookId;
//     const availableCopies = data.availableCopies;
//
//     // Логика обновления доступных копий в базе данных или где-либо еще
//
//     // Отправка обновления всем клиентам
//     this.server.emit('availableCopiesUpdated', { bookId, availableCopies });
//   }
// }
