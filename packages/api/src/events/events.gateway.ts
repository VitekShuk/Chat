import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    ConnectedSocket,
  } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { Message } from '../messages/message.entity';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { AuthService } from '../auth/auth.service';
  
  @WebSocketGateway()
  export class EventsGateway {
    constructor(
      private readonly messagesService: MessagesService,
      private readonly authService: AuthService,
      ) {}
    @WebSocketServer()
    server: Server;

    // @UseGuards(JwtAuthGuard)
    @SubscribeMessage('events')
    handleEvent(
      @MessageBody() data: string,
      @ConnectedSocket() client: Socket,
      payload: string,
    ): Promise<Message[] | Message | void> {
      const stringCookie = client.handshake.headers.cookie
      const arrayCookie = stringCookie.split("; ")
      const userToken = arrayCookie.find(item => item.indexOf("token=") != (-1)).split("=")[1]
      let jsonData = JSON.parse(data).data
  
      return this.authService.getVerifyUser(userToken)
        .then((user: any): CreateMessageDto => { 
          jsonData.login = user.login
          const newMessageData: CreateMessageDto = jsonData

          return newMessageData;
        })
        .then((newMessageData) => {
          
          return this.messagesService.createMessage(newMessageData)
        })
        .then(() => {
          
          return this.messagesService.findAllMessages()
        })
        .then((messages: Message[]) => {
          this.server.emit('messages', messages)
        })
    }

    // @UseGuards(JwtAuthGuard)
    @SubscribeMessage('messages')
    getAllMessages(
      @MessageBody() data: string,
      @ConnectedSocket() client: Socket,
    ): Promise<Message[] | Message> {

      return this.messagesService.findAllMessages();
    }

  }
