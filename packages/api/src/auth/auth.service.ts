import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async getVerifyUser(token: string): Promise<any> | never {

    return this.jwtService.verify(token);
  } 

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUserByLogin(login);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { login: user.login, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}