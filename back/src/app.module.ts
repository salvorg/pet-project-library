import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/author.entity';
import { Book } from './books/book.entity';
import { Genre } from './genres/genre.entity';
import { AuthorsController } from './authors/authors.controller';
import { BooksController } from './books/books.controller';
import { GenresController } from './genres/genres.controller';
import { AuthorsService } from './authors/authors.service';
import { BooksService } from './books/books.service';
import { GenresService } from './genres/genres.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, TypeOrmModule.forFeature([Author, Book, Genre])],
  controllers: [AuthorsController, BooksController, GenresController],
  providers: [AuthorsService, BooksService, GenresService],
})
export class AppModule {}
