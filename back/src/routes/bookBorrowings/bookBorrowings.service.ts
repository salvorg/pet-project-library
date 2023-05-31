import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Book } from '../books/book.entity';
import { BookBorrowing } from './bookBorrowing.entity';

@Injectable()
export class BookBorrowingsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
    @InjectRepository(BookBorrowing)
    private readonly borrowingsRepo: Repository<BookBorrowing>,
  ) {}

  async getAll() {
    return await this.borrowingsRepo.find();
  }

  async createBorrowing(userid: number, bookId: number) {
    const book = await this.getBookById(bookId);

    if (book.availableCopies <= 0) {
      throw new BadRequestException('There is no available copies of this book!');
    } else {
      book.availableCopies -= 1;
    }

    const newBorrowing = await this.borrowingsRepo.create({
      user: await this.getUserById(userid),
      book,
    });

    await this.booksRepo.save(book);
    await this.borrowingsRepo.save(newBorrowing);
    return { message: 'The process has been successfully completed!' };
  }

  async updateBorrowing() {
    return;
  }

  private async getBookById(id: number): Promise<Book> {
    const book = await this.booksRepo.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found!');
    }
    return book;
  }

  private async getUserById(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }
}
