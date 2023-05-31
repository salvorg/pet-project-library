import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './routes/authors/author.entity';
import { Book } from './routes/books/book.entity';
import { Genre } from './routes/genres/genre.entity';
import { AuthorsController } from './routes/authors/authors.controller';
import { BooksController } from './routes/books/books.controller';
import { GenresController } from './routes/genres/genres.controller';
import { AuthorsService } from './routes/authors/authors.service';
import { BooksService } from './routes/books/books.service';
import { GenresService } from './routes/genres/genres.service';
import { UsersController } from './routes/users/users.controller';
import { UsersService } from './routes/users/users.service';
import { User } from './routes/users/user.entity';
import { GoogleBooksApiController } from './fixtures/googleBooksApi.controller';
import { BookBorrowing } from './routes/bookBorrowings/bookBorrowing.entity';
import { SeedCommand } from './fixtures/seed.command';
import { FixturesService } from './fixtures/fixtures.service';
import { UsersFixtures } from './fixtures/users.fixtures';
import { AuthorsFixtures } from './fixtures/authors.fixtures';
import { GenresFixtures } from './fixtures/genres.fixtures';
import { BooksFixtures } from './fixtures/books.fixtures';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([User, Author, Book, Genre, BookBorrowing]),
  ],
  controllers: [UsersController, AuthorsController, BooksController, GenresController, GoogleBooksApiController],
  providers: [
    UsersService,
    AuthorsService,
    BooksService,
    GenresService,
    UsersFixtures,
    AuthorsFixtures,
    GenresFixtures,
    BooksFixtures,
    FixturesService,
    SeedCommand,
  ],
})
export class AppModule {}
