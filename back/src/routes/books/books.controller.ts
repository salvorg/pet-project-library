import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../authors/author.entity';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/createBook.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TokenAuthGuard } from '../../auth/token-auth.guard';
import { RoleGuard } from '../../auth/role.guard';

@Controller('books')
export class BooksController {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepo: Repository<Author>,
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
    private readonly booksService: BooksService,
  ) {}

  @Get()
  async getAll(@Param('search') search: string) {
    return this.booksService.getAll(search);
  }

  @Get('/:id')
  async getOne(@Param('id') id: number) {
    return this.booksService.getOne(id);
  }

  @Post()
  @UseGuards(TokenAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads/books/images/' }))
  async createBook(@UploadedFile() file: Express.Multer.File, @Body() body: CreateBookDto) {
    return this.booksService.createBook(file, body);
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads/books/images/' }))
  async updateBook(@Param('id') id: number, @UploadedFile() file: Express.Multer.File, @Body() body: CreateBookDto) {
    return this.booksService.updateBook(id, file, body);
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard, RoleGuard)
  async removeBook(@Param('id') id: number) {
    return this.booksService.removeBook(id);
  }
}
