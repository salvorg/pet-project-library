import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../authors/author.entity';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/createBook.dto';
import { Genre } from '../genres/genre.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepo: Repository<Author>,
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
    @InjectRepository(Genre)
    private readonly genresRepo: Repository<Genre>,
  ) {}

  async getAll(): Promise<Book[]> {
    const books = await this.booksRepo.find({ relations: ['authors', 'genres'] });

    if (!books.length) {
      throw new NotFoundException('No books found!');
    }

    return books;
  }

  async getOne(id: number): Promise<Book> {
    return await this.getBookById(id);
  }

  async createBook(file: Express.Multer.File, body: CreateBookDto): Promise<Book> {
    await this.checkForExistingBook(body.title, body.description, body.publisher);

    const [authors, genres] = await Promise.all([this.findAuthorsById(body.authors), this.findGenresById(body.genres)]);

    const book = await this.booksRepo.create({
      authors,
      genres,
      title: body.title,
      description: body.description,
      availableCopies: body.availableCopies,
      image: file ? '/uploads/books/images/' + file.filename : null,
    });

    return await this.booksRepo.save(book);
  }

  async updateBook(id: number, file: Express.Multer.File, body: CreateBookDto): Promise<Book> {
    const book = await this.getBookById(id);

    book.authors = await this.findAuthorsById(body.authors);
    book.genres = await this.findGenresById(body.genres);
    book.title = body.title;
    book.description = body.description;
    book.availableCopies = body.availableCopies;
    book.image = file ? '/uploads/books/images/' + file.filename : null;

    return await this.booksRepo.save(book);
  }

  async removeBook(id: number): Promise<{ message: string }> {
    const book = await this.getBookById(id);
    book.authors = [];
    await this.booksRepo.save(book);
    await this.authorsRepo.delete(id);
    return { message: 'Book successfully deleted!' };
  }

  async checkForExistingBook(title: string, description: string, publisher: string): Promise<void> {
    const existingBook = await this.booksRepo.findOne({ where: { title, description, publisher } });

    if (existingBook) {
      throw new BadRequestException(`${title} already exists`);
    }
  }

  private async getBookById(id: number): Promise<Book> {
    const book = await this.booksRepo.findOne({ where: { id }, relations: ['authors', 'genres'] });

    if (!book) {
      throw new NotFoundException('Book not found!');
    }

    return book;
  }

  private async findAuthorsById(idArray: number[] | null): Promise<Author[] | null> {
    if (idArray === null) {
      return null;
    } else {
      const authors: Author[] = [];

      for (let i = 0; i < idArray.length; i++) {
        const author = await this.authorsRepo.findOne({ where: { id: idArray[i] } });
        if (author) {
          authors.push(author);
        }
      }

      if (!authors.length) {
        throw new NotFoundException('Authors not found');
      }
      return authors;
    }
  }

  private async findGenresById(idArray: number[] | null): Promise<Genre[] | null> {
    if (idArray === null) {
      return null;
    } else {
      const genres: Genre[] = [];

      for (let i = 0; i < idArray.length; i++) {
        const genre = await this.genresRepo.findOne({ where: { id: idArray[i] } });
        if (genre) {
          genres.push(genre);
        }
      }

      if (!genres.length) {
        throw new NotFoundException('Genres not found');
      }
      return genres;
    }
  }
}
