import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import { Book } from '../books/book.entity';
import { CreateAuthorDto } from './dto/createAuthor.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepo: Repository<Author>,
    @InjectRepository(Book)
    private readonly booksRepo: Repository<Book>,
  ) {}

  async getAll(search: string): Promise<Author[]> {
    if (search) {
      const authors = await this.authorsRepo
        .createQueryBuilder('author')
        .select('author')
        .where('author.name ILIKE :query', { query: `%${search}%` })
        .getMany();

      if (!authors.length) {
        throw new NotFoundException('No matches!');
      }

      const authorsApi = [];

      for (let i = 0; i < authors.length; i++) {
        authorsApi.push({
          id: authors[i].id,
          label: authors[i].name,
        });
      }

      return authorsApi;
    }

    const authors = await this.authorsRepo.find({ relations: ['books'] });

    if (!authors.length) {
      throw new NotFoundException('No authors found!');
    }
    return authors;
  }

  async getOne(id: number): Promise<Author> {
    return await this.getAuthorById(id);
  }

  async createAuthor(body: CreateAuthorDto, file: Express.Multer.File): Promise<Author> {
    const existingAuthor = await this.authorsRepo.findOne({
      where: { name: body.name },
    });

    if (existingAuthor) {
      throw new BadRequestException(`${body.name} already exists!`);
    }

    const author = await this.authorsRepo.create({
      name: body.name,
      description: body.description,
      image: file ? '/uploads/authors/images/' + file.filename : null,
    });
    return await this.authorsRepo.save(author);
  }

  async updateAuthor(body: CreateAuthorDto, file: Express.Multer.File, id: number): Promise<Author> {
    const author = await this.getAuthorById(id);

    author.name = body.name;
    author.description = body.description;
    author.image = file ? '/uploads/authors/images/' + file.filename : null;

    return await this.authorsRepo.save(author);
  }

  async removeAuthor(id: number): Promise<{ message: string }> {
    const author = await this.getAuthorById(id);
    author.books = [];
    await this.authorsRepo.save(author);
    await this.authorsRepo.delete(id);
    return { message: 'Author successfully deleted!' };
  }

  private async getAuthorById(id: number): Promise<Author> {
    const author = await this.authorsRepo.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!author) {
      throw new NotFoundException('Author not found!');
    }
    return author;
  }
}
