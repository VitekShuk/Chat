import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { MessageRepository } from './message.repository';

@Module({
    imports: [TypeOrmModule.forFeature([
      UserRepository,
      MessageRepository,
    ])],
    exports: [TypeOrmModule]
  })
  
  export class RepositoriesModule {}