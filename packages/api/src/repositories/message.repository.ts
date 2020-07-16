import { EntityRepository, Repository } from "typeorm"
import {  Message } from '../messages/message.entity';
import { CreateMessageDto } from '../messages/dto/create-message.dto';

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
    createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
        const message = new Message();
        message.text = createMessageDto.text;
        message.login = createMessageDto.login;

        return this.save(message);
    }

    getMessages(): Promise<Message[]> {

        return this.find();
    }
}