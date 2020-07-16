import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from '../users/dto/user-login.dto';
import { User } from './user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  login(loginUserDto: LoginUserDto): Promise<any> {
    return this.userRepository.signIn(loginUserDto);
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.signUp(createUserDto)
  }

  findOneUserById(id: number): Promise<User> {
    return this.userRepository.findOneUserById(id);
  }

  findOneUserByLogin(login: string): Promise<User> {
    return this.userRepository.findOneUserByLogin(login);
  }
}