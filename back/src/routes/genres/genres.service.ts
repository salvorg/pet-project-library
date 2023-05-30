import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Genre } from './genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/book.entity';
import { CreateGenreDto } from './dto/createGenre.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepo: Repository<Genre>,
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
  ) {}

  async getAll(): Promise<Genre[]> {
    const genres = await this.genresRepo.find({ relations: ['books'] });

    if (!genres.length) {
      throw new NotFoundException('No genres found!');
    }
    return genres;
  }

  async getOne(id: number): Promise<Genre> {
    return await this.getGenreById(id);
  }

  async createGenre(body: CreateGenreDto) {
    const existingGenre = await this.genresRepo.findOne({ where: { name: body.name } });

    if (existingGenre) {
      throw new BadRequestException(`${body.name} already exists!`);
    }

    const genre = await this.genresRepo.create({
      name: body.name,
    });

    return await this.genresRepo.save(genre);
  }

  async updateGenre(id: number, body: CreateGenreDto): Promise<Genre> {
    const genre = await this.getGenreById(id);

    genre.name = body.name;

    return await this.genresRepo.save(genre);
  }

  async removeGenre(id: number): Promise<{ message: string }> {
    await this.getGenreById(id);
    await this.genresRepo.delete(id);
    return { message: 'Genre successfully deleted!' };
  }

  private async getGenreById(id: number): Promise<Genre> {
    const genre = await this.genresRepo.findOne({ where: { id }, relations: ['books'] });

    if (!genre) {
      throw new NotFoundException('Genre not found!');
    }

    return genre;
  }
}
