import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Author } from '../routes/authors/author.entity';
import { Book } from '../routes/books/book.entity';
import { Genre } from '../routes/genres/genre.entity';
import { User } from '../routes/users/user.entity';
import { BookBorrowing } from '../routes/bookBorrowings/bookBorrowing.entity';

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
        entities: [User, Author, Book, Genre, BookBorrowing],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
