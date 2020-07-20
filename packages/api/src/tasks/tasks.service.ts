import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import {getConnection} from "typeorm"
import { Message } from '../messages/message.entity'
import { User } from '../users/user.entity'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('0 59 23 * * *')
  handleCron() {
    this.logger.debug('Delete all users and messages once a day')
    
    getConnection()
        .createQueryBuilder()
        .delete()
        .from(Message)
        .execute();
    
    getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .execute();
    
  }
}