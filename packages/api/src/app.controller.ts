import { Controller, Get, Post, Query, UseGuards, Header } from '@nestjs/common';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';
// import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    ) {}

  @Post('signup')
  create(@Query() user: User): Promise<any> {

    return this.usersService.create(user).then((user: User): Promise<any> => {
      console.log("!!!!!!", user)
      return this.authService.login(user)
    });
  }

  //@UseGuards(LocalAuthGuard)
  @Post('signin')
  
  login(@Query() user: User): Promise<any> {

    return this.usersService.findOneUserByLogin(user.login).then((user: User): Promise<any> => {
      console.log("!!!!!!", user)
      return this.authService.login(user)
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  findOne(@Query() data: any): Promise<User> {
    console.log("@Param('id'):", data.id)
    return this.usersService.findOneUserById(Number(data.id));
  }
}