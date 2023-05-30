import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Genre } from '../routes/genres/genre.entity';
import { AuthorsFixtures } from './authors.fixtures';
import { UsersFixtures } from './users.fixtures';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../routes/authors/author.entity';
import { Book } from '../routes/books/book.entity';
import { User } from '../routes/users/user.entity';
import { GenresFixtures } from './genres.fixtures';
import { BooksFixtures } from './books.fixtures';

@Injectable()
export class FixturesService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Author)
    private readonly authorsRepo: Repository<Author>,
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
    @InjectRepository(Genre)
    private readonly genresRepo: Repository<Genre>,
    private readonly usersFixtures: UsersFixtures,
    private readonly authorsFixtures: AuthorsFixtures,
    private readonly genresFixtures: GenresFixtures,
    private readonly booksFixtures: BooksFixtures,
  ) {}

  async dropTables(): Promise<void> {
    await this.usersRepo.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');
    await this.authorsRepo.query('TRUNCATE TABLE "author" RESTART IDENTITY CASCADE');
    await this.booksRepo.query('TRUNCATE TABLE "book" RESTART IDENTITY CASCADE');
    await this.genresRepo.query('TRUNCATE TABLE "genre" RESTART IDENTITY CASCADE');
  }

  async createFixtures() {
    await this.usersFixtures.createUsers();
    await this.authorsFixtures.createAuthors();
    await this.genresFixtures.createGenres();
    await this.booksFixtures.createBooks();
  }
}
