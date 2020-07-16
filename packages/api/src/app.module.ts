import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { RepositoriesModule } from './repositories/repositores.module';
import { AppController } from './app.controller';
import { EventsModule } from './events/events.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [ 
    AuthModule,
    UsersModule, 
    TypeOrmModule.forRoot(),
    RepositoriesModule,
    EventsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [],
})

export class AppModule {
  constructor(private connection: Connection) {}
}
