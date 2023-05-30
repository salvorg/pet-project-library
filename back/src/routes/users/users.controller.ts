import { Body, ClassSerializerInterceptor, Controller, Delete, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { TokenAuthGuard } from '../../auth/token-auth.guard';
import { CurrentUser } from '../../auth/currentUser.decorator';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() body: RegisterDto) {
    return this.usersService.registerUser(body.email, body.firstName, body.lastName, body.password);
  }

  @Post('google-authentication')
  @UseInterceptors(ClassSerializerInterceptor)
  async registerUserWithGoogle(@Body() body: { accessToken: string }) {
    return this.usersService.registerUserWithGoogle(body.accessToken);
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async loginUser(@Body() body: { email: string; password: string }) {
    return this.usersService.loginUser(body.email, body.password);
  }

  @Delete('logout')
  @UseGuards(TokenAuthGuard)
  async logoutUser(@CurrentUser() user: User) {
    return this.usersService.logoutUser(user.id);
  }
}
