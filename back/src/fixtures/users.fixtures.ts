import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class UsersFixtures {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async createUsers() {
    const user = await this.usersRepo.create({
      email: 'user@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password',
    });
    await user.generateToken();
    await this.usersRepo.save(user);

    const userSecond = await this.usersRepo.create({
      email: 'user-second@gmail.com',
      firstName: 'Jane',
      lastName: 'Doe',
      password: 'password',
    });
    await userSecond.generateToken();
    await this.usersRepo.save(userSecond);

    const admin = await this.usersRepo.create({
      email: 'admin@gmail.com',
      firstName: 'Jane',
      lastName: 'Doe',
      password: 'password',
      role: 'admin',
    });
    await admin.generateToken();
    await this.usersRepo.save(admin);
  }
}
