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

  async getAll(userId: string) {
    let query = this.borrowingsRepo
      .createQueryBuilder('book_borrowing')
      .leftJoinAndSelect('book_borrowing.book', 'book')
      .select(['book_borrowing', 'book.title'])
      .orderBy('book_borrowing.expiredDate', 'ASC');

    if (userId) {
      query = query.where('book_borrowing.user.id = :userId', { userId });
    }

    const bookBorrowings = await query.getMany();

    if (!bookBorrowings.length) {
      throw new NotFoundException('No matches!');
    }

    const borrowingsApi = [];

    for (let i = 0; i < bookBorrowings.length; i++) {
      borrowingsApi.push({
        id: bookBorrowings[i].id,
        userId,
        bookTitle: bookBorrowings[i].book.title,
        borrowDate: bookBorrowings[i].borrowDate,
        expiredDate: bookBorrowings[i].expiredDate,
        returnDate: bookBorrowings[i].returnDate,
      });
    }

    return borrowingsApi;
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
      borrowDate: new Date(),
    });

    await this.booksRepo.save(book);
    await this.borrowingsRepo.save(newBorrowing);
    return { message: 'Creating process has been successfully completed!' };
  }

  async updateBorrowing(id: number) {
    const existBorrowing = await this.borrowingsRepo.findOne({ where: { id } });

    if (!existBorrowing) {
      throw new NotFoundException('Borrowing not found!');
    }

    existBorrowing.returnDate = new Date();
    await this.borrowingsRepo.save(existBorrowing);
    return { message: 'Returning has been successfully completed!' };
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
