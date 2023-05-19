import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async registerUser(email: string, firstName: string, lastName: string, password: string) {
    const existUser = await this.usersRepo.findOne({ where: { email } });

    if (existUser) {
      throw new BadRequestException('This email is already registered!');
    }

    const user = this.usersRepo.create({
      email,
      firstName,
      lastName,
      password,
    });

    await user.generateToken();
    return await this.usersRepo.save(user);
  }

  async loginUser(email: string, password: string) {
    const existUser = await this.usersRepo.findOne({ where: { email } });

    if (!existUser) {
      throw new NotFoundException('This email not found!');
    }

    const isMatch = await existUser.checkPassword(password);

    if (!isMatch) {
      throw new NotFoundException('Password is wrong');
    }

    await existUser.generateToken();
    return await this.usersRepo.save(existUser);
  }

  async logoutUser(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } });
    await user.generateToken();
    await this.usersRepo.save(user);
    return { message: 'Logout success' };
  }
}
