import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import axios from 'axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async getAll(search: string) {
    if (search) {
      const users = await this.usersRepo
        .createQueryBuilder('user')
        .select('user')
        .where('user.firstName ILIKE :query', { query: `%${search}%` })
        .getMany();

      if (!users.length) {
        throw new NotFoundException('No matches!');
      }

      const foundUsers = [];

      for (let i = 0; i < users.length; i++) {
        foundUsers.push({
          id: users[i].id,
          label: users[i].firstName + ' ' + users[i].lastName,
        });
      }

      return foundUsers;
    }
  }

  async registerUser(email: string, firstName: string, lastName: string, password: string) {
    const existUser = await this.usersRepo.findOne({ where: { email } });

    if (existUser) {
      throw new BadRequestException({ email: ['This email is already registered!'] });
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

  async registerUserWithGoogle(accessToken: string) {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);

      const { email, id: googleId, given_name: firstName, family_name: lastName } = response.data;

      if (!email) {
        return new BadRequestException('Not enough user data to continue.');
      }

      let user = await this.usersRepo.findOne({
        where: { googleId },
      });

      if (!user) {
        user = await this.usersRepo.create({
          email,
          firstName,
          lastName,
          googleId,
          password: randomUUID(),
        });

        await user.generateToken();
        return await this.usersRepo.save(user);
      }
      return user;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async logoutUser(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } });
    await user.generateToken();
    await this.usersRepo.save(user);
    return { message: 'Logout success' };
  }
}
