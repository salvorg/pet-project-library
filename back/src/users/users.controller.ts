import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';

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

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async loginUser(@Body() body: { email: string; password: string }) {
    return this.usersService.loginUser(body.email, body.password);
  }
}
