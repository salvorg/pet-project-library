import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/book.entity';
import { Genre } from './genre.entity';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/createGenre.dto';

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
  async getAll() {
    return this.genresService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.genresService.getOne(id);
  }

  @Post()
  async createGenre(@Body() body: CreateGenreDto) {
    return this.genresService.createGenre(body);
  }

  @Patch(':id')
  async updateGenre(@Param('id') id: number, @Body() body: CreateGenreDto) {
    return this.genresService.updateGenre(id, body);
  }

  @Delete(':id')
  async removeGenre(@Param('id') id: number) {
    return this.genresService.removeGenre(id);
  }
}
