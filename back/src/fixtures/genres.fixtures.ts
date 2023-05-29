import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from '../genres/genre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenresFixtures {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepo: Repository<Genre>,
  ) {}

  async createGenres() {
    const genre1 = await this.genresRepo.create({
      name: 'Fantasy novels',
    });
    await this.genresRepo.save(genre1);

    const genre2 = await this.genresRepo.create({
      name: 'Speculative Fiction',
    });
    await this.genresRepo.save(genre2);

    const genre3 = await this.genresRepo.create({
      name: 'Science Fiction',
    });
    await this.genresRepo.save(genre3);

    const genre4 = await this.genresRepo.create({
      name: 'Western',
    });
    await this.genresRepo.save(genre4);

    const genre5 = await this.genresRepo.create({
      name: 'Historical',
    });
    await this.genresRepo.save(genre5);

    const genre6 = await this.genresRepo.create({
      name: 'Horror',
    });
    await this.genresRepo.save(genre6);

    const genre7 = await this.genresRepo.create({
      name: 'Thriller',
    });
    await this.genresRepo.save(genre7);

    const genre8 = await this.genresRepo.create({
      name: ' Mystery',
    });
    await this.genresRepo.save(genre8);

    const genre9 = await this.genresRepo.create({
      name: 'Literary Fiction',
    });
    await this.genresRepo.save(genre9);

    const genre10 = await this.genresRepo.create({
      name: 'Realist Literature',
    });
    await this.genresRepo.save(genre10);
  }
}
