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

  async getAll(search: string): Promise<Book[]> {
    const query = await this.booksRepo
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.authors', 'author')
      .leftJoinAndSelect('book.genres', 'genre')
      .select(['book', 'author.name', 'genre.name']);

    if (search) {
      query.where('book.title ILIKE :query', { query: `%${search}%` });
    }

    const books = await query.getMany();

    if (search && !books.length) {
      throw new NotFoundException('No matches!');
    }

    if (!books.length) {
      throw new NotFoundException('No books found!');
    }

    const booksApi = [];

    for (let i = 0; i < books.length; i++) {
      const authors = [];
      for (let j = 0; j < books[i].authors.length; j++) {
        authors.push(books[i].authors[j].name);
      }
      const genres = [];
      for (let k = 0; k < books[i].genres.length; k++) {
        genres.push(books[i].genres[k].name);
      }

      booksApi.push({
        id: books[i].id,
        authors,
        genres,
        label: books[i].title,
        description: books[i].description,
        image: books[i].image,
        availableCopies: books[i].availableCopies,
        publisher: books[i].publisher,
      });
    }

    return booksApi;
  }

  async getOne(id: number): Promise<Book> {
    const book = await this.getBookById(id);

    const authors = [];
    for (let j = 0; j < book.authors.length; j++) {
      authors.push(book.authors[j].name);
    }
    const genres = [];
    for (let k = 0; k < book.genres.length; k++) {
      genres.push(book.genres[k].name);
    }

    book.authors = authors;
    book.genres = genres;

    return book;
  }

  async createBook(file: Express.Multer.File, body: CreateBookDto): Promise<Book> {
    await this.checkForExistingBook(body.title, body.description, body.publisher);
    const parsedAuthors = JSON.parse(body.authors);
    const parsedGenres = JSON.parse(body.genres);

    const [authors, genres] = await Promise.all([
      this.findAuthorsById(parsedAuthors),
      this.findGenresById(parsedGenres),
    ]);

    const book = this.booksRepo.create({
      authors,
      genres,
      title: body.title,
      description: body.description,
      availableCopies: parseFloat(body.availableCopies),
      publisher: body.publisher,
      image: file ? '/uploads/books/images/' + file.filename : null,
    });

    return await this.booksRepo.save(book);
  }

  async updateBook(id: number, file: Express.Multer.File, body: CreateBookDto): Promise<Book> {
    const book = await this.getBookById(id);

    const parsedAuthors = JSON.parse(body.authors);
    const parsedGenres = JSON.parse(body.genres);

    book.authors = await this.findAuthorsById(parsedAuthors);
    book.genres = await this.findGenresById(parsedGenres);
    book.title = body.title;
    book.description = body.description;
    book.availableCopies = parseFloat(body.availableCopies);
    book.publisher = body.publisher;
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

  async getBookById(id: number): Promise<Book> {
    const book = await this.booksRepo.findOne({ where: { id }, relations: ['authors', 'genres'] });

    if (!book) {
      throw new NotFoundException('Book not found!');
    }

    return book;
  }

  private async findAuthorsById(idArray: string[] | null): Promise<Author[] | null> {
    if (idArray === null) {
      return null;
    } else {
      const authors: Author[] = [];

      for (let i = 0; i < idArray.length; i++) {
        const author = await this.authorsRepo.findOne({ where: { name: idArray[i] } });
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

  private async findGenresById(idArray: string[] | null): Promise<Genre[] | null> {
    if (idArray === null) {
      return null;
    } else {
      const genres: Genre[] = [];

      for (let i = 0; i < idArray.length; i++) {
        const genre = await this.genresRepo.findOne({ where: { name: idArray[i] } });
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
