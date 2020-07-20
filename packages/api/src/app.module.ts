import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { RepositoriesModule } from './repositories/repositores.module';
import { AppController } from './app.controller';
import { EventsModule } from './events/events.module';
import { MessagesModule } from './messages/messages.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ 
    AuthModule,
    UsersModule, 
    TypeOrmModule.forRoot(),
    RepositoriesModule,
    EventsModule,
    MessagesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [AppController],
  providers: [],
})

export class AppModule {
  constructor(private connection: Connection) {}
}
