import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RepositoriesModule } from '../repositories/repositores.module'


@Module({
  imports: [RepositoriesModule],
  providers: [UsersService],
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}