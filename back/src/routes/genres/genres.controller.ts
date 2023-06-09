import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/book.entity';
import { Genre } from './genre.entity';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/createGenre.dto';
import { TokenAuthGuard } from '../../auth/token-auth.guard';
import { RoleGuard } from '../../auth/role.guard';

@Controller('genres')
export class GenresController {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepo: Repository<Genre>,
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
    private readonly genresService: GenresService,
  ) {}

  @Get()
  async getAll(@Query('search') search: string) {
    return this.genresService.getAll(search);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.genresService.getOne(id);
  }

  @Post()
  @UseGuards(TokenAuthGuard, RoleGuard)
  async createGenre(@Body() body: CreateGenreDto) {
    return this.genresService.createGenre(body);
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard, RoleGuard)
  async updateGenre(@Param('id') id: number, @Body() body: CreateGenreDto) {
    return this.genresService.updateGenre(id, body);
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard, RoleGuard)
  async removeGenre(@Param('id') id: number) {
    return this.genresService.removeGenre(id);
  }
}
