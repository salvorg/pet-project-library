import { Controller, Get, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Book } from '../books/book.entity';
import { BookBorrowingsService } from './bookBorrowings.service';

@Controller('borrowing')
export class BookBorrowingsController {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
    private readonly bookBorrowingsService: BookBorrowingsService,
  ) {}

  @Get()
  async getAll() {
    return this.bookBorrowingsService.getAll();
  }

  @Post()
  async createBorrowing(userId: number, bookId: number) {
    return this.bookBorrowingsService.createBorrowing(userId, bookId);
  }

  @Patch()
  async updateBorrowing() {
    return this.bookBorrowingsService.updateBorrowing();
  }
}
