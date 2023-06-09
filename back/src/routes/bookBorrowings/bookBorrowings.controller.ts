import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { BookBorrowingsService } from './bookBorrowings.service';
import { CreateBorrowingDto } from './dto/createBorrowing.dto';

@Controller('borrowings')
export class BookBorrowingsController {
  constructor(private readonly bookBorrowingsService: BookBorrowingsService) {}

  @Get()
  async getAll(@Query('search') search: string) {
    return this.bookBorrowingsService.getAll(search);
  }

  @Post()
  async createBorrowing(@Body() body: CreateBorrowingDto) {
    return this.bookBorrowingsService.createBorrowing(body.user, body.book);
  }

  @Patch()
  async updateBorrowing(@Body() body: { id: number }) {
    return this.bookBorrowingsService.updateBorrowing(body.id);
  }
}
