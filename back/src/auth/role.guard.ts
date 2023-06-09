import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../routes/users/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User | undefined;
    return user.role === 'admin';
  }
}
