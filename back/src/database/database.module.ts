import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Author } from '../authors/author.entity';
import { Book } from '../books/book.entity';
import { Genre } from '../genres/genre.entity';
import { User } from '../users/user.entity';
import { BookBorrowingEntity } from '../bookBorrowings/bookBorrowing.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD') as string,
        database: configService.get('DB_DATABASE'),
        entities: [User, Author, Book, Genre, BookBorrowingEntity],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
