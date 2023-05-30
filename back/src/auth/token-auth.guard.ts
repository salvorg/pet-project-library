import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../routes/users/user.entity';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.get('Authorization');

    if (!token) {
      return false;
    }

    const user = await this.usersRepository.findOne({
      where: {
        token,
      },
    });

    if (!user) {
      return false;
    }

    request.user = user;

    return true;
  }
}
