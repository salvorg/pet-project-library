import { Body, Controller, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { BookBorrowingsService } from './bookBorrowings.service';
import { CreateBorrowingDto } from './dto/createBorrowing.dto';
import { TokenAuthGuard } from '../../auth/token-auth.guard';
import { RoleGuard } from '../../auth/role.guard';

@Controller('borrowings')
export class BookBorrowingsController {
  constructor(private readonly bookBorrowingsService: BookBorrowingsService) {}

  @Get()
  async getAll(@Query('search') search: string) {
    return this.bookBorrowingsService.getAll(search);
  }

  @Post()
  @UseGuards(TokenAuthGuard, RoleGuard)
  async createBorrowing(@Body() body: CreateBorrowingDto) {
    return this.bookBorrowingsService.createBorrowing(body.user, body.book);
  }

  @Patch()
  @UseGuards(TokenAuthGuard, RoleGuard)
  async updateBorrowing(@Body() body: { id: number }) {
    return this.bookBorrowingsService.updateBorrowing(body.id);
  }
}
