import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { MessageRepository } from '../repositories/message.repository';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: MessageRepository,
  ) {}

  createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = new Message();
    message.text = createMessageDto.text;
    message.login = createMessageDto.login;

    return this.messageRepository.save(message);
  }

  findAllMessages(): Promise<Message[]> {
    return this.messageRepository.find();
  }
}